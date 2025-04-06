"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Brain,
  Heart,
  Github,
  BarChart3,
  Cloud,
  Zap,
  ArrowRight,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Feature } from "@/components/feature";

export default function HomePage() {
  const testimonials = [
    {
      name: "Dr. Sarah Mitchell",
      role: "Neuroscience Director",
      image: "/testimonials/sarah.jpg",
      quote: "BrainHeart has revolutionized our research workflow",
    },
    {
      name: "Prof. James Wilson",
      role: "Cardiology Research Lead",
      image: "/testimonials/james.jpg",
      quote: "The precision and reliability of the analysis is outstanding",
    },
    {
      name: "Dr. Emma Thompson",
      role: "Clinical Director",
      image: "/testimonials/emma.jpg",
      quote: "A game-changer for our clinical diagnostics process",
    },
  ];

  const articles = [
    {
      title: "Global Signal Processing",
      image: "/articles/global.jpg",
      category: "Research",
    },
    {
      title: "The Future of Analysis",
      image: "/articles/future.jpg",
      category: "Technology",
    },
    {
      title: "Real-time Tracking",
      image: "/articles/tracking.jpg",
      category: "Innovation",
    },
  ];

  const features = [
    {
      title: "EEG & ECG Signal Processing",
      description:
        "Advanced processing algorithms for both brain and heart signals in a unified framework. Seamlessly analyze multiple data streams.",
      icon: Brain,
      secondaryIcon: Heart,
    },
    {
      title: "Real-time Data Analysis",
      description:
        "Process and analyze signals in real-time for immediate insights and feedback. Monitor and respond to changes as they happen.",
      icon: Zap,
    },
    {
      title: "Statistical & ML-based Insights",
      description:
        "Leverage statistical methods and machine learning for deeper signal analysis. Uncover patterns and correlations in your data.",
      icon: BarChart3,
    },
    {
      title: "Cloud-based Deployment",
      description:
        "Deploy your analysis pipelines to the cloud for scalable processing. Access your data and results from anywhere.",
      icon: Cloud,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-32">
          <div className="container mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-8">
                <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl xl:text-7xl">
                  Streamlined Signal Analysis Solutions
                </h1>
                <p className="text-lg text-muted-foreground max-w-[600px]">
                  Manage every step of your signal processing workflow, from
                  acquisition to analysis and visualization.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-[#FF5C35] hover:bg-[#FF5C35]/90 text-white"
                  >
                    <Link href="/demo">Get Started</Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="hover:bg-[#FF5C35]/10 hover:text-[#FF5C35] hover:border-[#FF5C35]"
                  >
                    <Link href="/features">Learn More</Link>
                  </Button>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <p className="text-3xl font-bold">15k+</p>
                    <p className="text-sm text-muted-foreground">
                      Active Users
                    </p>
                  </div>
                  <div className="h-12 w-[1px] bg-border" />
                  <div className="text-center">
                    <p className="text-3xl font-bold">99%</p>
                    <p className="text-sm text-muted-foreground">
                      Accuracy Rate
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative w-full">
                {/* Reduced glow effects */}
                <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-[#FF5C35]/20 rounded-full blur-[80px] opacity-30" />
                <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-[#FF5C35]/15 rounded-full blur-[80px] opacity-30 dark:bg-[#FF5C35]/25" />

                {/* Decorative circles with reduced opacity */}
                <div className="absolute top-1/4 -left-10 w-24 h-24 border-2 border-[#FF5C35]/30 rounded-full dark:border-[#FF5C35]/20" />
                <div className="absolute bottom-1/4 -right-10 w-20 h-20 border-2 border-[#FF5C35]/30 rounded-full dark:border-[#FF5C35]/20" />
                <div className="absolute top-1/3 right-1/4 w-12 h-12 border-2 border-[#FF5C35]/30 rounded-full dark:border-[#FF5C35]/20" />

                {/* Main image container with adjusted dimensions */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#FF5C35]/10 to-transparent backdrop-blur-sm shadow-[0_0_30px_rgba(255,92,53,0.15)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF5C35]/20 to-transparent opacity-40" />
                  <Image
                    src="/intro-image.png"
                    alt="Signal Analysis Platform"
                    fill
                    className="object-cover rounded-2xl transition-transform duration-700 hover:scale-105"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  />

                  {/* Reduced overlay gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent dark:from-black/30" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#FF5C35]/10 to-transparent mix-blend-overlay" />
                </div>

                {/* Reduced animated dots with slower animation */}
                <div className="absolute -bottom-4 left-1/4 w-3 h-3 rounded-full bg-[#FF5C35]/70 animate-pulse-slow" />
                <div
                  className="absolute top-4 right-1/4 w-3 h-3 rounded-full bg-[#FF5C35]/50 animate-pulse-slow"
                  style={{ animationDelay: "1s" }}
                />
                <div
                  className="absolute top-1/2 right-8 w-3 h-3 rounded-full bg-[#FF5C35]/60 animate-pulse-slow"
                  style={{ animationDelay: "2s" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-20 bg-gray-100/70 dark:bg-gray-900/50">
          <div className="container mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <div className="space-y-6 max-w-3xl">
                <div className="inline-flex items-center rounded-full bg-[#FF5C35]/10 px-3 py-1 text-sm text-[#FF5C35] ring-1 ring-[#FF5C35]/30">
                  Powerful Features
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Key Capabilities
                </h2>
                <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
                  BrainHeart provides powerful tools for researchers and
                  developers to analyze and visualize brain and heart signals.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl gap-8 py-8 md:grid-cols-2 lg:grid-cols-2">
              {features.map((feature) => (
                <Feature
                  key={feature.title}
                  icon={feature.icon}
                  secondaryIcon={feature.secondaryIcon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
            <div className="mt-16 text-center">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="transition-all duration-300 hover:border-[#FF5C35] hover:text-[#FF5C35] hover:bg-[#FF5C35]/10"
              >
                <Link href="/features">
                  Explore All Features
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-20 md:py-32">
          <div className="container mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-6 max-w-3xl">
                <div className="inline-flex items-center rounded-full bg-[#FF5C35]/10 px-3 py-1 text-sm text-[#FF5C35] ring-1 ring-[#FF5C35]/30">
                  Simplified Workflow
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  How BrainHeart Works
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  A streamlined approach to processing and analyzing
                  neurophysiological data
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-5xl">
              <div className="grid gap-8 md:grid-cols-3">
                <div className="flex flex-col items-center text-center space-y-4 px-6 py-12 rounded-lg bg-background border-gray-200 border dark:border-gray-600 shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#FF5C35]/50">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FF5C35]/10 text-[#FF5C35] font-bold text-2xl">
                    1
                  </div>
                  <h3 className="text-xl font-bold">Upload Data</h3>
                  <p className="text-sm text-muted-foreground">
                    Import your EEG and ECG datasets in various formats
                    including CSV and EDF
                  </p>
                </div>

                <div className="flex flex-col items-center text-center space-y-4 px-6 py-12 rounded-lg bg-background border-gray-200 dark:border-gray-600 border shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#FF5C35]/50">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FF5C35]/10 text-[#FF5C35] font-bold text-2xl">
                    2
                  </div>
                  <h3 className="text-xl font-bold">Process & Filter</h3>
                  <p className="text-sm text-muted-foreground">
                    Apply preprocessing techniques and filters to clean and
                    prepare your signals
                  </p>
                </div>

                <div className="flex flex-col items-center text-center space-y-4 px-6 py-12 rounded-lg bg-background border-gray-200 dark:border-gray-600 border shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#FF5C35]/50">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FF5C35]/10 text-[#FF5C35] font-bold text-2xl">
                    3
                  </div>
                  <h3 className="text-xl font-bold">Analyze & Visualize</h3>
                  <p className="text-sm text-muted-foreground">
                    Extract insights with advanced analysis tools and
                    interactive visualizations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-20 md:py-32 bg-gray-100/70 dark:bg-gray-900/50">
          <div className="container mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-6 max-w-3xl">
                <div className="inline-flex items-center rounded-full bg-[#FF5C35]/10 px-3 py-1 text-sm text-[#FF5C35] ring-1 ring-[#FF5C35]/30">
                  Trusted by Researchers
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  What Scientists Say
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  Hear from researchers who are using BrainHeart in their work
                </p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-background rounded-xl p-8 shadow-sm border-gray-200 dark:border-gray-600 border transition-all duration-300 hover:shadow-md hover:border-[#FF5C35]/50">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-[#FF5C35]/10 flex items-center justify-center">
                      <span className="text-[#FF5C35] font-bold">JD</span>
                    </div>
                    <div>
                      <h4 className="font-bold">Dr. Jane Doe</h4>
                      <p className="text-sm text-muted-foreground">
                        Neuroscience Researcher, Stanford Univ.
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">
                    "BrainHeart has revolutionized our approach to studying
                    cognitive-cardiac interactions. The unified framework saves
                    us countless hours of data processing."
                  </p>
                </div>
              </div>

              <div className="bg-background rounded-xl p-8 shadow-sm border-gray-200 dark:border-gray-600 border transition-all duration-300 hover:shadow-md hover:border-[#FF5C35]/50">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-[#FF5C35]/10 flex items-center justify-center">
                      <span className="text-[#FF5C35] font-bold">MS</span>
                    </div>
                    <div>
                      <h4 className="font-bold">Prof. Michael Smith</h4>
                      <p className="text-sm text-muted-foreground">
                        Cardiology Department, Johns Hopkins
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">
                    "The statistical tools in BrainHeart have helped us identify
                    patterns in heart-brain coupling that we hadn't been able to
                    detect with our previous methods."
                  </p>
                </div>
              </div>

              <div className="bg-background rounded-xl p-8 shadow-sm border-gray-200 dark:border-gray-600 border transition-all duration-300 hover:shadow-md hover:border-[#FF5C35]/50">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-[#FF5C35]/10 flex items-center justify-center">
                      <span className="text-[#FF5C35] font-bold">AK</span>
                    </div>
                    <div>
                      <h4 className="font-bold">Dr. Aisha Khan</h4>
                      <p className="text-sm text-muted-foreground">
                        Cognitive Neuroscientist, MIT
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">
                    "The real-time processing capabilities of BrainHeart have
                    transformed our experimental protocols, allowing for
                    adaptive paradigms based on physiological responses."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Articles Section */}
        <section className="w-full py-24">
          <div className="container mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <div className="space-y-6 max-w-3xl">
                <div className="inline-flex items-center rounded-full bg-[#FF5C35]/10 px-3 py-1 text-sm text-[#FF5C35] ring-1 ring-[#FF5C35]/30">
                  Latest Updates
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Research & Insights
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  Stay updated with our latest research findings and technical
                  insights
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {articles.map((article) => (
                <div
                  key={article.title}
                  className="group bg-background dark:bg-background/40 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-600 transition-all duration-300 hover:shadow-md hover:border-[#FF5C35]/50 dark:hover:border-[#FF5C35]/50"
                >
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="inline-flex items-center rounded-full bg-[#FF5C35]/10 px-3 py-1 text-sm text-[#FF5C35] font-medium ring-1 ring-[#FF5C35]/30">
                        {article.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        5 min read
                      </span>
                    </div>
                    <h3 className="text-xl font-bold tracking-tight mb-3 group-hover:text-[#FF5C35] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-3 mb-6">
                      {article.title === "Global Signal Processing"
                        ? "Explore how global signal processing techniques are revolutionizing brain and heart data analysis. Learn about advanced algorithms and cross-cultural research applications."
                        : article.title === "The Future of Analysis"
                        ? "Dive into emerging trends and technologies shaping the future of neurophysiological analysis. From AI integration to real-time processing breakthroughs."
                        : "Discover innovative approaches to monitoring brain and cardiac signals in real-time. New methods for immediate feedback and adaptive interventions."}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-[#FF5C35]/10 flex items-center justify-center">
                          <span className="text-[#FF5C35] text-sm font-medium">
                            BH
                          </span>
                        </div>
                        <div className="text-sm">
                          <p className="font-medium">BrainHeart Team</p>
                          <p className="text-muted-foreground">Mar 23, 2024</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:text-[#FF5C35] hover:bg-[#FF5C35]/10"
                      >
                        <ArrowRight className="h-4 w-4" />
                        <span className="sr-only">Read article</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="w-full py-20 md:py-32 bg-gray-100/70 dark:bg-gray-900/50">
          <div className="container mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl space-y-6">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Start Analyzing Brain-Heart Interactions Today
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  Join researchers worldwide who are using BrainHeart to uncover
                  new insights in neurophysiological data.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#FF5C35] text-white hover:bg-[#FF5C35]/90 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg"
                >
                  <Link href="/demo">Try the Demo</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="transition-all duration-300 hover:border-[#FF5C35] hover:text-[#FF5C35] hover:bg-[#FF5C35]/10"
                >
                  <Link
                    href="https://github.com/brainheart/repo"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github className="mr-2 h-5 w-5" />
                    Star on GitHub
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
