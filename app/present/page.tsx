import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mic, Settings, Share2, Presentation, Layers } from "lucide-react";
import Link from "next/link";

export default function PresentPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container flex items-center justify-between py-4 max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 flex items-center justify-center">
              <Layers className="h-6 w-6 text-slate-900" />
            </div>
            <span className="text-xl font-semibold">InstaPoint</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-5xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* Title Section */}
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold">Start New Presentation</h1>
            <p className="text-muted-foreground">
              Begin with a topic or upload your content
            </p>
          </div>

          {/* Input Options */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Voice Input Card */}
            <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/50 cursor-pointer group">
              <div className="h-full flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-medium mb-2">Voice Input</h2>
                    <p className="text-sm text-muted-foreground">
                      Start presenting and let AI create slides in real-time
                    </p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mic className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="mt-auto">
                  <Link href="/present/voice" className="mt-auto w-full">
                    <Button className="w-full gap-2">
                      <Mic className="h-4 w-4" />
                      Start Speaking
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>

            {/* Text Input Card */}
            <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/50">
              <div className="h-full flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-medium mb-2">Text Input</h2>
                    <p className="text-sm text-muted-foreground">
                      Enter your topic or paste your content
                    </p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Presentation className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <Input
                    placeholder="Enter presentation topic or paste content..."
                    className="h-24 resize-none"
                  />
                  <Button variant="secondary" className="w-full gap-2">
                    Generate Slides
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Presentations */}
          <div className="space-y-4 mt-12">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium">Recent Presentations</h2>
              <Button variant="ghost" className="text-sm text-muted-foreground">
                View All
              </Button>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <Card
                  key={i}
                  className="p-4 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="aspect-video bg-muted rounded-md mb-3 flex items-center justify-center">
                    <Presentation className="h-8 w-8 text-muted-foreground/50" />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Product Demo {i}</h3>
                      <p className="text-sm text-muted-foreground">
                        2 days ago
                      </p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
