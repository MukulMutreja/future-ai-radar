
import { StatCard } from "@/components/dashboard/StatCard";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { LatestToolsList } from "@/components/dashboard/LatestToolsList";
import { MainLayout } from "@/components/layout/MainLayout";
import { ArrowUpRight, BarChart2, Database, Sparkles, Star, TrendingUp } from "lucide-react";

// Mock data
const mockStats = [
  {
    title: "Total AI Tools",
    value: "3,456",
    description: "Tracked since launch",
    icon: Database,
    trending: "up" as const,
    trendingValue: "+34 this week"
  },
  {
    title: "New Discoveries",
    value: "127",
    description: "In the last 7 days",
    icon: Sparkles,
    trending: "up" as const,
    trendingValue: "+12% vs last week"
  },
  {
    title: "Most Popular",
    value: "LLaMA 3",
    description: "70.2k GitHub stars",
    icon: Star
  },
  {
    title: "Trending Category",
    value: "Multimodal",
    description: "+28% growth this month",
    icon: TrendingUp,
    trending: "up" as const,
    trendingValue: "+28%"
  }
];

const mockChartData = [
  { date: "Mar 1", nlp: 12, vision: 19, multimodal: 5, generative: 27, reinforcement: 8 },
  { date: "Mar 8", nlp: 15, vision: 21, multimodal: 9, generative: 32, reinforcement: 10 },
  { date: "Mar 15", nlp: 14, vision: 25, multimodal: 12, generative: 35, reinforcement: 11 },
  { date: "Mar 22", nlp: 18, vision: 27, multimodal: 17, generative: 42, reinforcement: 13 },
  { date: "Mar 29", nlp: 16, vision: 29, multimodal: 21, generative: 45, reinforcement: 14 },
  { date: "Apr 5", nlp: 21, vision: 32, multimodal: 25, generative: 52, reinforcement: 17 }
];

const trendCategories = [
  { name: "NLP", value: "nlp", color: "#6366f1" },
  { name: "Computer Vision", value: "vision", color: "#14b8a6" },
  { name: "Multi-modal", value: "multimodal", color: "#a855f7" },
  { name: "Generative AI", value: "generative", color: "#f97316" },
  { name: "Reinforcement Learning", value: "reinforcement", color: "#ef4444" }
];

const mockLatestTools = [
  {
    id: "1",
    name: "LLaMA-3-8B",
    description: "Open foundation language model with improved multilingual capabilities",
    source: "github" as const,
    category: "NLP",
    url: "#",
    stars: 12450,
    author: "Meta AI Research",
    dateAdded: "2025-04-05T10:30:00Z",
    tags: ["language-model", "open-source", "transformer"]
  },
  {
    id: "2",
    name: "DALL-E 3 Mini",
    description: "Lightweight version of DALL-E 3 for image generation from text prompts",
    source: "huggingface" as const,
    category: "Generative AI",
    url: "#",
    downloads: 45310,
    author: "OpenAI",
    dateAdded: "2025-04-04T14:22:00Z",
    tags: ["image-generation", "text-to-image", "diffusion"]
  },
  {
    id: "3",
    name: "SwiftFusion",
    description: "Real-time multimodal fusion model for AR/VR applications",
    source: "github" as const,
    category: "Multi-modal",
    url: "#",
    stars: 5324,
    author: "Apple ML",
    dateAdded: "2025-04-03T09:15:00Z",
    tags: ["ar-vr", "multimodal", "real-time"]
  },
  {
    id: "4",
    name: "EfficientDet-X",
    description: "Next-generation object detection model with state-of-the-art efficiency",
    source: "arxiv" as const,
    category: "Computer Vision",
    url: "#",
    citations: 87,
    author: "Google Research",
    dateAdded: "2025-04-02T16:40:00Z",
    tags: ["object-detection", "efficient", "computer-vision"]
  },
  {
    id: "5",
    name: "RL-Pilot",
    description: "Reinforcement learning framework for autonomous drone navigation",
    source: "github" as const,
    category: "Reinforcement Learning",
    url: "#",
    stars: 3256,
    author: "Stanford AI Lab",
    dateAdded: "2025-04-01T11:50:00Z",
    tags: ["reinforcement-learning", "autonomous", "robotics"]
  }
];

const sourceDistribution = [
  { date: "GitHub", value: 42 },
  { date: "Hugging Face", value: 28 },
  { date: "ArXiv", value: 18 },
  { date: "News", value: 12 }
];

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="container py-6 px-4">
        <div className="flex flex-col gap-1.5 mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time overview of the latest AI tools and models
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
          {mockStats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
        
        <div className="grid gap-6 md:grid-cols-6 lg:grid-cols-10 mb-6">
          <div className="md:col-span-4 lg:col-span-7">
            <TrendChart
              title="AI Tool Trends by Category"
              description="Weekly new AI tools by category"
              data={mockChartData}
              categories={trendCategories}
            />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <LatestToolsList tools={mockLatestTools} />
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <TrendChart
              title="Source Distribution"
              description="Distribution of AI tools by source"
              data={sourceDistribution}
              categories={[
                { name: "Value", value: "value", color: "#6366f1" }
              ]}
            />
          </div>
          <div className="lg:col-span-2">
            <div className="rounded-lg border h-full p-6">
              <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                    <Database className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New model added: DeepMind Gemini Pro 2</p>
                    <p className="text-xs text-muted-foreground">5 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">LLaMA 3 reached 70,000 GitHub stars</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                    <BarChart2 className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Daily summary for April 5, 2025 generated</p>
                    <p className="text-xs text-muted-foreground">3 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                    <Database className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">13 new repositories tracked from GitHub</p>
                    <p className="text-xs text-muted-foreground">5 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
