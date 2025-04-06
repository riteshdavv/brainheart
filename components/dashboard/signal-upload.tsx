"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, FileText, Heart, Brain } from "lucide-react"

export function SignalUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    if (!file) return

    setUploading(true)

    // Simulate upload
    setTimeout(() => {
      setUploading(false)
      setFile(null)
      // Reset file input
      const fileInput = document.getElementById("file") as HTMLInputElement
      if (fileInput) fileInput.value = ""
    }, 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Signal Data</CardTitle>
        <CardDescription>Upload ECG or EEG data for analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="file">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="file">File Upload</TabsTrigger>
            <TabsTrigger value="stream">Live Stream</TabsTrigger>
          </TabsList>

          <TabsContent value="file" className="space-y-4">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="file">Select File</Label>
              <Input id="file" type="file" accept=".csv,.edf,.txt" onChange={handleFileChange} />
              <p className="text-xs text-muted-foreground">Supported formats: CSV, EDF, TXT (max 100MB)</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <input type="radio" id="ecg" name="signal-type" className="h-4 w-4" />
                <Label htmlFor="ecg" className="flex items-center gap-1">
                  <Heart className="h-4 w-4 text-rose-500" /> ECG Data
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <input type="radio" id="eeg" name="signal-type" className="h-4 w-4" />
                <Label htmlFor="eeg" className="flex items-center gap-1">
                  <Brain className="h-4 w-4 text-violet-500" /> EEG Data
                </Label>
              </div>
            </div>

            <Button onClick={handleUpload} disabled={!file || uploading} className="w-full">
              {uploading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Uploading...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload File
                </span>
              )}
            </Button>
          </TabsContent>

          <TabsContent value="stream" className="space-y-4">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="device">Device ID</Label>
              <Input id="device" placeholder="Enter device ID or IP address" />
            </div>

            <div className="grid w-full gap-1.5">
              <Label htmlFor="port">Port</Label>
              <Input id="port" placeholder="8080" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <input type="radio" id="ecg-stream" name="stream-type" className="h-4 w-4" />
                <Label htmlFor="ecg-stream" className="flex items-center gap-1">
                  <Heart className="h-4 w-4 text-rose-500" /> ECG Stream
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <input type="radio" id="eeg-stream" name="stream-type" className="h-4 w-4" />
                <Label htmlFor="eeg-stream" className="flex items-center gap-1">
                  <Brain className="h-4 w-4 text-violet-500" /> EEG Stream
                </Label>
              </div>
            </div>

            <Button className="w-full">
              <span className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Connect to Stream
              </span>
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

