import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Heart, Upload } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Heart className="h-6 w-6 text-rose-500" />
              <Brain className="h-6 w-6 ml-[-5px] text-blue-500" />
            </div>
            <span className="text-xl font-bold">BrainHeart</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium">
              How It Works
            </Link>
            <Link href="/dashboard" className="text-sm font-medium">
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      <main className="container py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">ECG and EEG Signal Analysis Platform</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Upload, process, and analyze brain and heart signals with advanced algorithms
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/upload">
              <Button size="lg" className="w-full sm:w-auto">
                <Upload className="mr-2 h-4 w-4" /> Upload Signals
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-16">
          <Card>
            <CardHeader>
              <CardTitle>ECG Processing</CardTitle>
              <CardDescription>Advanced electrocardiogram analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>R-peak detection and heart rate calculation</li>
                <li>HRV analysis (SDNN, RMSSD, frequency domain)</li>
                <li>ECG waveform delineation (P, Q, R, S, T waves)</li>
                <li>Artifact removal and signal cleaning</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>EEG Processing</CardTitle>
              <CardDescription>Comprehensive electroencephalogram analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Frequency band extraction (delta, theta, alpha, beta, gamma)</li>
                <li>Artifact removal using advanced filtering</li>
                <li>Spectral power analysis</li>
                <li>EEG feature extraction (Hjorth parameters, statistical features)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Brain-Heart Correlation</CardTitle>
              <CardDescription>Analyze the relationship between signals</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Time domain correlation analysis</li>
                <li>Frequency domain coherence</li>
                <li>Phase synchronization measures</li>
                <li>HRV-EEG band power correlation</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

