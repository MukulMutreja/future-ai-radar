
import { Button } from "@/components/ui/button";
import { Brain, ChevronRight, Database, Gauge, Sparkles, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border/40 bg-background">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 text-xl font-bold text-primary">
            <Sparkles className="h-6 w-6" />
            <span>FetchAI Radar</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/dashboard" className="text-sm font-medium hover:text-primary">Dashboard</Link>
            <Link to="/tools" className="text-sm font-medium hover:text-primary">AI Tools</Link>
            <Link to="/trends" className="text-sm font-medium hover:text-primary">Trends</Link>
            <Link to="/subscribe" className="text-sm font-medium hover:text-primary">Subscribe</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">Sign In</Button>
            <Button size="sm">Get Started</Button>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="flex-1 grid place-items-center px-4 py-16 md:py-24">
        <div className="container flex flex-col items-center text-center max-w-4xl">
          <div className="inline-flex items-center rounded-full border border-border/60 bg-secondary/30 px-3 py-1 text-sm mb-6">
            <Sparkles className="mr-1 h-3.5 w-3.5 text-primary" />
            <span>Discover AI Tools in Real-Time</span>
          </div>
          
          <h1 className="gradient-heading text-4xl md:text-6xl font-bold tracking-tight max-w-3xl mb-4">
            Your AI Discovery Agent for the Latest Models & Tools
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
            Stay ahead of the curve with real-time updates on the newest AI innovations from GitHub, Hugging Face, ArXiv, and more.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <Button asChild size="lg" className="flex-1">
              <Link to="/dashboard">
                Explore Dashboard
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="flex-1">
              <Link to="/subscribe">
                Subscribe to Updates
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="border-t border-border/40 bg-secondary/30 py-16">
        <div className="container px-4">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground max-w-2xl">
              Our AI discovery agent works around the clock to bring you the newest AI innovations in real-time.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={Gauge}
              title="Real-Time Monitoring"
              description="Continuously scans GitHub, Hugging Face, ArXiv, and news portals for the latest AI tools."
            />
            <FeatureCard 
              icon={Database}
              title="Comprehensive Database"
              description="Search, filter, and explore a growing collection of AI models and tools."
            />
            <FeatureCard 
              icon={TrendingUp}
              title="Analytics & Trends"
              description="Visualize popularity trends and discover emerging AI categories."
            />
            <FeatureCard 
              icon={Brain}
              title="AI Insights"
              description="Get notifications about breakthrough AI models that match your interests."
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 max-w-5xl">
          <div className="rounded-xl border border-border bg-card/50 p-8 md:p-12 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to Discover the Future of AI?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl">
                Join the community of AI enthusiasts and professionals who use FetchAI Radar to stay ahead of the curve.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link to="/dashboard">
                    Explore Dashboard
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/subscribe">
                    Subscribe to Updates
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-fetchai-primary/5 blur-3xl"></div>
            <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-fetchai-accent/5 blur-3xl"></div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-border/40 py-8">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xl font-bold text-primary">
              <Sparkles className="h-5 w-5" />
              <span>FetchAI Radar</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2025 FetchAI Radar. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

function FeatureCard({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ComponentType<any>; 
  title: string; 
  description: string 
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 flex flex-col items-center text-center transition-all duration-200 hover:border-primary/30 hover:shadow-sm">
      <div className="p-2 rounded-full bg-primary/10 mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export default Index;
