import numpy as np
import pandas as pd

def generate_synthetic_ecg(duration_sec=10, sampling_rate=1000):
    time = np.linspace(0, duration_sec, duration_sec * sampling_rate)
    heartbeat = np.concatenate([
        np.zeros(100),
        np.array([0.1, 0.5, 1.0, 0.3, 0.1, 0]),
        np.zeros(150)
    ])
    num_beats = int(len(time) / len(heartbeat)) + 1
    ecg = np.tile(heartbeat, num_beats)[:len(time)]
    ecg += np.random.normal(0, 0.03, len(ecg))
    return pd.DataFrame({'Time': time, 'ECG': ecg})

def generate_synthetic_eeg(duration_sec=10, sampling_rate=250, channels=4):
    time = np.linspace(0, duration_sec, duration_sec * sampling_rate)
    freqs = [10, 12, 8, 15]
    eeg_data = {'Time': time}
    for i in range(channels):
        eeg_data[f'Ch{i+1}'] = np.sin(2 * np.pi * freqs[i] * time) + np.random.normal(0, 0.5, len(time))
    return pd.DataFrame(eeg_data)

# Generate and save
df_ecg = generate_synthetic_ecg()
df_eeg = generate_synthetic_eeg()

df_ecg.to_csv("synthetic_ecg.csv", index=False)
df_eeg.to_csv("synthetic_eeg.csv", index=False)
print("Files saved: synthetic_ecg.csv and synthetic_eeg.csv")