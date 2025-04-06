"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

interface CorrelationResultsViewProps {
  data: any
  ecgData?: any
  eegData?: any
}

export function CorrelationResultsView({ data, ecgData, eegData }: CorrelationResultsViewProps) {
  // Prepare coherence chart data
  const coherenceData = data.frequency_domain.coherence.frequencies.map((freq: number, index: number) => ({
    freq,
    coherence: data.frequency_domain.coherence.values[index],
  }))

  // Prepare band coherence data
  const bandCoherenceData = [
    { name: "Delta", coherence: data.frequency_domain.coherence.delta_band },
    { name: "Theta", coherence: data.frequency_domain.coherence.theta_band },
    { name: "Alpha", coherence: data.frequency_domain.coherence.alpha_band },
    { name: "Beta", coherence: data.frequency_domain.coherence.beta_band },
  ]

  // Format correlation values
  const pearsonCorr = data.time_domain.pearson.correlation
  const spearmanCorr = data.time_domain.spearman.correlation
  const maxCrossCorr = data.time_domain.cross_correlation.max_value
  const lag = data.time_domain.cross_correlation.lag_samples
  const plv = data.frequency_domain.phase_locking_value

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Brain-Heart Coherence</CardTitle>
          <CardDescription>Frequency-domain coherence between ECG and EEG signals</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={coherenceData.slice(0, 100)} // Limit to first 100 frequency points
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
              <XAxis dataKey="freq" label={{ value: "Frequency (Hz)", position: "insideBottom", offset: -10 }} />
              <YAxis domain={[0, 1]} label={{ value: "Coherence", angle: -90, position: "insideLeft" }} />
              <Tooltip
                formatter={(value: number) => [value.toFixed(3), "Coherence"]}
                labelFormatter={(label) => `Frequency: ${Number(label).toFixed(1)} Hz`}
              />
              <Line
                type="monotone"
                dataKey="coherence"
                stroke="#0ea5e9"
                strokeWidth={2}
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
            <CardTitle>Coherence by Frequency Band</CardTitle>
            <CardDescription>Coherence values across EEG frequency bands</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={bandCoherenceData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 1]} label={{ value: "Coherence", angle: -90, position: "insideLeft" }} />
                <Tooltip formatter={(value: number) => [value.toFixed(3), "Coherence"]} />
                <Bar dataKey="coherence" fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Time Domain Correlation</CardTitle>
            <CardDescription>Statistical correlation measures</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Pearson Correlation</p>
                  <p className="text-sm font-medium">{pearsonCorr.toFixed(3)}</p>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${Math.abs(pearsonCorr) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground">
                  p-value: {data.time_domain.pearson.p_value.toExponential(2)}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Spearman Correlation</p>
                  <p className="text-sm font-medium">{spearmanCorr.toFixed(3)}</p>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${Math.abs(spearmanCorr) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground">
                  p-value: {data.time_domain.spearman.p_value.toExponential(2)}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Max Cross-Correlation</p>
                  <p className="text-sm font-medium">{maxCrossCorr.toFixed(3)}</p>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${Math.abs(maxCrossCorr) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground">Lag: {lag} samples</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Advanced Synchronization Metrics</CardTitle>
          <CardDescription>Phase-based measures of brain-heart synchronization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Phase Locking Value</p>
              <p className="text-2xl font-bold">{plv.toFixed(3)}</p>
              <p className="text-xs text-muted-foreground">Measures consistency of phase differences between signals</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Alpha-HRV Correlation</p>
              <p className="text-2xl font-bold">{data.hrv_eeg_correlation?.sdnn?.alpha?.toFixed(3) || "N/A"}</p>
              <p className="text-xs text-muted-foreground">Relationship between HRV and alpha band power</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Theta-HRV Correlation</p>
              <p className="text-2xl font-bold">{data.hrv_eeg_correlation?.sdnn?.theta?.toFixed(3) || "N/A"}</p>
              <p className="text-xs text-muted-foreground">Relationship between HRV and theta band power</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

