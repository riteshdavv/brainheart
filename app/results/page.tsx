"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { ECGResultsView } from "@/components/results/ecg-results-view";
import { EEGResultsView } from "@/components/results/eeg-results-view";
import { CorrelationResultsView } from "@/components/results/correlation-results-view";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

interface AnalysisData {
  [key: string]: any;
}

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const ecgId = searchParams.get("ecg");
  const eegId = searchParams.get("eeg");
  const correlationId = searchParams.get("correlation");

  const [ecgData, setEcgData] = useState<AnalysisData | null>(null);
  const [eegData, setEegData] = useState<AnalysisData | null>(null);
  const [correlationData, setCorrelationData] = useState<AnalysisData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch ECG data
        if (ecgId) {
          const ecgResponse = await fetch(`/api/analysis/${ecgId}`);
          if (!ecgResponse.ok) {
            throw new Error("Failed to fetch ECG data");
          }
          const ecgResult = await ecgResponse.json();
          setEcgData(ecgResult);
        }

        // Fetch EEG data
        if (eegId) {
          const eegResponse = await fetch(`/api/analysis/${eegId}`);
          if (!eegResponse.ok) {
            throw new Error("Failed to fetch EEG data");
          }
          const eegResult = await eegResponse.json();
          setEegData(eegResult);
        }

        // Fetch correlation data
        if (correlationId) {
          const correlationResponse = await fetch(
            `/api/correlation/${correlationId}`
          );
          if (!correlationResponse.ok) {
            throw new Error("Failed to fetch correlation data");
          }
          const correlationResult = await correlationResponse.json();
          setCorrelationData(correlationResult);
        }
      } catch (err) {
        console.error("Error fetching results:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [ecgId, eegId, correlationId]);

  if (isLoading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-semibold">Loading Results</h2>
          <p className="text-muted-foreground mt-2">
            Please wait while we retrieve your analysis data...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-12">
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">
              Error Loading Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen ">
      <SiteHeader />
      <main className="flex-1 mt-12 mb-16 mx-12 md:mx-24">
        <h1 className="text-3xl font-bold mb-6">Analysis Results</h1>

        <Tabs defaultValue="ecg" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ecg">ECG Analysis</TabsTrigger>
            <TabsTrigger value="eeg">EEG Analysis</TabsTrigger>
            <TabsTrigger value="correlation">
              Brain-Heart Correlation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ecg">
            {ecgData ? (
              <ECGResultsView data={ecgData} />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>ECG Data Not Available</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>No ECG analysis data was found.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="eeg">
            {eegData ? (
              <EEGResultsView data={eegData} />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>EEG Data Not Available</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>No EEG analysis data was found.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="correlation">
            {correlationData ? (
              <CorrelationResultsView
                data={correlationData}
                ecgData={ecgData}
                eegData={eegData}
              />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Correlation Data Not Available</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>No correlation analysis data was found.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
      <SiteFooter/>
    </div>
  );
}
