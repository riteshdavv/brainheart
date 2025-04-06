# BrainHeart - ECG and EEG Signal Analysis Platform

A comprehensive platform for analyzing and correlating ECG (electrocardiogram) and EEG (electroencephalogram) signals. This application provides advanced signal processing capabilities using MNE and NeuroKit2 libraries.

## Features

- **ECG Signal Processing**
  - R-peak detection
  - Heart rate variability (HRV) analysis
  - ECG waveform delineation (P, Q, R, S, T waves)
  - Artifact removal and signal cleaning

- **EEG Signal Processing**
  - Frequency band extraction (delta, theta, alpha, beta, gamma)
  - Artifact removal using advanced filtering
  - Spectral power analysis
  - EEG feature extraction (Hjorth parameters, statistical features)

- **Brain-Heart Correlation Analysis**
  - Time domain correlation analysis
  - Frequency domain coherence
  - Phase synchronization measures
  - HRV-EEG band power correlation

## Technical Stack

- **Frontend**: Next.js, React, Tailwind CSS, Recharts
- **Backend**: Next.js API Routes
- **Signal Processing**: Python with MNE and NeuroKit2
- **Data Handling**: NumPy, Pandas, SciPy

## Setup Instructions

### Prerequisites

- Node.js (v18 or later)
- Python (v3.8 or later)
- pip (Python package manager)

### Installation

1. Clone the repository:

