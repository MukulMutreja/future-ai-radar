
import { MainLayout } from "@/components/layout/MainLayout";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Mock data for trends
const weeklyTrendData = [
  { date: "Week 1", nlp: 18, vision: 22, multimodal: 12, generative: 35, reinforcement: 13 },
  { date: "Week 2", nlp: 22, vision: 25, multimodal: 15, generative: 38, reinforcement: 15 },
  { date: "Week 3", nlp: 20, vision: 28, multimodal: 19, generative: 42, reinforcement: 17 },
  { date: "Week 4", nlp: 25, vision: 30, multimodal: 22, generative: 46, reinforcement: 16 },
  { date: "Week 5", nlp: 23, vision: 33, multimodal: 26, generative: 50, reinforcement: 19 },
  { date: "Week 6", nlp: 28, vision: 36, multimodal: 31, generative: 55, reinforcement: 21 },
  { date: "Week 7", nlp: 26, vision: 39, multimodal: 35, generative: 60, reinforcement: 23 },
  { date: "Week 8", nlp: 30, vision: 42, multimodal: 40, generative: 65, reinforcement: 25 }
];

const sourceTrendData = [
  { date: "Week 1", github: 45, huggingface: 28, arxiv: 18, news: 9 },
  { date: "Week 2", github: 48, huggingface: 30, arxiv: 19, news: 11 },
  { date: "Week 3", github: 52, huggingface: 33, arxiv: 21, news: 12 },
  { date: "Week 4", github: 55, huggingface: 35, arxiv: 23, news: 14 },
  { date: "Week 5", github: 58, huggingface: 38, arxiv: 25, news: 15 },
  { date: "Week 6", github: 62, huggingface: 42, arxiv: 28, news: 17 },
  { date: "Week 7", github: 65, huggingface: 45, arxiv: 30, news: 18 },
  { date: "Week 8", github: 68, huggingface: 48, arxiv: 33, news: 20 }
];

const frameworkTrendData = [
  { date: "Week 1", pytorch: 55, tensorflow: 35, jax: 10 },
  { date: "Week 2", pytorch: 58, tensorflow: 33, jax: 12 },
  { date: "Week 3", pytorch: 60, tensorflow: 30, jax: 15 },
  { date: "Week 4", pytorch: 62, tensorflow: 28, jax: 18 },
  { date: "Week 5", pytorch: 65, tensorflow: 25, jax: 20 },
  { date: "Week 6", pytorch: 68, tensorflow: 22, jax: 22 },
  { date: "Week 7", pytorch: 70, tensorflow: 20, jax: 25 },
  { date: "Week 8", pytorch: 72, tensorflow: 18, jax: 28 }
];

const trendCategories = [
  { name: "NLP", value: "nlp", color: "#6366f1" },
  { name: "Computer Vision", value: "vision", color: "#14b8a6" },
  { name: "Multi-modal", value: "multimodal", color: "#a855f7" },
  { name: "Generative AI", value: "generative", color: "#f97316" },
  { name: "Reinforcement Learning", value: "reinforcement", color: "#ef4444" }
];

const sourceTrendCategories = [
  { name: "GitHub", value: "github", color: "#6366f1" },
  { name: "Hugging Face", value: "huggingface", color: "#14b8a6" },
  { name: "ArXiv", value: "arxiv", color: "#a855f7" },
  { name: "News", value: "news", color: "#f97316" }
];

const frameworkTrendCategories = [
  { name: "PyTorch", value: "pytorch", color: "#6366f1" },
  { name: "TensorFlow", value: "tensorflow", color: "#ef4444" },
  { name: "JAX", value: "jax", color: "#a855f7" }
];

const popularRepositories = [
  { name: "LLaMA 3", stars: 70200, category: "NLP", trend: "up" },
  { name: "DALL-E 3", stars: 58300, category: "Generative AI", trend: "up" },
  { name: "EfficientDet-X", stars: 42100, category: "Computer Vision", trend: "stable" },
  { name: "SwiftFusion", stars: 35700, category: "Multi-modal", trend: "up" },
  { name: "Diffusion Transformer", stars: 28500, category: "Generative AI", trend: "up" },
  { name: "NeRF++", stars: 25400, category: "Computer Vision", trend: "stable" },
  { name: "BioGPT-Med", stars: 21800, category: "NLP", trend: "up" },
  { name: "RL-Pilot", stars: 18900, category: "Reinforcement Learning", trend: "up" }
];

const tagDistribution = [
  { tag: "transformer", percentage: 85 },
  { tag: "fine-tuning", percentage: 78 },
  { tag: "diffusion", percentage: 72 },
  { tag: "multilingual", percentage: 68 },
  { tag: "computer-vision", percentage: 65 },
  { tag: "text-to-image", percentage: 61 },
  { tag: "reinforcement-learning", percentage: 58 },
  { tag: "multimodal", percentage: 55 },
  { tag: "speech-synthesis", percentage: 52 },
  { tag: "low-resource", percentage: 48 }
];

const TrendsPage = () => {
  return (
    <MainLayout>
      <div className="container py-6 px-4">
        <div className="flex flex-col gap-1.5 mb-6">
          <h1 className="text-3xl font-bold">AI Trends & Analytics</h1>
          <p className="text-muted-foreground">
            Visualize trends in AI tool development and discover emerging patterns
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <TrendChart
            title="Weekly New Tools by Category"
            description="Number of new tools & models discovered per week by category"
            data={weeklyTrendData}
            categories={trendCategories}
          />
          
          <TrendChart
            title="Source Distribution Over Time"
            description="Weekly distribution of new AI tools by source"
            data={sourceTrendData}
            categories={sourceTrendCategories}
          />
        </div>
        
        <div className="grid gap-6 md:grid-cols-3 mb-6">
          <div className="md:col-span-2">
            <TrendChart
              title="Framework Popularity"
              description="Weekly distribution of frameworks used in new AI tools"
              data={frameworkTrendData}
              categories={frameworkTrendCategories}
            />
          </div>
          
          <div>
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Popular Tags</CardTitle>
                <CardDescription>Most common tags across AI tools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tagDistribution.map((item) => (
                    <div key={item.tag} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{item.tag}</Badge>
                        <span className="text-sm">{item.percentage}%</span>
                      </div>
                      <Progress value={item.percentage} className="h-1.5" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Most Popular Repositories</CardTitle>
            <CardDescription>Top AI repositories by GitHub stars</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="p-3 text-sm font-medium">Repository</th>
                    <th className="p-3 text-sm font-medium">Category</th>
                    <th className="p-3 text-sm font-medium text-right">Stars</th>
                    <th className="p-3 text-sm font-medium">Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {popularRepositories.map((repo) => (
                    <tr key={repo.name} className="hover:bg-secondary/30 transition-colors">
                      <td className="p-3 text-sm font-medium">{repo.name}</td>
                      <td className="p-3 text-sm">
                        <Badge className="bg-secondary/50 hover:bg-secondary">{repo.category}</Badge>
                      </td>
                      <td className="p-3 text-sm text-right">{repo.stars.toLocaleString()}</td>
                      <td className="p-3 text-sm">
                        <Badge variant="outline" className={repo.trend === "up" ? "text-green-500" : "text-gray-500"}>
                          {repo.trend === "up" ? "Rising" : "Stable"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default TrendsPage;
