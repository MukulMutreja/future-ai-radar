
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trending?: 'up' | 'down' | 'neutral';
  trendingValue?: string;
  className?: string;
}

export function StatCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trending,
  trendingValue, 
  className 
}: StatCardProps) {
  const trendingColors = {
    up: 'text-green-500',
    down: 'text-red-500',
    neutral: 'text-muted-foreground'
  };
  
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center mt-1">
          {trending && trendingValue && (
            <span className={`text-xs ${trendingColors[trending]}`}>
              {trendingValue}
            </span>
          )}
          {description && (
            <p className="text-xs text-muted-foreground ml-1">
              {description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
