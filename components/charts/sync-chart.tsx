"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

// Generate mock synchronized ECG and EEG data
const generateSyncData = (length: number) => {
  const data = []
  let x = 0
  const ecgFrequency = 0.1
  const eegFrequency = 0.2
  const ecgAmplitude = 0.5
  const eegAmplitude = 0.4
  const ecgNoise = 0.1
  const eegNoise = 0.3

  for (let i = 0; i < length; i++) {
    // Create ECG pattern
    let ecgValue = Math.sin(x * ecgFrequency) * ecgAmplitude
    if (i % 20 === 0) {
      ecgValue = 0.9
    }
    ecgValue += (Math.random() - 0.5) * ecgNoise

    // Create EEG pattern with some correlation to ECG
    let eegValue = Math.sin(x * eegFrequency) * eegAmplitude * 0.5
    eegValue += Math.sin(x * eegFrequency * 2) * eegAmplitude * 0.3
    eegValue += Math.sin(x * eegFrequency * 5) * eegAmplitude * 0.2

    // Add some correlation between ECG and EEG
    if (i % 20 === 2 || i % 20 === 3) {
      eegValue += ecgValue * 0.3
    }

    eegValue += (Math.random() - 0.5) * eegNoise

    data.push({
      time: i,
      ecg: ecgValue,
      eeg: eegValue,
    })

    x += 1
  }

  return data
}

export function SyncChart() {
  const [data, setData] = useState(() => generateSyncData(100))

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setData((prevData) => {
        const lastPoint = prevData[prevData.length - 1]
        const newTime = lastPoint.time + 1

        // Generate new ECG value
        let newEcg = Math.sin(newTime * 0.1) * 0.5
        if (newTime % 20 === 0) {
          newEcg = 0.9
        }
        newEcg += (Math.random() - 0.5) * 0.1

        // Generate new EEG value with some correlation to ECG
        let newEeg = Math.sin(newTime * 0.2) * 0.2 + Math.sin(newTime * 0.4) * 0.15 + Math.sin(newTime * 1.0) * 0.1

        if (newTime % 20 === 2 || newTime % 20 === 3) {
          newEeg += newEcg * 0.3
        }

        newEeg += (Math.random() - 0.5) * 0.3

        const newData = [
          ...prevData.slice(1),
          {
            time: newTime,
            ecg: newEcg,
            eeg: newEeg,
          },
        ]

        return newData
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
        <XAxis
          dataKey="time"
          label={{ value: "Time (samples)", position: "insideBottom", offset: -10 }}
          tick={{ fontSize: 12 }}
        />
        <YAxis
          domain={[-1.5, 1.5]}
          label={{ value: "Amplitude", angle: -90, position: "insideLeft" }}
          tick={{ fontSize: 12 }}
        />
        <Tooltip
          formatter={(value: number) => [value.toFixed(3), "Amplitude"]}
          labelFormatter={(label) => `Time: ${label}`}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="ecg"
          stroke="#ef4444"
          strokeWidth={1.5}
          dot={false}
          isAnimationActive={false}
          name="ECG Signal"
        />
        <Line
          type="monotone"
          dataKey="eeg"
          stroke="#3b82f6"
          strokeWidth={1.5}
          dot={false}
          isAnimationActive={false}
          name="EEG Signal"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

