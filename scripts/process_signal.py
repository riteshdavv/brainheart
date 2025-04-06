#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Signal Processing Script for ECG and EEG data
Uses MNE and NeuroKit2 for advanced signal processing
"""

import argparse
import json
import os
import numpy as np
import pandas as pd
import mne
import neurokit2 as nk
from scipy import signal
from scipy.stats import zscore
from pathlib import Path

def parse_arguments():
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(description='Process ECG or EEG signal data')
    parser.add_argument('--file', type=str, required=True, help='Path to the input file')
    parser.add_argument('--type', type=str, required=True, choices=['ecg', 'eeg'], help='Signal type (ecg or eeg)')
    parser.add_argument('--output', type=str, required=True, help='Path to save the output JSON')
    parser.add_argument('--sampling_rate', type=int, default=1000, help='Sampling rate in Hz')
    return parser.parse_args()

def load_signal_data(file_path, signal_type):
    """
    Load signal data from file based on file extension and signal type.
    
    Parameters:
    -----------
    file_path : str
        Path to the signal data file
    signal_type : str
        Type of signal ('ecg' or 'eeg')
        
    Returns:
    --------
    data : array-like
        Signal data
    sampling_rate : int
        Sampling rate of the signal
    """
    file_extension = Path(file_path).suffix.lower()
    
    if file_extension == '.edf':
        # Load EDF file using MNE
        raw = mne.io.read_raw_edf(file_path, preload=True)
        sampling_rate = raw.info['sfreq']
        
        if signal_type == 'ecg':
            # Extract ECG channel
            ecg_channels = mne.pick_types(raw.info, ecg=True)
            if len(ecg_channels) == 0:
                # If no ECG channel is explicitly marked, try to find it by name
                ecg_channels = [idx for idx, ch in enumerate(raw.ch_names) if 'ecg' in ch.lower()]
                if not ecg_channels:
                    raise ValueError("No ECG channels found in the EDF file")
            data = raw.get_data(picks=ecg_channels)[0]
        else:  # EEG
            # Extract EEG channels
            eeg_channels = mne.pick_types(raw.info, eeg=True)
            if len(eeg_channels) == 0:
                raise ValueError("No EEG channels found in the EDF file")
            data = raw.get_data(picks=eeg_channels)
            # For simplicity, if multiple EEG channels, use the first one
            if data.ndim > 1 and data.shape[0] > 1:
                data = data[0]
    
    elif file_extension in ['.csv', '.txt']:
        # Assume CSV/TXT file has a simple format with one column of data
        try:
            df = pd.read_csv(file_path)
            # Try to automatically detect the signal column
            if signal_type == 'ecg':
                potential_cols = [col for col in df.columns if 'ecg' in col.lower()]
                if not potential_cols:
                    # If no column with 'ecg' in name, take the first numeric column
                    numeric_cols = df.select_dtypes(include=[np.number]).columns
                    if len(numeric_cols) == 0:
                        raise ValueError("No numeric columns found in the CSV file")
                    data = df[numeric_cols[0]].values
                else:
                    data = df[potential_cols[0]].values
            else:  # EEG
                potential_cols = [col for col in df.columns if 'eeg' in col.lower()]
                if not potential_cols:
                    # If no column with 'eeg' in name, take the first numeric column
                    numeric_cols = df.select_dtypes(include=[np.number]).columns
                    if len(numeric_cols) == 0:
                        raise ValueError("No numeric columns found in the CSV file")
                    data = df[numeric_cols[0]].values
                else:
                    data = df[potential_cols[0]].values
            
            # Assume default sampling rate if not provided
            sampling_rate = 1000  # Default to 1000 Hz
        except Exception as e:
            raise ValueError(f"Error reading CSV file: {str(e)}")
    
    else:
        raise ValueError(f"Unsupported file format: {file_extension}")
    
    return data, sampling_rate

def preprocess_ecg(ecg_signal, sampling_rate):
    """
    Preprocess ECG signal using NeuroKit2.
    
    Parameters:
    -----------
    ecg_signal : array
        Raw ECG signal
    sampling_rate : int
        Sampling rate in Hz
        
    Returns:
    --------
    dict
        Dictionary containing processed ECG data and features
    """
    # Step 1: Clean the ECG signal
    ecg_cleaned = nk.ecg_clean(ecg_signal, sampling_rate=sampling_rate)
    
    # Step 2: Find R-peaks
    _, rpeaks = nk.ecg_peaks(ecg_cleaned, sampling_rate=sampling_rate)
    
    # Step 3: Compute heart rate and HRV metrics
    ecg_rate = nk.ecg_rate(rpeaks, sampling_rate=sampling_rate)
    
    # Step 4: Delineate the ECG signal and extract all peaks (P, Q, R, S, T)
    _, waves_peak = nk.ecg_delineate(ecg_cleaned, rpeaks, sampling_rate=sampling_rate, method="peak")
    
    # Handle the return value correctly
    # First check what we actually got back from ecg_delineate
    r_peaks_list = rpeaks["ECG_R_Peaks"].tolist() if "ECG_R_Peaks" in rpeaks else []
    
    # Handle the waves_peak object correctly based on its actual type
    if isinstance(waves_peak, list):
        # If it's a list, we need to create empty lists for the peaks
        p_peaks_list = []
        q_peaks_list = []
        s_peaks_list = []
        t_peaks_list = []
    else:
        # If it's a dictionary, extract the peaks safely
        p_peaks_list = waves_peak.get("ECG_P_Peaks", [])
        if p_peaks_list is not None and hasattr(p_peaks_list, "tolist"):
            p_peaks_list = p_peaks_list.tolist()
        else:
            p_peaks_list = []
            
        q_peaks_list = waves_peak.get("ECG_Q_Peaks", [])
        if q_peaks_list is not None and hasattr(q_peaks_list, "tolist"):
            q_peaks_list = q_peaks_list.tolist()
        else:
            q_peaks_list = []
            
        s_peaks_list = waves_peak.get("ECG_S_Peaks", [])
        if s_peaks_list is not None and hasattr(s_peaks_list, "tolist"):
            s_peaks_list = s_peaks_list.tolist()
        else:
            s_peaks_list = []
            
        t_peaks_list = waves_peak.get("ECG_T_Peaks", [])
        if t_peaks_list is not None and hasattr(t_peaks_list, "tolist"):
            t_peaks_list = t_peaks_list.tolist()
        else:
            t_peaks_list = []
    
    # Process ECG signal for interval-related metrics
    try:
        # Try using the ecg_process function first
        processed_ecg = nk.ecg_process(ecg_cleaned, sampling_rate=sampling_rate)
        ecg_features = nk.ecg_intervalrelated(processed_ecg[0], sampling_rate=sampling_rate)
    except Exception as e:
        print(f"Warning: Could not compute interval-related features: {str(e)}")
        # Fallback to directly computing some basic features
        ecg_features = pd.DataFrame({
            "ECG_Rate_Mean": [np.mean(ecg_rate) if len(ecg_rate) > 0 else 0],
            "ECG_Rate_Min": [np.min(ecg_rate) if len(ecg_rate) > 0 else 0],
            "ECG_Rate_Max": [np.max(ecg_rate) if len(ecg_rate) > 0 else 0]
        })
    
    # Safely compute HRV indices
    try:
        hrv_time = nk.hrv_time(rpeaks, sampling_rate=sampling_rate)
    except Exception as e:
        print(f"Warning: Could not compute HRV time domain features: {str(e)}")
        hrv_time = pd.DataFrame({"HRV_SDNN": [np.nan], "HRV_RMSSD": [np.nan]})
        
    try:
        hrv_freq = nk.hrv_frequency(rpeaks, sampling_rate=sampling_rate)
    except Exception as e:
        print(f"Warning: Could not compute HRV frequency domain features: {str(e)}")
        hrv_freq = pd.DataFrame({"HRV_LF/HF": [np.nan]})
        
    try:
        hrv_nonlinear = nk.hrv_nonlinear(rpeaks, sampling_rate=sampling_rate)
    except Exception as e:
        print(f"Warning: Could not compute HRV nonlinear features: {str(e)}")
        hrv_nonlinear = pd.DataFrame({"HRV_SampEn": [np.nan]})
    
    # Prepare results with more robust error handling
    results = {
        "signal": {
            "raw": ecg_signal.tolist() if hasattr(ecg_signal, "tolist") else list(ecg_signal),
            "cleaned": ecg_cleaned.tolist() if hasattr(ecg_cleaned, "tolist") else list(ecg_cleaned),
            "heart_rate": ecg_rate.tolist() if hasattr(ecg_rate, "tolist") else list(ecg_rate)
        },
        "peaks": {
            "r_peaks": r_peaks_list,
            "p_peaks": p_peaks_list,
            "q_peaks": q_peaks_list,
            "s_peaks": s_peaks_list,
            "t_peaks": t_peaks_list
        },
        "features": {
            "mean_hr": float(ecg_features["ECG_Rate_Mean"].values[0]) if "ECG_Rate_Mean" in ecg_features else None,
            "min_hr": float(ecg_features["ECG_Rate_Min"].values[0]) if "ECG_Rate_Min" in ecg_features else None,
            "max_hr": float(ecg_features["ECG_Rate_Max"].values[0]) if "ECG_Rate_Max" in ecg_features else None,
            "sdnn": float(hrv_time["HRV_SDNN"].values[0]) if "HRV_SDNN" in hrv_time else None,
            "rmssd": float(hrv_time["HRV_RMSSD"].values[0]) if "HRV_RMSSD" in hrv_time else None,
            "lf_hf_ratio": float(hrv_freq["HRV_LF/HF"].values[0]) if "HRV_LF/HF" in hrv_freq else None,
            "sample_entropy": float(hrv_nonlinear["HRV_SampEn"].values[0]) if "HRV_SampEn" in hrv_nonlinear else None
        },
        "metadata": {
            "sampling_rate": sampling_rate,
            "duration_seconds": len(ecg_signal) / sampling_rate,
            "signal_type": "ecg"
        }
    }
    
    return results

def preprocess_eeg(eeg_signal, sampling_rate):
    """
    Preprocess EEG signal using MNE and NeuroKit2.
    
    Parameters:
    -----------
    eeg_signal : array
        Raw EEG signal
    sampling_rate : int
        Sampling rate in Hz
        
    Returns:
    --------
    dict
        Dictionary containing processed EEG data and features
    """
    # Step 1: Clean the EEG signal
    # Apply bandpass filter (0.5-45 Hz)
    eeg_filtered = nk.signal_filter(eeg_signal, 
                                   lowcut=0.5, 
                                   highcut=45, 
                                   sampling_rate=sampling_rate, 
                                   method='butterworth')
    
    # Step 2: Remove artifacts - replace eeg_clean with manual artifact removal
    # Since NeuroKit2 doesn't have eeg_clean, we'll use basic methods
    # First convert to z-scores
    z_scores = zscore(eeg_filtered)
    
    # Remove extreme values (z-score > 3)
    artifact_mask = np.abs(z_scores) > 3
    eeg_cleaned = eeg_filtered.copy()
    eeg_cleaned[artifact_mask] = np.nan
    
    # Interpolate NaN values
    nan_indices = np.isnan(eeg_cleaned)
    if np.any(nan_indices):
        non_nan_indices = ~nan_indices
        if np.any(non_nan_indices):
            # Get indices of non-NaN values
            indices = np.arange(len(eeg_cleaned))
            # Interpolate NaN values
            eeg_cleaned[nan_indices] = np.interp(
                indices[nan_indices], 
                indices[non_nan_indices], 
                eeg_cleaned[non_nan_indices]
            )
    
    # Step 3: Extract EEG frequency bands using NeuroKit2
    try:
        eeg_bands = nk.eeg_bandpower(eeg_cleaned, sampling_rate=sampling_rate, method='welch')
    except Exception as e:
        print(f"Warning: Could not compute EEG band power: {str(e)}")
        # Create empty DataFrame if the function fails
        eeg_bands = pd.DataFrame()
    
    # Step 4: Compute spectral power
    freqs, psd = signal.welch(eeg_cleaned, fs=sampling_rate, nperseg=min(sampling_rate, len(eeg_cleaned)))
    
    # Step 5: Extract EEG features
    # Compute relative band powers
    delta_idx = np.logical_and(freqs >= 0.5, freqs <= 4)
    theta_idx = np.logical_and(freqs >= 4, freqs <= 8)
    alpha_idx = np.logical_and(freqs >= 8, freqs <= 13)
    beta_idx = np.logical_and(freqs >= 13, freqs <= 30)
    gamma_idx = np.logical_and(freqs >= 30, freqs <= 45)
    
    total_power = np.sum(psd)
    # Avoid division by zero
    if total_power > 0:
        delta_power = np.sum(psd[delta_idx]) / total_power if np.any(delta_idx) else 0
        theta_power = np.sum(psd[theta_idx]) / total_power if np.any(theta_idx) else 0
        alpha_power = np.sum(psd[alpha_idx]) / total_power if np.any(alpha_idx) else 0
        beta_power = np.sum(psd[beta_idx]) / total_power if np.any(beta_idx) else 0
        gamma_power = np.sum(psd[gamma_idx]) / total_power if np.any(gamma_idx) else 0
    else:
        delta_power = theta_power = alpha_power = beta_power = gamma_power = 0
    
    # Calculate Hjorth parameters manually if NeuroKit2 doesn't have the function
    try:
        hjorth_params = nk.eeg_hjorth(eeg_cleaned)
        hjorth_mobility = float(hjorth_params["hjorth_mobility"])
        hjorth_complexity = float(hjorth_params["hjorth_complexity"])
    except Exception as e:
        print(f"Warning: Could not compute Hjorth parameters: {str(e)}")
        # Calculate Hjorth parameters manually
        # Mobility - std of the first derivative / std of the signal
        diff1 = np.diff(eeg_cleaned, n=1)
        if np.std(eeg_cleaned) > 0:
            hjorth_mobility = np.std(diff1) / np.std(eeg_cleaned)
        else:
            hjorth_mobility = 0
            
        # Complexity - mobility of the first derivative / mobility of the signal
        diff2 = np.diff(eeg_cleaned, n=2)
        if len(diff1) > 0 and np.std(diff1) > 0:
            mobility_diff = np.std(diff2) / np.std(diff1)
            hjorth_complexity = mobility_diff / hjorth_mobility if hjorth_mobility > 0 else 0
        else:
            hjorth_complexity = 0
    
    # Safely compute statistics
    try:
        mean_val = float(np.mean(eeg_cleaned))
    except:
        mean_val = 0
        
    try:
        std_val = float(np.std(eeg_cleaned))
    except:
        std_val = 0
        
    try:
        kurtosis_val = float(pd.Series(eeg_cleaned).kurtosis())
    except:
        kurtosis_val = 0
        
    try:
        skewness_val = float(pd.Series(eeg_cleaned).skew())
    except:
        skewness_val = 0
    
    # Prepare results with robust error handling for JSON serialization
    results = {
        "signal": {
            "raw": eeg_signal.tolist() if hasattr(eeg_signal, "tolist") else list(eeg_signal),
            "filtered": eeg_filtered.tolist() if hasattr(eeg_filtered, "tolist") else list(eeg_filtered),
            "cleaned": eeg_cleaned.tolist() if hasattr(eeg_cleaned, "tolist") else list(eeg_cleaned)
        },
        "frequency": {
            "freqs": freqs.tolist() if hasattr(freqs, "tolist") else list(freqs),
            "psd": psd.tolist() if hasattr(psd, "tolist") else list(psd)
        },
        "bands": {
            "delta": float(delta_power),
            "theta": float(theta_power),
            "alpha": float(alpha_power),
            "beta": float(beta_power),
            "gamma": float(gamma_power)
        },
        "features": {
            "mean": mean_val,
            "std": std_val,
            "kurtosis": kurtosis_val,
            "skewness": skewness_val,
            "hjorth_mobility": float(hjorth_mobility),
            "hjorth_complexity": float(hjorth_complexity)
        },
        "metadata": {
            "sampling_rate": sampling_rate,
            "duration_seconds": len(eeg_signal) / sampling_rate,
            "signal_type": "eeg"
        }
    }
    
    return results

def main():
    """Main function to process signal data."""
    args = parse_arguments()
    
    try:
        # Load signal data
        print(f"Loading {args.type} data from {args.file}...")
        signal_data, sampling_rate = load_signal_data(args.file, args.type)
        
        # Override sampling rate if provided
        if args.sampling_rate != 1000:
            sampling_rate = args.sampling_rate
        
        print(f"Processing {args.type} signal with sampling rate {sampling_rate} Hz...")
        
        # Process based on signal type
        if args.type == 'ecg':
            results = preprocess_ecg(signal_data, sampling_rate)
        else:  # EEG
            results = preprocess_eeg(signal_data, sampling_rate)
        
        # Save results to JSON
        with open(args.output, 'w') as f:
            json.dump(results, f)
        
        print(f"Processing complete. Results saved to {args.output}")
        
    except Exception as e:
        print(f"Error: {str(e)}")
        raise

if __name__ == "__main__":
    main()

