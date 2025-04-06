import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ECGChart } from "@/components/charts/ecg-chart"
import { EEGChart } from "@/components/charts/eeg-chart"
import { SyncChart } from "@/components/charts/sync-chart"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { SignalUpload } from "@/components/dashboard/signal-upload"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your BrainHeart dashboard. View and analyze your signal data.
        </p>
      </div>

      <StatsCards />

      <Tabs defaultValue="ecg" className="space-y-4">
        <TabsList>
          <TabsTrigger value="ecg">ECG Analysis</TabsTrigger>
          <TabsTrigger value="eeg">EEG Analysis</TabsTrigger>
          <TabsTrigger value="sync">Synchronization</TabsTrigger>
        </TabsList>

        <TabsContent value="ecg" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ECG Signal with R-peaks</CardTitle>
              <CardDescription>Visualize and analyze electrocardiogram data with detected R-peaks</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[400px] p-6">
                <ECGChart />
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Signal Statistics</CardTitle>
                <CardDescription>Key metrics from your ECG recording</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Heart Rate</p>
                      <p className="text-2xl font-bold">72 BPM</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">HRV (SDNN)</p>
                      <p className="text-2xl font-bold">42 ms</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">QT Interval</p>
                      <p className="text-2xl font-bold">380 ms</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">QRS Duration</p>
                      <p className="text-2xl font-bold">98 ms</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Anomaly Detection</CardTitle>
                <CardDescription>Potential irregularities in your ECG</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Premature Beats</p>
                      <p className="text-sm text-muted-foreground">3 occurrences detected</p>
                    </div>
                    <div className="text-yellow-500 font-medium">Low Risk</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Rhythm Irregularities</p>
                      <p className="text-sm text-muted-foreground">None detected</p>
                    </div>
                    <div className="text-green-500 font-medium">Normal</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">ST Segment Changes</p>
                      <p className="text-sm text-muted-foreground">Minor elevation observed</p>
                    </div>
                    <div className="text-yellow-500 font-medium">Low Risk</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="eeg" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>EEG Signal (Filtered)</CardTitle>
              <CardDescription>Visualize and analyze electroencephalogram data with applied filters</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[400px] p-6">
                <EEGChart />
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Frequency Bands</CardTitle>
                <CardDescription>Power distribution across EEG bands</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Delta (0.5-4 Hz)</p>
                      <p className="text-sm font-medium">42%</p>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-full w-[42%] rounded-full bg-primary"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Theta (4-8 Hz)</p>
                      <p className="text-sm font-medium">28%</p>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-full w-[28%] rounded-full bg-primary"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Alpha (8-13 Hz)</p>
                      <p className="text-sm font-medium">15%</p>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-full w-[15%] rounded-full bg-primary"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Beta (13-30 Hz)</p>
                      <p className="text-sm font-medium">10%</p>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-full w-[10%] rounded-full bg-primary"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Gamma (30+ Hz)</p>
                      <p className="text-sm font-medium">5%</p>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-full w-[5%] rounded-full bg-primary"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Brain Activity Analysis</CardTitle>
                <CardDescription>Insights from your EEG recording</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Attention Level</p>
                      <p className="text-sm text-muted-foreground">Based on beta/theta ratio</p>
                    </div>
                    <div className="text-green-500 font-medium">High</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Relaxation State</p>
                      <p className="text-sm text-muted-foreground">Based on alpha activity</p>
                    </div>
                    <div className="text-yellow-500 font-medium">Moderate</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Cognitive Load</p>
                      <p className="text-sm text-muted-foreground">Based on frontal theta activity</p>
                    </div>
                    <div className="text-blue-500 font-medium">Medium</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sync" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Brain-Heart Synchronization</CardTitle>
              <CardDescription>Visualize the relationship between ECG and EEG signals</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-4 p-6">
                <div className="h-[300px]">
                  <SyncChart />
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Synchronization Analysis</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      The correlation between brain and heart activity provides insights into autonomic regulation and
                      psychophysiological states.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Coherence Index</p>
                        <p className="text-sm font-medium">0.68</p>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-full w-[68%] rounded-full bg-primary"></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Phase Synchronization</p>
                        <p className="text-sm font-medium">0.42</p>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-full w-[42%] rounded-full bg-primary"></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Cross-Frequency Coupling</p>
                        <p className="text-sm font-medium">0.35</p>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-full w-[35%] rounded-full bg-primary"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Correlation Analysis</CardTitle>
                <CardDescription>Statistical relationships between signals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">HRV-Alpha Power</p>
                      <p className="text-sm text-muted-foreground">Correlation: 0.72</p>
                    </div>
                    <div className="text-green-500 font-medium">Strong</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">R-R Interval-Theta Power</p>
                      <p className="text-sm text-muted-foreground">Correlation: 0.45</p>
                    </div>
                    <div className="text-blue-500 font-medium">Moderate</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">QT Interval-Beta Power</p>
                      <p className="text-sm text-muted-foreground">Correlation: 0.21</p>
                    </div>
                    <div className="text-yellow-500 font-medium">Weak</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Research Insights</CardTitle>
                <CardDescription>AI-generated observations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Key Findings</p>
                    <ul className="list-disc pl-4 text-sm text-muted-foreground space-y-1">
                      <li>Strong correlation between HRV and alpha power suggests healthy autonomic regulation</li>
                      <li>Moderate phase synchronization indicates normal brain-heart communication</li>
                      <li>Cross-frequency coupling patterns are within expected ranges for resting state</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Recommendations</p>
                    <ul className="list-disc pl-4 text-sm text-muted-foreground space-y-1">
                      <li>Consider additional analysis of delta band activity</li>
                      <li>Explore time-frequency analysis for deeper insights</li>
                      <li>Compare results with normative database for more context</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        <SignalUpload />
        <RecentActivity />
      </div>
    </div>
  )
}

