
import { AiToolProps } from "@/components/ai-tools/AiToolCard";
import { AiToolsGrid } from "@/components/ai-tools/AiToolsGrid";
import { FilterPanel } from "@/components/ai-tools/FilterPanel";
import { MainLayout } from "@/components/layout/MainLayout";
import { useState } from "react";

// Mock tools data - in a real app, this would be fetched from an API
const mockTools: AiToolProps[] = [
  {
    id: "1",
    name: "LLaMA-3-8B",
    description: "Open foundation language model with improved multilingual capabilities and instruction following. Fine-tunable for various NLP tasks.",
    source: "github",
    category: "NLP",
    url: "https://github.com/facebookresearch/llama",
    stars: 12450,
    dateAdded: "2025-04-05T10:30:00Z",
    author: "Meta AI Research",
    tags: ["language-model", "open-source", "transformer", "fine-tuning", "multilingual"]
  },
  {
    id: "2",
    name: "DALL-E 3 Mini",
    description: "Lightweight version of DALL-E 3 for image generation from text prompts, optimized for mobile devices and edge deployment.",
    source: "huggingface",
    category: "Generative AI",
    url: "https://huggingface.co/openai/dall-e-3-mini",
    downloads: 45310,
    dateAdded: "2025-04-04T14:22:00Z",
    author: "OpenAI",
    tags: ["image-generation", "text-to-image", "diffusion", "mobile", "edge-computing"]
  },
  {
    id: "3",
    name: "SwiftFusion",
    description: "Real-time multimodal fusion model for AR/VR applications with optimized performance on Apple Silicon.",
    source: "github",
    category: "Multi-modal",
    url: "https://github.com/apple/swift-fusion",
    stars: 5324,
    dateAdded: "2025-04-03T09:15:00Z",
    author: "Apple ML",
    tags: ["ar-vr", "multimodal", "real-time", "apple-silicon", "swift"]
  },
  {
    id: "4",
    name: "EfficientDet-X",
    description: "Next-generation object detection model with state-of-the-art efficiency for resource-constrained environments.",
    source: "arxiv",
    category: "Computer Vision",
    url: "https://arxiv.org/abs/2501.12345",
    citations: 87,
    dateAdded: "2025-04-02T16:40:00Z",
    author: "Google Research",
    tags: ["object-detection", "efficient", "computer-vision", "lightweight", "edge-computing"]
  },
  {
    id: "5",
    name: "RL-Pilot",
    description: "Reinforcement learning framework for autonomous drone navigation in complex environments with obstacle avoidance.",
    source: "github",
    category: "Reinforcement Learning",
    url: "https://github.com/stanfordailab/rl-pilot",
    stars: 3256,
    dateAdded: "2025-04-01T11:50:00Z",
    author: "Stanford AI Lab",
    tags: ["reinforcement-learning", "autonomous", "robotics", "drones", "navigation"]
  },
  {
    id: "6",
    name: "VersaTune",
    description: "Framework for efficient transfer learning and fine-tuning of large language models with minimal computational resources.",
    source: "github",
    category: "NLP",
    url: "https://github.com/ai-lab/versatune",
    stars: 2876,
    dateAdded: "2025-03-29T08:20:00Z",
    author: "Berkeley AI Lab",
    tags: ["fine-tuning", "transfer-learning", "efficiency", "llm", "low-resource"]
  },
  {
    id: "7",
    name: "Neural3D",
    description: "Neural radiance field (NeRF) implementation for 3D scene reconstruction from sparse image sets with improved quality.",
    source: "huggingface",
    category: "Computer Vision",
    url: "https://huggingface.co/spaces/neural-labs/neural3d",
    downloads: 18730,
    dateAdded: "2025-03-27T13:45:00Z",
    author: "Neural Labs",
    tags: ["nerf", "3d-reconstruction", "computer-vision", "neural-rendering", "sparse-views"]
  },
  {
    id: "8",
    name: "BioGPT-Med",
    description: "Specialized language model for biomedical text analysis, literature review, and medical report generation with enhanced accuracy.",
    source: "github",
    category: "NLP",
    url: "https://github.com/bio-institute/biogpt-med",
    stars: 4120,
    dateAdded: "2025-03-25T09:10:00Z",
    author: "Biomedical Institute",
    tags: ["healthcare", "biomedical", "language-model", "medical", "report-generation"]
  },
  {
    id: "9",
    name: "AudioGen Pro",
    description: "Advanced audio generation model for creating realistic sound effects, music, and voice synthesis with precise control.",
    source: "huggingface",
    category: "Generative AI",
    url: "https://huggingface.co/audio-research/audiogen-pro",
    downloads: 32150,
    dateAdded: "2025-03-23T16:30:00Z",
    author: "Audio Research Lab",
    tags: ["audio-generation", "speech-synthesis", "music-generation", "sound-effects", "generative-audio"]
  }
];

const AiToolsPage = () => {
  const [filteredTools, setFilteredTools] = useState<AiToolProps[]>(mockTools);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleApplyFilters = (filters: any) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let filtered = [...mockTools];
      
      if (filters.categories && filters.categories.length > 0) {
        filtered = filtered.filter(tool => 
          filters.categories.includes(tool.category)
        );
      }
      
      if (filters.sources && filters.sources.length > 0) {
        filtered = filtered.filter(tool => 
          filters.sources.includes(tool.source.charAt(0).toUpperCase() + tool.source.slice(1))
        );
      }
      
      // Apply sorting
      if (filters.sort) {
        switch (filters.sort) {
          case 'newest':
            filtered.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
            break;
          case 'popular':
            filtered.sort((a, b) => {
              const aPopularity = a.stars || a.downloads || a.citations || 0;
              const bPopularity = b.stars || b.downloads || b.citations || 0;
              return bPopularity - aPopularity;
            });
            break;
          case 'mostPopular':
            // Trending items - for demo purposes, we'll combine recency and popularity
            filtered.sort((a, b) => {
              // Calculate a trending score based on popularity and recency
              const aDate = new Date(a.dateAdded).getTime();
              const bDate = new Date(b.dateAdded).getTime();
              const aPopularity = a.stars || a.downloads || a.citations || 0;
              const bPopularity = b.stars || b.downloads || b.citations || 0;
              
              // Trending score formula: popularity * recency factor
              const aScore = aPopularity * (aDate / (Date.now() - 30 * 24 * 60 * 60 * 1000));
              const bScore = bPopularity * (bDate / (Date.now() - 30 * 24 * 60 * 60 * 1000));
              
              return bScore - aScore;
            });
            break;
          case 'alphabetical':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        }
      }
      
      setFilteredTools(filtered);
      setIsLoading(false);
    }, 500);
  };
  
  const handleResetFilters = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setFilteredTools(mockTools);
      setIsLoading(false);
    }, 500);
  };
  
  return (
    <MainLayout>
      <div className="container py-6 px-4">
        <div className="flex flex-col gap-1.5 mb-6">
          <h1 className="text-3xl font-bold">AI Tools & Models</h1>
          <p className="text-muted-foreground">
            Explore our database of AI tools and models from various sources
          </p>
        </div>
        
        <FilterPanel 
          onApplyFilters={handleApplyFilters}
          onReset={handleResetFilters}
        />
        
        <AiToolsGrid tools={filteredTools} isLoading={isLoading} />
      </div>
    </MainLayout>
  );
};

export default AiToolsPage;
