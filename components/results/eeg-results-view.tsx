"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

interface EEGResultsViewProps {
  data: any
}

export function EEGResultsView({ data }: EEGResultsViewProps) {
  // Prepare time domain chart data
  const timeChartData = data.signal.cleaned.map((value: number, index: number) => ({
    index,
    value,
  }))

  // For better visualization, limit to 2000 points
  const displayData = timeChartData.slice(0, 2000)

  // Prepare frequency domain chart data
  const freqChartData = data.frequency.freqs.map((freq: number, index: number) => ({
    freq,
    power: data.frequency.psd[index],
  }))

  // Prepare band power data
  const bandPowerData = [
    { name: "Delta", power: data.bands.delta * 100 },
    { name: "Theta", power: data.bands.theta * 100 },
    { name: "Alpha", power: data.bands.alpha * 100 },
    { name: "Beta", power: data.bands.beta * 100 },
    { name: "Gamma", power: data.bands.gamma * 100 },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>EEG Signal (Filtered)</CardTitle>
          <CardDescription>Cleaned and filtered EEG signal</CardDescription>
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
                stroke="#9333ea"
                strokeWidth={1.5}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Frequency Spectrum</CardTitle>
            <CardDescription>Power spectral density of the EEG signal</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={freqChartData.slice(0, 100)} // Limit to first 100 frequency points
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis dataKey="freq" label={{ value: "Frequency (Hz)", position: "insideBottom", offset: -10 }} />
                <YAxis label={{ value: "Power", angle: -90, position: "insideLeft" }} />
                <Tooltip
                  formatter={(value: number) => [value.toExponential(2), "Power"]}
                  labelFormatter={(label) => `Frequency: ${Number(label).toFixed(1)} Hz`}
                />
                <Line
                  type="monotone"
                  dataKey="power"
                  stroke="#3b82f6"
                  strokeWidth={1.5}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Frequency Bands</CardTitle>
            <CardDescription>Distribution of power across EEG bands</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={bandPowerData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis dataKey="name" />
                <YAxis label={{ value: "Power (%)", angle: -90, position: "insideLeft" }} />
                <Tooltip formatter={(value: number) => [`${value.toFixed(1)}%`, "Relative Power"]} />
                <Bar dataKey="power" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>EEG Features</CardTitle>
          <CardDescription>Statistical and spectral features of the EEG signal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Hjorth Mobility</p>
              <p className="text-xl font-bold">{data.features.hjorth_mobility?.toFixed(3) || "N/A"}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Hjorth Complexity</p>
              <p className="text-xl font-bold">{data.features.hjorth_complexity?.toFixed(3) || "N/A"}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Kurtosis</p>
              <p className="text-xl font-bold">{data.features.kurtosis?.toFixed(3) || "N/A"}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Skewness</p>
              <p className="text-xl font-bold">{data.features.skewness?.toFixed(3) || "N/A"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

