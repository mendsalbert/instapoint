import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  ArrowRight,
  Sparkles,
  Presentation,
  Users,
  Code2,
  Mic,
  Share2,
  BrainCircuit,
  Layers,
} from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="container flex items-center justify-between py-8 max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 flex items-center justify-center group transition-all duration-300">
            <Layers className="h-6 w-6 text-slate-900 transform group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-xl font-semibold">InstaPoint</span>
        </div>
        <NavigationMenu>
          <NavigationMenuList className="hidden gap-6 md:flex">
            <NavigationMenuItem>
              <Link href="#" legacyBehavior passHref>
                <NavigationMenuLink className="text-sm font-medium text-muted-foreground hover:text-primary">
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="#" legacyBehavior passHref>
                <NavigationMenuLink className="text-sm font-medium text-muted-foreground hover:text-primary">
                  For business
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="#" legacyBehavior passHref>
                <NavigationMenuLink className="text-sm font-medium text-muted-foreground hover:text-primary">
                  Media
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="#" legacyBehavior passHref>
                <NavigationMenuLink className="text-sm font-medium text-muted-foreground hover:text-primary">
                  Blog
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="#" legacyBehavior passHref>
                <NavigationMenuLink className="text-sm font-medium text-muted-foreground hover:text-primary">
                  Features
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="#" legacyBehavior passHref>
                <NavigationMenuLink className="text-sm font-medium text-muted-foreground hover:text-primary">
                  Templates
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="#" legacyBehavior passHref>
                <NavigationMenuLink className="text-sm font-medium text-muted-foreground hover:text-primary">
                  Pricing
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Button>Sign In</Button>
      </header>

      {/* Hero Section */}
      <section className="container py-24 text-center max-w-6xl mx-auto px-6 relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] bg-gradient-to-r from-primary/20 to-purple-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="inline-flex items-center gap-2 bg-muted px-4 py-2 rounded-full mb-6">
          <Sparkles className="h-4 w-4 text-primary animate-pulse" />
          <span className="text-sm">AI-Powered Presentations</span>
        </div>

        <h1 className="mb-8 text-6xl font-medium tracking-tight text-slate-900">
          Present Like Magic
          <span className="block text-primary mt-2">Powered by AI</span>
        </h1>

        <p className="mx-auto max-w-2xl text-lg text-muted-foreground px-4 mb-12">
          Transform your ideas into stunning presentations instantly with AI.
          Create, present, and share dynamic slides in real-time while engaging
          your audience like never before.
        </p>

        <div className="flex gap-4 justify-center mb-16">
          <Button size="lg" className="gap-2">
            <Mic className="h-4 w-4" />
            Start Presenting
          </Button>
          <Button size="lg" variant="outline" className="gap-2">
            <Presentation className="h-4 w-4" />
            Watch Demo
          </Button>
        </div>

        <div className="flex justify-center gap-12 text-sm">
          <div className="group flex flex-col items-center gap-2 transition-transform hover:-translate-y-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <BrainCircuit className="h-6 w-6 text-primary" />
            </div>
            <span className="font-medium">10x Faster</span>
            <span className="text-xs text-muted-foreground">
              Than Traditional Tools
            </span>
          </div>

          <div className="group flex flex-col items-center gap-2 transition-transform hover:-translate-y-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Share2 className="h-6 w-6 text-primary" />
            </div>
            <span className="font-medium">100K+</span>
            <span className="text-xs text-muted-foreground">
              Presentations Shared
            </span>
          </div>

          <div className="group flex flex-col items-center gap-2 transition-transform hover:-translate-y-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <span className="font-medium">50K+</span>
            <span className="text-xs text-muted-foreground">
              Happy Presenters
            </span>
          </div>
        </div>
      </section>

      {/* Three Column Section */}
      <section className="container grid gap-8 py-16 md:grid-cols-3 max-w-7xl mx-auto px-6">
        {/* Real-time Generation Card */}
        <Card className="p-8 group hover:shadow-lg transition-all duration-300 hover:border-primary/50">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-medium">Instant Generation</h2>
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Mic className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="mt-1 h-4 w-4 rounded-full border-2 border-primary"></div>
              <p className="text-sm text-muted-foreground">
                Speak naturally and watch your slides create themselves
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-1 h-4 w-4 rounded-full border-2 border-primary"></div>
              <p className="text-sm text-muted-foreground">
                AI-powered summarization and visualization
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-1 h-4 w-4 rounded-full border-2 border-primary"></div>
              <p className="text-sm text-muted-foreground">
                Smart formatting and design suggestions
              </p>
            </div>
          </div>
        </Card>

        {/* Live Code Demo Card */}
        <Card className="p-8 group hover:shadow-lg transition-all duration-300 hover:border-primary/50">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-medium">Code Demonstration</h2>
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Code2 className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="grid gap-4">
            <div className="rounded-lg bg-[#1E1E1E] p-4 group-hover:bg-[#252525] transition-colors overflow-hidden">
              <div className="flex items-center gap-2 mb-3 text-xs text-gray-400">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                </div>
                <span>demo.py</span>
              </div>
              <pre className="text-sm">
                <code className="text-gray-100">
                  <span className="text-[#569CD6]">def</span>{" "}
                  <span className="text-[#DCDCAA]">present_code</span>():
                  <br />
                  {"    "}
                  <span className="text-[#6A9955]">
                    # AI explains in real-time
                  </span>
                  <br />
                  {"    "}
                  <span className="text-[#569CD6]">for</span> line{" "}
                  <span className="text-[#569CD6]">in</span>{" "}
                  <span className="text-[#DCDCAA]">code</span>:
                  <br />
                  {"        "}
                  <span className="text-[#4EC9B0]">highlight</span>(line)
                  <br />
                  {"        "}
                  <span className="text-[#4EC9B0]">explain</span>(line)
                  <br />
                  {"    "}
                  <span className="text-[#CE9178]">
                    "Live coding made simple"
                  </span>
                </code>
              </pre>
            </div>
          </div>
          <Button
            variant="secondary"
            className="mt-6 w-full group-hover:bg-primary/10 transition-colors"
          >
            Try Live Demo
          </Button>
        </Card>

        {/* Audience Interaction Card */}
        <Card className="p-8 group hover:shadow-lg transition-all duration-300 hover:border-primary/50">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-medium">Audience Engagement</h2>
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Users className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="mt-1 h-4 w-4 rounded-full border-2 border-primary"></div>
              <p className="text-sm text-muted-foreground">
                Live Q&A with AI-powered responses
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-1 h-4 w-4 rounded-full border-2 border-primary"></div>
              <p className="text-sm text-muted-foreground">
                Real-time audience feedback and polls
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-1 h-4 w-4 rounded-full border-2 border-primary"></div>
              <p className="text-sm text-muted-foreground">
                Instant slide sharing with attendees
              </p>
            </div>
          </div>
          <div className="mt-8 flex items-center justify-between">
            <div className="text-sm font-medium">
              Explore audience features
              <br />
              and boost engagement
            </div>
            <Button variant="ghost" size="icon">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}
