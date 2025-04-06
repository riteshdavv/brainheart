import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import { Brain, Heart, Upload } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 bg-gradient-to-b from-[#FF5C35]/10 to-[#FF5C35]/5">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
                  Interactive Demo
                </h1>
                <p className="text-muted-foreground md:text-xl">
                  Experience BrainHeart's capabilities with our interactive web
                  application.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full mt-12">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              ECG and EEG Signal Analysis Platform
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Upload, process, and analyze brain and heart signals with advanced
              algorithms
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/upload">
                <Button
                  size="lg"
                  className="bg-[#FF5C35] hover:bg-[#FF5C35]/90 text-white"
                >
                  <Upload className="mr-2 h-4 w-4" /> Upload Signals
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full my-8 md:mt-12 md:mb-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="api" className="w-full max-w-5xl mx-auto">
              <TabsList className="grid w-full h-full grid-cols-3 rounded-lg bg-gray-100/70 dark:bg-gray-800/50">
                <TabsTrigger
                  value="api"
                  className="rounded-md px-4 py-3 text-sm font-medium transition-all data-[state=active]:bg-[#FF5C35] data-[state=active]:text-white data-[state=inactive]:hover:bg-gray-100/70 dark:data-[state=inactive]:hover:bg-gray-800/50 dark:data-[state=active]:bg-[#FF5C35] dark:data-[state=active]:border-none"
                >
                  ECG Processing
                </TabsTrigger>
                <TabsTrigger
                  value="guides"
                  className="rounded-md px-4 py-3 text-sm font-medium transition-all data-[state=active]:bg-[#FF5C35] data-[state=active]:text-white data-[state=inactive]:hover:bg-gray-100/70 dark:data-[state=inactive]:hover:bg-gray-800/50 dark:data-[state=active]:bg-[#FF5C35] dark:data-[state=active]:border-none"
                >
                  EEG Processing
                </TabsTrigger>
                <TabsTrigger
                  value="tutorials"
                  className="rounded-md px-4 py-3 text-sm font-medium transition-all data-[state=active]:bg-[#FF5C35] data-[state=active]:text-white data-[state=inactive]:hover:bg-gray-100/70 dark:data-[state=inactive]:hover:bg-gray-800/50 dark:data-[state=active]:bg-[#FF5C35] dark:data-[state=active]:border-none"
                >
                  Brain-Heart Correlation
                </TabsTrigger>
              </TabsList>
              <TabsContent value="api" className="mt-6 space-y-6">
                <div className="flex flex-col justify-between gap-y-2">
                  <h2 className="text-2xl font-bold">ECG Processing</h2>
                  <p className="text-muted-foreground">Advanced electrocardiogram analysis</p>
                </div>

                <div className="grid gap-6">
                  <Card className="w-full group relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#FF5C35]/30">
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>R-peak detection and heart rate calculation</li>
                        <li>HRV analysis (SDNN, RMSSD, frequency domain)</li>
                        <li>ECG waveform delineation (P, Q, R, S, T waves)</li>
                        <li>Artifact removal and signal cleaning</li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        className="w-full border-[#FF5C35] text-[#FF5C35] hover:bg-[#FF5C35] hover:text-white transition-all"
                        asChild
                      >
                        <Link href="/docs">
                          View Documentation
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="guides" className="mt-6 space-y-6">
                <div className="flex flex-col justify-between gap-y-2">
                  <h2 className="text-2xl font-bold">EEG Processing</h2>
                  <p className="text-muted-foreground">Comprehensive electroencephalogram analysis</p>
                </div>
                <div className="grid gap-6">
                  <Card className="group relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#FF5C35]/30">
                    
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>
                          Frequency band extraction (delta, theta, alpha, beta, gamma)
                        </li>
                        <li>Artifact removal using advanced filtering</li>
                        <li>Spectral power analysis</li>
                        <li>
                          EEG feature extraction (Hjorth parameters, statistical
                          features)
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        className="w-full border-[#FF5C35] text-[#FF5C35] hover:bg-[#FF5C35] hover:text-white transition-all"
                        asChild
                      >
                        <Link href="/docs">
                          View Documentation
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="tutorials" className="mt-6 space-y-6">
                <div className="flex flex-col justify-between gap-y-2">
                  <h2 className="text-2xl font-bold">Brain-Heart Correlation</h2>
                  <p className="text-muted-foreground">Analyze the relationship between signals</p>
                </div>
                <div className="grid gap-6">
                  <Card className="group relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#FF5C35]/30">
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Time domain correlation analysis</li>
                      <li>Frequency domain coherence</li>
                      <li>Phase synchronization measures</li>
                      <li>HRV-EEG band power correlation</li>
                    </ul>
                  </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        className="w-full border-[#FF5C35] text-[#FF5C35] hover:bg-[#FF5C35] hover:text-white transition-all"
                        asChild
                      >
                        <Link href="/docs">View Documentation</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
