
import { AiToolCard, AiToolProps } from "./AiToolCard";

interface AiToolsGridProps {
  tools: AiToolProps[];
  isLoading?: boolean;
}

export function AiToolsGrid({ tools, isLoading = false }: AiToolsGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div 
            key={index} 
            className="h-[220px] rounded-lg bg-secondary/20 animate-pulse-slow" 
          />
        ))}
      </div>
    );
  }
  
  if (tools.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-muted-foreground text-lg">No AI tools found matching your criteria</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tools.map(tool => (
        <AiToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}
