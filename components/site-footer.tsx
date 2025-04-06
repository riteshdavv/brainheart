import Link from "next/link";
import {
  Brain,
  Github,
  Heart,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const productLinks = [
  { href: "/features", label: "Features" },
  { href: "/demo", label: "Demo" },
  { href: "/docs", label: "Documentation" },
  { href: "/roadmap", label: "Roadmap" },
];

const resourceLinks = [
  { href: "/community", label: "Contributors" },
  {
    href: "https://github.com/brainheart/repo/discussions",
    label: "Discussions",
  },
  { href: "https://discord.gg/brainheart", label: "Discord" },
  { href: "/blog", label: "Blog" },
];

export function SiteFooter() {
  return (
    <footer className="w-full bg-background">
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-[#FF5C35]" />
              <Heart className="h-6 w-6 text-accent" />
              <span className="font-bold text-xl">BrainHeart</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Empowering researchers with advanced signal processing tools for
              brain and heart analysis.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/brainheart/repo"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-[#FF5C35] transition-colors"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://twitter.com/brainheart"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-[#FF5C35] transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Product</h3>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-[#FF5C35] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Resources</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-[#FF5C35] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>contact@brainheart.com</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>123 Research Ave, Science City</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-400 dark:border-gray-600 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} BrainHeart. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-[#FF5C35] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-[#FF5C35] transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
