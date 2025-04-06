"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Generate mock EEG data
const generateEEGData = (length: number) => {
  const data = []
  let x = 0
  const frequency = 0.2
  const amplitude = 0.5
  const baselineNoise = 0.3

  for (let i = 0; i < length; i++) {
    // Create a basic EEG-like pattern with multiple frequency components
    let y = Math.sin(x * frequency) * amplitude * 0.5
    y += Math.sin(x * frequency * 2) * amplitude * 0.3
    y += Math.sin(x * frequency * 5) * amplitude * 0.2

    // Add some random noise to simulate EEG
    y += (Math.random() - 0.5) * baselineNoise

    data.push({
      time: i,
      value: y,
    })

    x += 1
  }

  return data
}

export function EEGChart() {
  const [data, setData] = useState(() => generateEEGData(200))

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [
          ...prevData.slice(1),
          {
            time: prevData[prevData.length - 1].time + 1,
            value:
              Math.sin(prevData[prevData.length - 1].time * 0.2) * 0.25 +
              Math.sin(prevData[prevData.length - 1].time * 0.4) * 0.15 +
              Math.sin(prevData[prevData.length - 1].time * 1.0) * 0.1 +
              (Math.random() - 0.5) * 0.3,
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
          domain={[-1, 1]}
          label={{ value: "Amplitude", angle: -90, position: "insideLeft" }}
          tick={{ fontSize: 12 }}
        />
        <Tooltip
          formatter={(value: number) => [value.toFixed(3), "Amplitude"]}
          labelFormatter={(label) => `Time: ${label}`}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#9333ea"
          strokeWidth={1.5}
          dot={false}
          isAnimationActive={false}
          name="EEG Signal"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

