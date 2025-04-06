
import { AiToolProps } from "@/components/ai-tools/AiToolCard";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface LatestToolsListProps {
  tools: AiToolProps[];
  isLoading?: boolean;
}

export function LatestToolsList({ tools, isLoading = false }: LatestToolsListProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Latest Discoveries</CardTitle>
          <CardDescription>Most recently discovered AI tools & models</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-4 py-4 px-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-12 bg-secondary/20 rounded animate-pulse-slow" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Latest Discoveries</CardTitle>
        <CardDescription>Most recently discovered AI tools & models</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {tools.map((tool) => (
            <div key={tool.id} className="flex items-center justify-between py-3 px-6">
              <div className="flex flex-col">
                <h4 className="text-sm font-medium">{tool.name}</h4>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {tool.description}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-medium bg-secondary px-1.5 py-0.5 rounded-sm">
                    {tool.source}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(tool.dateAdded).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <Link to={tool.url} target="_blank" rel="noreferrer" className="ml-4">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pb-4 pt-2">
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link to="/tools">
            View all tools
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
