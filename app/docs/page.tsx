import Link from "next/link";
import Image from "next/image";
import { FileText, Book, Code, Github, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function DocsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-20 lg:py-24 bg-gray-100/70 dark:bg-gray-900/50">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Documentation
                </h1>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Comprehensive guides and API references to help you get the
                  most out of BrainHeart.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="api" className="w-full max-w-5xl mx-auto">
              <TabsList className="grid w-full h-full grid-cols-3 rounded-lg bg-gray-100/70 dark:bg-gray-800/50">
                <TabsTrigger
                  value="api"
                  className="rounded-md px-4 py-3 text-sm font-medium transition-all data-[state=active]:bg-[#FF5C35] data-[state=active]:text-white data-[state=inactive]:hover:bg-gray-100/70 dark:data-[state=inactive]:hover:bg-gray-800/50 dark:data-[state=active]:bg-[#FF5C35] dark:data-[state=active]:border-none"
                >
                  API Reference
                </TabsTrigger>
                <TabsTrigger
                  value="guides"
                  className="rounded-md px-4 py-3 text-sm font-medium transition-all data-[state=active]:bg-[#FF5C35] data-[state=active]:text-white data-[state=inactive]:hover:bg-gray-100/70 dark:data-[state=inactive]:hover:bg-gray-800/50 dark:data-[state=active]:bg-[#FF5C35] dark:data-[state=active]:border-none"
                >
                  User Guides
                </TabsTrigger>
                <TabsTrigger
                  value="tutorials"
                  className="rounded-md px-4 py-3 text-sm font-medium transition-all data-[state=active]:bg-[#FF5C35] data-[state=active]:text-white data-[state=inactive]:hover:bg-gray-100/70 dark:data-[state=inactive]:hover:bg-gray-800/50 dark:data-[state=active]:bg-[#FF5C35] dark:data-[state=active]:border-none"
                >
                  Tutorials
                </TabsTrigger>
              </TabsList>
              <TabsContent value="api" className="mt-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">API Documentation</h2>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="border-[#FF5C35] text-[#FF5C35] hover:bg-[#FF5C35]/10 transition-all"
                    >
                      <Link href="/api/swagger" target="_blank">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Swagger UI
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="border-[#FF5C35] text-[#FF5C35] hover:bg-[#FF5C35]/10 transition-all"
                    >
                      <Link href="/api/redoc" target="_blank">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        ReDoc
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="group relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#FF5C35]/30">
                    <CardHeader>
                      <CardTitle>Signal Processing</CardTitle>
                      <CardDescription>
                        APIs for processing EEG and ECG signals
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Code className="mr-2 h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">preprocess_eeg()</p>
                            <p className="text-sm text-muted-foreground">
                              Apply preprocessing steps to EEG signals
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Code className="mr-2 h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">preprocess_ecg()</p>
                            <p className="text-sm text-muted-foreground">
                              Apply preprocessing steps to ECG signals
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Code className="mr-2 h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">filter_signal()</p>
                            <p className="text-sm text-muted-foreground">
                              Apply frequency filters to signals
                            </p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        className="w-full border-[#FF5C35] text-[#FF5C35] hover:bg-[#FF5C35] hover:text-white transition-all"
                        asChild
                      >
                        <Link href="/docs/api/signal-processing">
                          View Documentation
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card className="group relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#FF5C35]/30">
                    <CardHeader>
                      <CardTitle>Analysis</CardTitle>
                      <CardDescription>
                        APIs for analyzing brain and heart signals
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Code className="mr-2 h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">spectral_analysis()</p>
                            <p className="text-sm text-muted-foreground">
                              Perform spectral analysis on signals
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Code className="mr-2 h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">coherence_analysis()</p>
                            <p className="text-sm text-muted-foreground">
                              Calculate coherence between signals
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Code className="mr-2 h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">hrv_analysis()</p>
                            <p className="text-sm text-muted-foreground">
                              Analyze heart rate variability
                            </p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        className="w-full border-[#FF5C35] text-[#FF5C35] hover:bg-[#FF5C35] hover:text-white transition-all"
                        asChild
                      >
                        <Link href="/docs/api/analysis">
                          View Documentation
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <Card className="group relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#FF5C35]/30">
                  <CardHeader>
                    <CardTitle>Python Package Installation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md bg-muted p-4">
                      <code className="text-sm">pip install brainheart</code>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Install the BrainHeart Python package to use the API in
                      your own projects.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full border-[#FF5C35] text-[#FF5C35] hover:bg-[#FF5C35] hover:text-white transition-all"
                      asChild
                    >
                      <Link
                        href="https://pypi.org/project/brainheart"
                        target="_blank"
                      >
                        View on PyPI
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="guides" className="mt-6 space-y-6">
                <h2 className="text-2xl font-bold">User Guides</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="group relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#FF5C35]/30">
                    <CardHeader>
                      <CardTitle>Getting Started</CardTitle>
                      <CardDescription>
                        Learn the basics of BrainHeart
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <FileText className="mr-2 h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">Installation Guide</p>
                            <p className="text-sm text-muted-foreground">
                              How to install and set up BrainHeart
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <FileText className="mr-2 h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">Quick Start</p>
                            <p className="text-sm text-muted-foreground">
                              Process your first dataset
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <FileText className="mr-2 h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">Core Concepts</p>
                            <p className="text-sm text-muted-foreground">
                              Understanding the BrainHeart architecture
                            </p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        className="w-full border-[#FF5C35] text-[#FF5C35] hover:bg-[#FF5C35] hover:text-white transition-all"
                        asChild
                      >
                        <Link href="/docs/guides/getting-started">
                          Read Guides
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card className="group relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#FF5C35]/30">
                    <CardHeader>
                      <CardTitle>Advanced Usage</CardTitle>
                      <CardDescription>
                        Dive deeper into BrainHeart capabilities
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <FileText className="mr-2 h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">Custom Pipelines</p>
                            <p className="text-sm text-muted-foreground">
                              Creating custom analysis pipelines
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <FileText className="mr-2 h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">Cloud Deployment</p>
                            <p className="text-sm text-muted-foreground">
                              Deploying BrainHeart to the cloud
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <FileText className="mr-2 h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">
                              Performance Optimization
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Optimizing BrainHeart for large datasets
                            </p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        className="w-full border-[#FF5C35] text-[#FF5C35] hover:bg-[#FF5C35] hover:text-white transition-all"
                        asChild
                      >
                        <Link href="/docs/guides/advanced">Read Guides</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="tutorials" className="mt-6 space-y-6">
                <h2 className="text-2xl font-bold">Interactive Tutorials</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="group relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#FF5C35]/30">
                    <CardHeader>
                      <CardTitle>Basic Tutorials</CardTitle>
                      <CardDescription>
                        Step-by-step guides for beginners
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Book className="mr-2 h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">EEG Preprocessing</p>
                            <p className="text-sm text-muted-foreground">
                              Learn how to preprocess EEG data
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Book className="mr-2 h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">ECG Analysis</p>
                            <p className="text-sm text-muted-foreground">
                              Extract heart rate and HRV metrics
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Book className="mr-2 h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">Data Visualization</p>
                            <p className="text-sm text-muted-foreground">
                              Create interactive visualizations
                            </p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        className="w-full border-[#FF5C35] text-[#FF5C35] hover:bg-[#FF5C35] hover:text-white transition-all"
                        asChild
                      >
                        <Link href="/docs/tutorials/basic">View Tutorials</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card className="group relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#FF5C35]/30">
                    <CardHeader>
                      <CardTitle>Advanced Tutorials</CardTitle>
                      <CardDescription>
                        In-depth examples for experienced users
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Book className="mr-2 h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">Brain-Heart Coupling</p>
                            <p className="text-sm text-muted-foreground">
                              Analyze interactions between brain and heart
                              signals
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Book className="mr-2 h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">
                              Machine Learning Integration
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Apply ML techniques to physiological data
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Book className="mr-2 h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">Real-time Processing</p>
                            <p className="text-sm text-muted-foreground">
                              Set up real-time signal processing pipelines
                            </p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        className="w-full border-[#FF5C35] text-[#FF5C35] hover:bg-[#FF5C35] hover:text-white transition-all"
                        asChild
                      >
                        <Link href="/docs/tutorials/advanced">
                          View Tutorials
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <Card className="group relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#FF5C35]/30">
                  <CardHeader>
                    <CardTitle>Jupyter Notebooks</CardTitle>
                    <CardDescription>
                      Interactive examples you can run in your browser
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-muted rounded-md flex items-center justify-center p-8 my-4">
                      <Image
                        src="/placeholder.svg?height=300&width=600"
                        alt="Jupyter Notebook Example"
                        width={600}
                        height={300}
                        className="object-contain"
                      />
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Our Jupyter notebooks provide interactive examples with
                      sample data that you can run and modify in your browser.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full border-[#FF5C35] text-[#FF5C35] hover:bg-[#FF5C35] hover:text-white transition-all"
                      asChild
                    >
                      <Link
                        href="https://github.com/brainheart/notebooks"
                        target="_blank"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        View on GitHub
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
