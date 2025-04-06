"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Brain, Heart, Upload, ArrowRight, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useNotification } from "@/components/ui/notification"
import { SiteHeader } from "@/components/site-header"

export default function UploadPage() {
  const [ecgFile, setEcgFile] = useState<File | null>(null)
  const [eegFile, setEegFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [ecgAnalysisId, setEcgAnalysisId] = useState<string | null>(null)
  const [eegAnalysisId, setEegAnalysisId] = useState<string | null>(null)
  const [correlationId, setCorrelationId] = useState<string | null>(null)
  const { showNotification } = useNotification()
  const router = useRouter()

  const handleEcgFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEcgFile(e.target.files[0])
    }
  }

  const handleEegFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEegFile(e.target.files[0])
    }
  }

  const uploadFile = async (file: File, signalType: string) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("signalType", signalType)

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json()
      const errorText = await response.text()
      console.error("Upload failed:", errorText)
      throw new Error("Upload failed")
    }

    return await response.json()
  }

  const correlateSignals = async (ecgId: string, eegId: string) => {
    const response = await fetch("/api/correlation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ecgAnalysisId: ecgId,
        eegAnalysisId: eegId,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Correlation failed")
    }

    return await response.json()
  }

  const handleUpload = async () => {
    if (!ecgFile || !eegFile) {
      showNotification({
        title: "Missing files",
        description: "Please select both ECG and EEG files",
        type: "error",
      })
      return
    }

    setIsUploading(true)

    try {
      // Upload ECG file
      showNotification({
        title: "Processing ECG",
        description: "Uploading and analyzing ECG data...",
        type: "info",
      })

      const ecgResult = await uploadFile(ecgFile, "ecg")
      setEcgAnalysisId(ecgResult.analysisId)

      showNotification({
        title: "ECG Processed",
        description: "ECG analysis complete",
        type: "success",
      })

      // Upload EEG file
      showNotification({
        title: "Processing EEG",
        description: "Uploading and analyzing EEG data...",
        type: "info",
      })

      const eegResult = await uploadFile(eegFile, "eeg")
      setEegAnalysisId(eegResult.analysisId)

      showNotification({
        title: "EEG Processed",
        description: "EEG analysis complete",
        type: "success",
      })

      // Correlate signals
      showNotification({
        title: "Correlating Signals",
        description: "Analyzing brain-heart relationship...",
        type: "info",
      })

      const correlationResult = await correlateSignals(ecgResult.analysisId, eegResult.analysisId)
      setCorrelationId(correlationResult.correlationId)

      showNotification({
        title: "Analysis Complete",
        description: "Brain-Heart correlation analysis finished successfully",
        type: "success",
      })
    } catch (error) {
      console.error("Upload error:", error)
      showNotification({
        title: "Error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        type: "error",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const viewResults = () => {
    if (ecgAnalysisId && eegAnalysisId && correlationId) {
      router.push(`/results?ecg=${ecgAnalysisId}&eeg=${eegAnalysisId}&correlation=${correlationId}`)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader/>
      <main className="flex items-center px-12">
        <section className="max-w-sm translate-y-1 py-12 md:py-24 opacity-75">
          <Card className="group relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#FF5C35]/30">
            <CardHeader>
              <CardTitle>
                <h2 className="text-xl font-semibold mb-4">Processing Steps</h2>
              </CardTitle>
              <CardContent>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Signal data is uploaded to the server</li>
                  <li>Preprocessing removes artifacts and noise</li>
                  <li>ECG analysis detects R-peaks and calculates heart rate variability</li>
                  <li>EEG analysis extracts frequency bands and computes spectral features</li>
                  <li>Brain-Heart correlation analysis measures synchronization</li>
                  <li>Results are visualized in interactive charts</li>
                </ol>
              </CardContent>
            </CardHeader>
          </Card>
        </section>
        <section className="w-full py-12 md:py-24">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Upload Signal Data</h1>
            <Card>
              <CardHeader>
                <CardTitle>Signal Upload</CardTitle>
                <CardDescription>Upload your ECG and EEG data files for analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="ecg-file" className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-rose-500" />
                      ECG File
                    </Label>
                    <Input
                      id="ecg-file"
                      type="file"
                      accept=".csv,.txt,.edf"
                      onChange={handleEcgFileChange}
                      disabled={isUploading}
                    />
                    <p className="text-sm text-muted-foreground">Supported formats: CSV, TXT, EDF</p>
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="eeg-file" className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-blue-500" />
                      EEG File
                    </Label>
                    <Input
                      id="eeg-file"
                      type="file"
                      accept=".csv,.txt,.edf"
                      onChange={handleEegFileChange}
                      disabled={isUploading}
                    />
                    <p className="text-sm text-muted-foreground">Supported formats: CSV, TXT, EDF</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button className="w-full bg-[#FF5C35] hover:bg-[#FF5C35]/90" onClick={handleUpload} disabled={isUploading || !ecgFile || !eegFile}>
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload and Analyze
                    </>
                  )}
                </Button>

                {ecgAnalysisId && eegAnalysisId && correlationId && (
                  <Button variant="outline" className="w-full" onClick={viewResults}>
                    View Results <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}

