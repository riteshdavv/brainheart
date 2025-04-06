"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from "recharts"

// Generate mock ECG data
const generateECGData = (length: number) => {
  const data = []
  let x = 0
  const frequency = 0.1
  const amplitude = 0.5
  const baselineNoise = 0.1

  for (let i = 0; i < length; i++) {
    // Create a basic ECG-like pattern
    let y = Math.sin(x * frequency) * amplitude

    // Add R peaks at regular intervals
    if (i % 20 === 0) {
      y = 0.9
    }

    // Add some random noise
    y += (Math.random() - 0.5) * baselineNoise

    data.push({
      time: i,
      value: y,
      isPeak: i % 20 === 0,
    })

    x += 1
  }

  return data
}

export function ECGChart() {
  const [data, setData] = useState(() => generateECGData(200))

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [
          ...prevData.slice(1),
          {
            time: prevData[prevData.length - 1].time + 1,
            value:
              prevData[prevData.length - 1].value * 0.8 +
              Math.sin(prevData[prevData.length - 1].time * 0.1) * 0.5 +
              (Math.random() - 0.5) * 0.1,
            isPeak: prevData[prevData.length - 1].time % 20 === 0,
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
          stroke="#2563eb"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
          name="Cleaned ECG"
        />
        {data.map(
          (entry, index) =>
            entry.isPeak && (
              <ReferenceDot key={`peak-${index}`} x={entry.time} y={entry.value} r={4} fill="#ef4444" stroke="none" />
            ),
        )}
      </LineChart>
    </ResponsiveContainer>
  )
}

