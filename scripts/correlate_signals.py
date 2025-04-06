#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Correlation Analysis Script for ECG and EEG data
Analyzes the relationship between brain and heart signals
"""

import argparse
import json
import os
import numpy as np
import pandas as pd
import neurokit2 as nk
from scipy import signal
from scipy.stats import pearsonr, spearmanr
from scipy.signal import coherence
import mne

from mne_connectivity import spectral_connectivity_epochs as spectral_connectivity

def parse_arguments():
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(description='Correlate ECG and EEG signals')
    parser.add_argument('--config', type=str, required=True, help='Path to the configuration JSON file')
    return parser.parse_args()

def load_analysis_results(file_path):
    """Load analysis results from JSON file."""
    with open(file_path, 'r') as f:
        return json.load(f)

def resample_signals(ecg_data, eeg_data, ecg_fs, eeg_fs):
    """
    Resample signals to the same sampling rate.
    
    Parameters:
    -----------
    ecg_data : array
        ECG signal data
    eeg_data : array
        EEG signal data
    ecg_fs : int
        ECG sampling rate
    eeg_fs : int
        EEG sampling rate
        
    Returns:
    --------
    tuple
        Resampled ECG and EEG data, and the new sampling rate
    """
    # Choose the higher sampling rate
    target_fs = max(ecg_fs, eeg_fs)
    
    # Resample signals if needed
    if ecg_fs != target_fs:
        ecg_resampled = signal.resample(ecg_data, int(len(ecg_data) * target_fs / ecg_fs))
    else:
        ecg_resampled = ecg_data
        
    if eeg_fs != target_fs:
        eeg_resampled = signal.resample(eeg_data, int(len(eeg_data) * target_fs / eeg_fs))
    else:
        eeg_resampled = eeg_data
    
    # Ensure both signals have the same length (use the shorter one)
    min_length = min(len(ecg_resampled), len(eeg_resampled))
    ecg_resampled = ecg_resampled[:min_length]
    eeg_resampled = eeg_resampled[:min_length]
    
    return ecg_resampled, eeg_resampled, target_fs

def compute_time_domain_correlation(ecg_data, eeg_data):
    """
    Compute time domain correlation between ECG and EEG signals.
    
    Parameters:
    -----------
    ecg_data : array
        ECG signal data
    eeg_data : array
        EEG signal data
        
    Returns:
    --------
    dict
        Dictionary containing correlation results
    """
    # Pearson correlation
    pearson_corr, pearson_p = pearsonr(ecg_data, eeg_data)
    
    # Spearman correlation
    spearman_corr, spearman_p = spearmanr(ecg_data, eeg_data)
    
    # Cross-correlation
    cross_corr = np.correlate(ecg_data, eeg_data, mode='full')
    max_corr_idx = np.argmax(np.abs(cross_corr))
    lag = max_corr_idx - (len(ecg_data) - 1)
    max_corr_value = cross_corr[max_corr_idx]
    
    # Normalize cross-correlation
    norm_factor = np.sqrt(np.sum(ecg_data**2) * np.sum(eeg_data**2))
    if norm_factor > 0:
        max_corr_value_norm = max_corr_value / norm_factor
    else:
        max_corr_value_norm = 0
    
    return {
        "pearson": {
            "correlation": float(pearson_corr),
            "p_value": float(pearson_p)
        },
        "spearman": {
            "correlation": float(spearman_corr),
            "p_value": float(spearman_p)
        },
        "cross_correlation": {
            "max_value": float(max_corr_value_norm),
            "lag_samples": int(lag)
        }
    }

def compute_frequency_domain_correlation(ecg_data, eeg_data, sampling_rate):
    """
    Compute frequency domain correlation between ECG and EEG signals.
    
    Parameters:
    -----------
    ecg_data : array
        ECG signal data
    eeg_data : array
        EEG signal data
    sampling_rate : int
        Sampling rate in Hz
        
    Returns:
    --------
    dict
        Dictionary containing frequency domain correlation results
    """
    # Compute coherence
    freqs, coh = coherence(ecg_data, eeg_data, fs=sampling_rate, nperseg=min(sampling_rate, len(ecg_data)//2))
    
    # Find frequency bands
    delta_idx = np.logical_and(freqs >= 0.5, freqs <= 4)
    theta_idx = np.logical_and(freqs >= 4, freqs <= 8)
    alpha_idx = np.logical_and(freqs >= 8, freqs <= 13)
    beta_idx = np.logical_and(freqs >= 13, freqs <= 30)
    
    # Compute mean coherence in each band
    delta_coh = np.mean(coh[delta_idx]) if np.any(delta_idx) else 0
    theta_coh = np.mean(coh[theta_idx]) if np.any(theta_idx) else 0
    alpha_coh = np.mean(coh[alpha_idx]) if np.any(alpha_idx) else 0
    beta_coh = np.mean(coh[beta_idx]) if np.any(beta_idx) else 0
    
    # Set a default PLV value
    plv = 0
    
    # Attempt spectral connectivity only if we have enough data
    data_duration_sec = len(ecg_data) / sampling_rate
    
    # Only attempt PLV calculation if we have enough data
    if data_duration_sec >= 10.0:  # At least 10 seconds of data
        try:
            # Import here to ensure we have the right function
            import warnings
            from mne_connectivity import spectral_connectivity_epochs
            
            # Suppress specific warnings
            with warnings.catch_warnings():
                warnings.filterwarnings("ignore", category=RuntimeWarning)
                
                # Create MNE-compatible data for connectivity analysis
                data = np.vstack([ecg_data, eeg_data])
                info = mne.create_info(ch_names=['ECG', 'EEG'], sfreq=sampling_rate, ch_types=['misc', 'misc'])
                raw = mne.io.RawArray(data, info)
                
                # Create epochs from the raw data
                # Use the entire signal as one epoch
                events = np.array([[0, 0, 1]])
                epoch_duration = int(data_duration_sec)  # in seconds
                tmax = epoch_duration - 1/sampling_rate  # Adjust for sampling rate
                epochs = mne.Epochs(raw, events, tmin=0, tmax=tmax, baseline=None, preload=True)
                
                # Calculate minimum frequency based on epoch duration
                min_freq = max(2.0, 5.0 / data_duration_sec)
                
                # Compute spectral connectivity
                con = spectral_connectivity(
                    epochs,
                    method='plv',
                    mode='multitaper',
                    sfreq=sampling_rate,
                    fmin=min_freq,
                    fmax=45,
                    faverage=True
                )
                
                # Extract PLV between ECG and EEG
                plv = con.get_data('plv')[0, 1]
        except Exception as e:
            print(f"Error computing PLV: {str(e)}")
            plv = 0
    else:
        print(f"Skipping PLV calculation - insufficient data length ({data_duration_sec:.2f} sec)")
    
    return {
        "coherence": {
            "frequencies": freqs.tolist(),
            "values": coh.tolist(),
            "delta_band": float(delta_coh),
            "theta_band": float(theta_coh),
            "alpha_band": float(alpha_coh),
            "beta_band": float(beta_coh)
        },
        "phase_locking_value": float(plv)
    }

def compute_hrv_eeg_correlation(ecg_results, eeg_results):
    """
    Compute correlation between HRV metrics and EEG frequency bands.
    
    Parameters:
    -----------
    ecg_results : dict
        ECG analysis results
    eeg_results : dict
        EEG analysis results
        
    Returns:
    --------
    dict
        Dictionary containing HRV-EEG correlation results
    """
    # Extract HRV features
    hrv_features = {}
    if "features" in ecg_results:
        hrv_features = {
            "sdnn": ecg_results["features"].get("sdnn"),
            "rmssd": ecg_results["features"].get("rmssd"),
            "lf_hf_ratio": ecg_results["features"].get("lf_hf_ratio")
        }
    
    # Extract EEG band powers
    eeg_bands = {}
    if "bands" in eeg_results:
        eeg_bands = eeg_results["bands"]
    
    # Compute correlations if we have both HRV and EEG data
    correlations = {}
    if hrv_features and eeg_bands:
        for hrv_name, hrv_value in hrv_features.items():
            if hrv_value is not None:
                band_correlations = {}
                for band_name, band_value in eeg_bands.items():
                    # Since we only have one data point for each, we can't compute
                    # a statistical correlation. Instead, we'll compute a simple ratio.
                    if band_value > 0:
                        ratio = hrv_value / band_value
                    else:
                        ratio = 0
                    band_correlations[band_name] = float(ratio)
                correlations[hrv_name] = band_correlations
    
    return correlations

def main():
    """Main function to correlate ECG and EEG signals."""
    args = parse_arguments()
    
    try:
        # Load configuration
        with open(args.config, 'r') as f:
            config = json.load(f)
        
        ecg_analysis_id = config["ecgAnalysisId"]
        eeg_analysis_id = config["eegAnalysisId"]
        output_path = config["outputPath"]
        
        # Load analysis results
        results_dir = os.path.join(os.path.dirname(os.path.dirname(args.config)), "results")
        ecg_results_path = os.path.join(results_dir, f"{ecg_analysis_id}.json")
        eeg_results_path = os.path.join(results_dir, f"{eeg_analysis_id}.json")
        
        ecg_results = load_analysis_results(ecg_results_path)
        eeg_results = load_analysis_results(eeg_results_path)
        
        # Extract signals
        ecg_signal = np.array(ecg_results["signal"]["cleaned"])
        eeg_signal = np.array(eeg_results["signal"]["cleaned"])
        
        # Get sampling rates
        ecg_fs = ecg_results["metadata"]["sampling_rate"]
        eeg_fs = eeg_results["metadata"]["sampling_rate"]
        
        # Resample signals to the same sampling rate
        ecg_resampled, eeg_resampled, target_fs = resample_signals(
            ecg_signal, eeg_signal, ecg_fs, eeg_fs
        )
        
        # Compute time domain correlation
        time_domain_corr = compute_time_domain_correlation(ecg_resampled, eeg_resampled)
        
        # Compute frequency domain correlation
        freq_domain_corr = compute_frequency_domain_correlation(
            ecg_resampled, eeg_resampled, target_fs
        )
        
        # Compute HRV-EEG correlation
        hrv_eeg_corr = compute_hrv_eeg_correlation(ecg_results, eeg_results)
        
        # Prepare correlation results
        correlation_results = {
            "time_domain": time_domain_corr,
            "frequency_domain": freq_domain_corr,
            "hrv_eeg_correlation": hrv_eeg_corr,
            "metadata": {
                "ecg_analysis_id": ecg_analysis_id,
                "eeg_analysis_id": eeg_analysis_id,
                "sampling_rate": target_fs,
                "signal_length": len(ecg_resampled)
            }
        }
        
        # Save results to JSON
        with open(output_path, 'w') as f:
            json.dump(correlation_results, f)
        
        print(f"Correlation analysis complete. Results saved to {output_path}")
        
    except Exception as e:
        print(f"Error: {str(e)}")
        raise

if __name__ == "__main__":
    main()

