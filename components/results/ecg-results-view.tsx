"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from "recharts"

interface ECGResultsViewProps {
  data: any
}

export function ECGResultsView({ data }: ECGResultsViewProps) {
  // Prepare chart data
  const chartData = data.signal.cleaned.map((value: number, index: number) => ({
    index,
    value,
    isPeak: data.peaks.r_peaks.includes(index),
  }))

  // For better visualization, limit to 2000 points
  const displayData = chartData.slice(0, 2000)

  // Format features for display
  const features = data.features

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>ECG Signal with R-peaks</CardTitle>
          <CardDescription>Cleaned ECG signal with detected R-peaks highlighted</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={displayData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
              <XAxis dataKey="index" label={{ value: "Time (samples)", position: "insideBottom", offset: -10 }} />
              <YAxis domain={["auto", "auto"]} label={{ value: "Amplitude", angle: -90, position: "insideLeft" }} />
              <Tooltip
                formatter={(value: number) => [value.toFixed(3), "Amplitude"]}
                labelFormatter={(label) => `Sample: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#2563eb"
                strokeWidth={1.5}
                dot={false}
                isAnimationActive={false}
              />
              {displayData
                .filter((point) => point.isPeak)
                .map((point, index) => (
                  <ReferenceDot
                    key={`peak-${index}`}
                    x={point.index}
                    y={point.value}
                    r={4}
                    fill="#ef4444"
                    stroke="none"
                  />
                ))}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Heart Rate Variability</CardTitle>
            <CardDescription>Key HRV metrics from the analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Mean Heart Rate</p>
                  <p className="text-2xl font-bold">{features.mean_hr?.toFixed(1) || "N/A"} BPM</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">SDNN</p>
                  <p className="text-2xl font-bold">{features.sdnn?.toFixed(2) || "N/A"} ms</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">RMSSD</p>
                  <p className="text-2xl font-bold">{features.rmssd?.toFixed(2) || "N/A"} ms</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">LF/HF Ratio</p>
                  <p className="text-2xl font-bold">{features.lf_hf_ratio?.toFixed(2) || "N/A"}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Signal Information</CardTitle>
            <CardDescription>Technical details about the ECG recording</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Sampling Rate</p>
                  <p className="text-2xl font-bold">{data.metadata.sampling_rate} Hz</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Duration</p>
                  <p className="text-2xl font-bold">{data.metadata.duration_seconds.toFixed(1)} s</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">R-peaks Detected</p>
                  <p className="text-2xl font-bold">{data.peaks.r_peaks.length}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Sample Entropy</p>
                  <p className="text-2xl font-bold">{features.sample_entropy?.toFixed(3) || "N/A"}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

