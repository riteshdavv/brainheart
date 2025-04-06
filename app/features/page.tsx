import {
  Brain,
  Heart,
  Zap,
  BarChart3,
  Cloud,
  FileCode,
  Share2,
  LineChart,
  Database,
  Lock,
  Download,
} from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-20 lg:py-24 bg-gray-100/70 dark:bg-gray-900/50">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Features
                </h1>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover the powerful capabilities of BrainHeart for EEG and
                  ECG signal analysis.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <div className="space-y-6 max-w-3xl mx-auto">
                <div className="inline-flex items-center rounded-full bg-[#FF5C35]/10 px-3 py-1 text-sm text-[#FF5C35] ring-1 ring-[#FF5C35]/30">
                  Core Capabilities
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Core Capabilities
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  BrainHeart provides a comprehensive suite of tools for brain
                  and heart signal analysis.
                </p>
              </div>
            </div>
            <div className="grid max-w-6xl mx-auto items-stretch gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="group relative flex h-[260px] w-full flex-col items-start rounded-2xl border border-gray-200/50 dark:border-gray-800/50 hover:border-[#FF5C35]/50 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-gray-900/50">
                <div className="mb-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF2F0]">
                    <div className="flex">
                      <Brain className="h-6 w-6 text-[#FF5C35]" />
                      <Heart className="h-6 w-6 text-rose-500 -ml-1" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2.5">
                  <h3 className="text-xl font-bold">
                    EEG & ECG Signal Processing
                  </h3>
                  <p className="text-base text-muted-foreground/80">
                    Process raw EEG and ECG signals with advanced filtering,
                    artifact removal, and feature extraction techniques.
                  </p>
                </div>
              </div>
              <div className="group relative flex h-[260px] w-full flex-col items-start rounded-2xl border border-gray-200/50 dark:border-gray-800/50 hover:border-[#FF5C35]/50 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-gray-900/50">
                <div className="mb-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF2F0]">
                    <Zap className="h-6 w-6 text-[#FF5C35]" />
                  </div>
                </div>
                <div className="space-y-2.5">
                  <h3 className="text-xl font-bold">Real-time Data Analysis</h3>
                  <p className="text-base text-muted-foreground/80">
                    Analyze signals in real-time with low latency processing for
                    immediate feedback and monitoring.
                  </p>
                </div>
              </div>
              <div className="group relative flex h-[260px] w-full flex-col items-start rounded-2xl border border-gray-200/50 dark:border-gray-800/50 hover:border-[#FF5C35]/50 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-gray-900/50">
                <div className="mb-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF2F0]">
                    <BarChart3 className="h-6 w-6 text-[#FF5C35]" />
                  </div>
                </div>
                <div className="space-y-2.5">
                  <h3 className="text-xl font-bold">
                    Statistical & ML-based Insights
                  </h3>
                  <p className="text-base text-muted-foreground/80">
                    Apply statistical methods and machine learning algorithms to
                    extract meaningful patterns and correlations.
                  </p>
                </div>
              </div>
              <div className="group relative flex h-[260px] w-full flex-col items-start rounded-2xl border border-gray-200/50 dark:border-gray-800/50 hover:border-[#FF5C35]/50 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-gray-900/50">
                <div className="mb-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF2F0]">
                    <Cloud className="h-6 w-6 text-[#FF5C35]" />
                  </div>
                </div>
                <div className="space-y-2.5">
                  <h3 className="text-xl font-bold">Cloud-based Deployment</h3>
                  <p className="text-base text-muted-foreground/80">
                    Deploy analysis pipelines to the cloud for scalable
                    processing and collaborative research.
                  </p>
                </div>
              </div>
              <div className="group relative flex h-[260px] w-full flex-col items-start rounded-2xl border border-gray-200/50 dark:border-gray-800/50 hover:border-[#FF5C35]/50 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-gray-900/50">
                <div className="mb-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF2F0]">
                    <LineChart className="h-6 w-6 text-[#FF5C35]" />
                  </div>
                </div>
                <div className="space-y-2.5">
                  <h3 className="text-xl font-bold">
                    Interactive Visualizations
                  </h3>
                  <p className="text-base text-muted-foreground/80">
                    Visualize signals and analysis results with interactive
                    plots and dashboards for deeper understanding.
                  </p>
                </div>
              </div>
              <div className="group relative flex h-[260px] w-full flex-col items-start rounded-2xl border border-gray-200/50 dark:border-gray-800/50 hover:border-[#FF5C35]/50 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-gray-900/50">
                <div className="mb-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF2F0]">
                    <Share2 className="h-6 w-6 text-[#FF5C35]" />
                  </div>
                </div>
                <div className="space-y-2.5">
                  <h3 className="text-xl font-bold">Collaborative Research</h3>
                  <p className="text-base text-muted-foreground/80">
                    Share analysis pipelines and results with colleagues for
                    collaborative scientific research.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-100/70 to-transparent dark:from-gray-900/50 dark:to-transparent">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <div className="space-y-6 max-w-3xl mx-auto">
                <div className="inline-flex items-center rounded-full bg-[#FF5C35]/10 px-3 py-1 text-sm text-[#FF5C35] ring-1 ring-[#FF5C35]/30">
                  Technical Features
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Technical Features
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  BrainHeart is built with modern technologies to provide a
                  powerful and flexible platform.
                </p>
              </div>
            </div>
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 perspective-1000">
                <div className="transform-gpu transition-all duration-500 hover:translate-z-10 hover:scale-105">
                  <div className="h-full rounded-xl border border-gray-200/50 dark:border-gray-800/50 bg-background/50 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl hover:border-[#FF5C35]/30 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#FF5C35]/10 to-[#FF8C35]/10">
                        <FileCode className="h-6 w-6 text-[#FF5C35]" />
                      </div>
                      <h3 className="text-xl font-bold">Python-based API</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Built on Python for seamless integration with the
                      scientific computing ecosystem, including NumPy, SciPy,
                      and scikit-learn.
                    </p>
                  </div>
                </div>

                <div className="transform-gpu transition-all duration-500 hover:translate-z-10 hover:scale-105">
                  <div className="h-full rounded-xl border border-gray-200/50 dark:border-gray-800/50 bg-background/50 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl hover:border-[#FF5C35]/30 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#FF5C35]/10 to-[#FF8C35]/10">
                        <Database className="h-6 w-6 text-[#FF5C35]" />
                      </div>
                      <h3 className="text-xl font-bold">
                        Multiple Data Formats
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Support for various data formats including CSV, EDF, and
                      other common neurophysiological data formats.
                    </p>
                  </div>
                </div>

                <div className="transform-gpu transition-all duration-500 hover:translate-z-10 hover:scale-105">
                  <div className="h-full rounded-xl border border-gray-200/50 dark:border-gray-800/50 bg-background/50 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl hover:border-[#FF5C35]/30 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#FF5C35]/10 to-[#FF8C35]/10">
                        <Lock className="h-6 w-6 text-[#FF5C35]" />
                      </div>
                      <h3 className="text-xl font-bold">
                        Secure Data Handling
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Prioritize data security with encrypted storage and
                      processing, ensuring sensitive research data remains
                      protected.
                    </p>
                  </div>
                </div>

                <div className="transform-gpu transition-all duration-500 hover:translate-z-10 hover:scale-105">
                  <div className="h-full rounded-xl border border-gray-200/50 dark:border-gray-800/50 bg-background/50 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl hover:border-[#FF5C35]/30 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#FF5C35]/10 to-[#FF8C35]/10">
                        <Download className="h-6 w-6 text-[#FF5C35]" />
                      </div>
                      <h3 className="text-xl font-bold">Export Capabilities</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Export analysis results in various formats for further
                      processing or publication, including CSV, JSON, and
                      publication-ready figures.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <div className="space-y-6 max-w-3xl mx-auto">
                <div className="inline-flex items-center rounded-full bg-[#FF5C35]/10 px-3 py-1 text-sm text-[#FF5C35] ring-1 ring-[#FF5C35]/30">
                  Why Choose BrainHeart?
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Why Choose BrainHeart?
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  BrainHeart offers unique advantages for researchers and
                  developers working with neurophysiological data.
                </p>
              </div>
            </div>
            <div className="max-w-4xl mx-auto py-12">
              <div className="overflow-hidden rounded-lg border border-gray-300 dark:border-gray-600 shadow-lg bg-background">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100/70 dark:bg-gray-900/50">
                      <th className="p-6 text-left font-medium">Feature</th>
                      <th className="p-6 text-center font-medium">
                        BrainHeart
                      </th>
                      <th className="p-6 text-center font-medium">
                        Other Tools
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-t-gray-300 dark:border-t-gray-600 transition-colors hover:bg-gray-100/50 dark:hover:bg-gray-900/30">
                      <td className="p-6">Unified EEG & ECG Analysis</td>
                      <td className="p-6 text-center">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-[#FF5C35]/10 text-[#FF5C35]">
                          ✓
                        </span>
                      </td>
                      <td className="p-6 text-center text-muted-foreground">
                        ❌
                      </td>
                    </tr>
                    <tr className="border-t border-t-gray-300 dark:border-t-gray-600 transition-colors hover:bg-gray-100/50 dark:hover:bg-gray-900/30">
                      <td className="p-6">Open Source</td>
                      <td className="p-6 text-center">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-[#FF5C35]/10 text-[#FF5C35]">
                          ✓
                        </span>
                      </td>
                      <td className="p-6 text-center text-muted-foreground">
                        Varies
                      </td>
                    </tr>
                    <tr className="border-t border-t-gray-300 dark:border-t-gray-600 transition-colors hover:bg-gray-100/50 dark:hover:bg-gray-900/30">
                      <td className="p-6">Web-based Interface</td>
                      <td className="p-6 text-center">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-[#FF5C35]/10 text-[#FF5C35]">
                          ✓
                        </span>
                      </td>
                      <td className="p-6 text-center text-muted-foreground">
                        Limited
                      </td>
                    </tr>
                    <tr className="border-t border-t-gray-300 dark:border-t-gray-600 transition-colors hover:bg-gray-100/50 dark:hover:bg-gray-900/30">
                      <td className="p-6">Real-time Processing</td>
                      <td className="p-6 text-center">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-[#FF5C35]/10 text-[#FF5C35]">
                          ✓
                        </span>
                      </td>
                      <td className="p-6 text-center text-muted-foreground">
                        Limited
                      </td>
                    </tr>
                    <tr className="border-t border-t-gray-300 dark:border-t-gray-600 transition-colors hover:bg-gray-100/50 dark:hover:bg-gray-900/30">
                      <td className="p-6">Cloud Deployment</td>
                      <td className="p-6 text-center">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-[#FF5C35]/10 text-[#FF5C35]">
                          ✓
                        </span>
                      </td>
                      <td className="p-6 text-center text-muted-foreground">
                        Limited
                      </td>
                    </tr>
                    <tr className="border-t border-t-gray-300 dark:border-t-gray-600 transition-colors hover:bg-gray-100/50 dark:hover:bg-gray-900/30">
                      <td className="p-6">Interactive Visualizations</td>
                      <td className="p-6 text-center">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-[#FF5C35]/10 text-[#FF5C35]">
                          ✓
                        </span>
                      </td>
                      <td className="p-6 text-center text-muted-foreground">
                        Varies
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
