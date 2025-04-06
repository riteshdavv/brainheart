"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brain, Github, Heart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/features",
      label: "Features",
      active: pathname === "/features",
    },
    {
      href: "/demo",
      label: "Demo",
      active: pathname === "/demo",
    },
    {
      href: "/docs",
      label: "Docs",
      active: pathname === "/docs",
    },
    {
      href: "/community",
      label: "Community",
      active: pathname === "/community",
    },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-12">
            <Link
              href="/"
              className="flex items-center space-x-2 transition-transform hover:scale-105"
            >
              <div className="flex items-center">
                <Brain className="h-6 w-6 text-[#FF5C35]" />
                <Heart className="h-6 w-6 text-blue-800/70" />
              </div>
              <span className="hidden font-bold sm:inline-block">
                BrainHeart
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-[#FF5C35] relative group",
                    route.active ? "text-[#FF5C35]" : "text-muted-foreground"
                  )}
                >
                  {route.label}
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF5C35] transition-all duration-300 group-hover:w-full ${
                      route.active ? "w-full" : ""
                    }`}
                  ></span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <ThemeToggle />
            <Button
              asChild
              variant="outline"
              size="sm"
              className="transition-all hover:border-[#FF5C35] hover:text-[#FF5C35] hover:bg-[#FF5C35]/10"
            >
              <Link
                href="https://github.com/brainheart/repo"
                target="_blank"
                rel="noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="bg-[#FF5C35] text-white hover:bg-[#FF5C35]/90 transition-all"
            >
              <Link href="/demo">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
              className="transition-transform hover:scale-110"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="container md:hidden py-4 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              {routes.map((route, index) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-[#FF5C35] px-2 py-1 rounded",
                    route.active
                      ? "text-[#FF5C35] bg-[#FF5C35]/10"
                      : "text-muted-foreground animate-fade-up"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {route.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-2">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="transition-all hover:border-[#FF5C35] hover:text-[#FF5C35] hover:bg-[#FF5C35]/10"
                >
                  <Link
                    href="https://github.com/brainheart/repo"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="bg-[#FF5C35] text-white hover:bg-[#FF5C35]/90"
                >
                  <Link href="/demo">Get Started</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
