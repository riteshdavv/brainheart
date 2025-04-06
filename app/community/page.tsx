import Link from "next/link";
import {
  Github,
  MessageSquare,
  Users,
  GitBranch,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function CommunityPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-20 lg:py-24 bg-gray-100/70 dark:bg-gray-900/50">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-4 max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Community & Contributions
                </h1>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join the BrainHeart community and help shape the future of
                  brain-heart signal analysis.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#FF5C35] text-white hover:bg-[#FF5C35]/90 transition-all"
                >
                  <Link
                    href="https://github.com/riteshdavv/brainheart"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github className="mr-2 h-5 w-5" />
                    GitHub Repository
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-[#FF5C35] text-[#FF5C35] hover:bg-[#FF5C35]/10 transition-all"
                >
                  <Link
                    href="https://discord.gg/brainheart"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Join Discord
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2 max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold tracking-tighter">
                  How to Contribute
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  BrainHeart is an open-source project that welcomes
                  contributions from the community.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              <Card className="group relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <GitBranch className="mr-2 h-5 w-5 text-primary" />
                    Code Contributions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Help improve BrainHeart by contributing code, fixing bugs,
                    or adding new features. We follow a standard GitHub workflow
                    with pull requests.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="mr-2">1.</span>
                      <span>Fork the repository</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">2.</span>
                      <span>Create a feature branch</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">3.</span>
                      <span>Make your changes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">4.</span>
                      <span>Submit a pull request</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full border-[#FF5C35] text-[#FF5C35] transition-all hover:bg-[#FF5C35] hover:text-white"
                    asChild
                  >
                    <Link
                      href="https://github.com/brainheart/repo/blob/main/CONTRIBUTING.md"
                      target="_blank"
                    >
                      Contribution Guidelines
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="group relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                    Documentation & Tutorials
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Help improve our documentation, write tutorials, or create
                    examples to make BrainHeart more accessible to new users.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Improve API documentation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Create step-by-step tutorials</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Write blog posts about use cases</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Translate documentation</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full border-[#FF5C35] text-[#FF5C35] transition-all hover:bg-[#FF5C35] hover:text-white"
                    asChild
                  >
                    <Link
                      href="https://github.com/brainheart/docs"
                      target="_blank"
                    >
                      Documentation Repository
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="group relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2 h-5 w-5 text-primary" />
                    Community Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Help other users by answering questions, providing support,
                    and sharing your expertise in our community channels.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Answer questions on GitHub Discussions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Participate in Discord conversations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Review pull requests</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Report bugs and issues</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full border-[#FF5C35] text-[#FF5C35] transition-all hover:bg-[#FF5C35] hover:text-white"
                    asChild
                  >
                    <Link
                      href="https://github.com/brainheart/repo/discussions"
                      target="_blank"
                    >
                      Join Discussions
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-100/70 to-transparent dark:from-gray-900/50 dark:to-transparent">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2 max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold tracking-tighter">
                  Project Roadmap
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See what's coming next and help shape the future of
                  BrainHeart.
                </p>
              </div>
            </div>

            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="relative pl-8 border-l-2 border-[#FF5C35]/20">
                <div className="absolute left-0 top-0 -ml-[9px] h-5 w-5 rounded-full bg-[#FF5C35] ring-4 ring-[#FF5C35]/10"></div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-lg font-semibold text-[#FF5C35]">
                    Q2 2023 - Initial Release
                  </div>
                  <div className="text-sm font-medium text-[#FF5C35] bg-[#FF5C35]/10 px-3 py-1 rounded-full">
                    Completed
                  </div>
                </div>
                <div className="space-y-1.5 text-sm text-muted-foreground">
                  <p className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C35]/30 mr-2"></span>
                    Core functionality for EEG and ECG signal processing
                  </p>
                  <p className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C35]/30 mr-2"></span>
                    Basic visualization tools
                  </p>
                  <p className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C35]/30 mr-2"></span>
                    Python API and documentation
                  </p>
                </div>
              </div>

              <div className="relative pl-8 border-l-2 border-[#FF5C35]/20">
                <div className="absolute left-0 top-0 -ml-[9px] h-5 w-5 rounded-full bg-[#FF5C35] ring-4 ring-[#FF5C35]/10"></div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-lg font-semibold text-[#FF5C35]">
                    Q4 2023 - Web Interface
                  </div>
                  <div className="text-sm font-medium text-[#FF5C35] bg-[#FF5C35]/10 px-3 py-1 rounded-full">
                    In Progress
                  </div>
                </div>
                <div className="space-y-1.5 text-sm text-muted-foreground">
                  <p className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C35]/30 mr-2"></span>
                    Web-based interface for signal analysis
                  </p>
                  <p className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C35]/30 mr-2"></span>
                    Interactive visualizations
                  </p>
                  <p className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C35]/30 mr-2"></span>
                    User authentication and data management
                  </p>
                </div>
              </div>

              <div className="relative pl-8 border-l-2 border-[#FF5C35]/20">
                <div className="absolute left-0 top-0 -ml-[9px] h-5 w-5 rounded-full bg-gray-300 dark:bg-gray-700 ring-4 ring-gray-100 dark:ring-gray-800"></div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-lg font-semibold text-gray-500 dark:text-gray-400">
                    Q2 2024 - Advanced Analysis
                  </div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                    Planned
                  </div>
                </div>
                <div className="space-y-1.5 text-sm text-muted-foreground">
                  <p className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700 mr-2"></span>
                    Advanced statistical methods for brain-heart interactions
                  </p>
                  <p className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700 mr-2"></span>
                    Machine learning integration
                  </p>
                  <p className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700 mr-2"></span>
                    Real-time processing capabilities
                  </p>
                </div>
              </div>

              <div className="relative pl-8 border-l-2 border-[#FF5C35]/20">
                <div className="absolute left-0 top-0 -ml-[9px] h-5 w-5 rounded-full bg-gray-300 dark:bg-gray-700 ring-4 ring-gray-100 dark:ring-gray-800"></div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-lg font-semibold text-gray-500 dark:text-gray-400">
                    Q4 2024 - Cloud Platform
                  </div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                    Planned
                  </div>
                </div>
                <div className="space-y-1.5 text-sm text-muted-foreground">
                  <p className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700 mr-2"></span>
                    Cloud-based deployment options
                  </p>
                  <p className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700 mr-2"></span>
                    Collaborative research tools
                  </p>
                  <p className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700 mr-2"></span>
                    Integration with other neuroscience platforms
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2 max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold tracking-tighter">
                  Community Showcase
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See how researchers and developers are using BrainHeart in
                  their projects.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              <Card className="group relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30">
                <CardHeader>
                  <CardTitle>Cognitive Neuroscience Lab</CardTitle>
                  <CardDescription>University of California</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Using BrainHeart to study the relationship between cognitive
                    load and heart rate variability in a series of attention
                    tasks.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full border-[#FF5C35] text-[#FF5C35] transition-all hover:bg-[#FF5C35] hover:text-white"
                    asChild
                  >
                    <Link href="#">
                      View Case Study
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="group relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30">
                <CardHeader>
                  <CardTitle>Affective Computing Group</CardTitle>
                  <CardDescription>MIT Media Lab</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Integrating BrainHeart with wearable devices to monitor
                    emotional responses in real-world environments.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full border-[#FF5C35] text-[#FF5C35] transition-all hover:bg-[#FF5C35] hover:text-white"
                    asChild
                  >
                    <Link href="#">
                      View Case Study
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="group relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30">
                <CardHeader>
                  <CardTitle>NeuroTech Startup</CardTitle>
                  <CardDescription>San Francisco, CA</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Building a consumer health application that uses BrainHeart
                    to provide insights into stress and recovery based on
                    physiological signals.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full border-[#FF5C35] text-[#FF5C35] transition-all hover:bg-[#FF5C35] hover:text-white"
                    asChild
                  >
                    <Link href="#">
                      View Case Study
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-100/70 to-transparent dark:from-gray-900/50 dark:to-transparent">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to join the BrainHeart community?
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Contribute to the project, join discussions, or simply use the
                  tools for your research. Everyone is welcome!
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#FF5C35] text-white hover:bg-[#FF5C35]/90 transition-all"
                >
                  <Link
                    href="https://github.com/brainheart/repo"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github className="mr-2 h-5 w-5" />
                    GitHub Repository
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-[#FF5C35] text-[#FF5C35] hover:bg-[#FF5C35]/10 transition-all"
                >
                  <Link
                    href="https://discord.gg/brainheart"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Join Discord
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
