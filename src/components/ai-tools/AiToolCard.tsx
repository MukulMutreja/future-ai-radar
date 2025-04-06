
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowUpRight, Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";

export interface AiToolProps {
  id: string;
  name: string;
  description: string;
  source: 'github' | 'huggingface' | 'arxiv' | 'news';
  category: string;
  url: string;
  stars?: number;
  downloads?: number;
  citations?: number;
  dateAdded: string;
  author: string;
  tags: string[];
}

export function AiToolCard({ tool }: { tool: AiToolProps }) {
  const sourceIcons = {
    github: '/github-logo.svg',
    huggingface: '/huggingface-logo.svg',
    arxiv: '/arxiv-logo.svg',
    news: '/news-icon.svg'
  };

  const categoryColors = {
    'NLP': 'bg-blue-500',
    'Computer Vision': 'bg-green-500',
    'Multi-modal': 'bg-purple-500',
    'Generative AI': 'bg-orange-500',
    'Reinforcement Learning': 'bg-red-500',
    'Other': 'bg-gray-500'
  };

  const categoryColor = categoryColors[tool.category as keyof typeof categoryColors] || 'bg-gray-500';
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md hover:shadow-fetchai-primary/10 hover:border-fetchai-primary/30 animate-fade-in">
      <CardHeader className="p-4 pb-0 flex justify-between">
        <div className="flex justify-between w-full">
          <div className="flex items-start gap-2">
            <div className="rounded-md p-1">
              {/* We'd use actual logos in production */}
              <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center">
                {tool.source.charAt(0).toUpperCase()}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold">{tool.name}</h3>
              <p className="text-sm text-muted-foreground">{tool.author}</p>
            </div>
          </div>
          
          <Badge className={`${categoryColor} hover:${categoryColor}`}>{tool.category}</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {tool.description}
        </p>
        
        <div className="mt-3 flex flex-wrap gap-1">
          {tool.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs font-normal">
              {tag}
            </Badge>
          ))}
          {tool.tags.length > 3 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="text-xs font-normal">
                    +{tool.tags.length - 3}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="flex flex-col gap-1">
                    {tool.tags.slice(3).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex gap-3 text-sm text-muted-foreground">
          {tool.stars !== undefined && (
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5" />
              <span>{tool.stars}</span>
            </div>
          )}
          {tool.downloads !== undefined && (
            <div>
              <span>{tool.downloads} downloads</span>
            </div>
          )}
          {tool.citations !== undefined && (
            <div>
              <span>{tool.citations} citations</span>
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Heart className="h-4 w-4" />
          </Button>
          <Link to={tool.url} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}

// This button component is used in the AiToolCard
function Button({ 
  variant = 'default', 
  size = 'default', 
  className, 
  children, 
  ...props 
}: { 
  variant?: 'default' | 'outline' | 'ghost', 
  size?: 'default' | 'icon', 
  className?: string, 
  children: React.ReactNode 
  [x: string]: any 
}) {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50";
  
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground"
  };
  
  const sizeClasses = {
    default: "h-9 px-4 py-2",
    icon: "h-9 w-9"
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className || ''}`;
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
