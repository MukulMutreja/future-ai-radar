
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown, Clock, Filter, RefreshCw, SortAsc, SortDesc } from "lucide-react";
import { useState } from "react";

interface FilterPanelProps {
  onApplyFilters: (filters: any) => void;
  onReset: () => void;
}

export function FilterPanel({ onApplyFilters, onReset }: FilterPanelProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  
  const categories = [
    "NLP", 
    "Computer Vision", 
    "Multi-modal", 
    "Generative AI", 
    "Reinforcement Learning"
  ];
  
  const sources = [
    "GitHub", 
    "Hugging Face", 
    "ArXiv", 
    "News"
  ];
  
  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };
  
  const handleSourceChange = (source: string, checked: boolean) => {
    if (checked) {
      setSelectedSources([...selectedSources, source]);
    } else {
      setSelectedSources(selectedSources.filter(s => s !== source));
    }
  };
  
  const handleApplyFilters = () => {
    onApplyFilters({
      categories: selectedCategories,
      sources: selectedSources
    });
  };
  
  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedSources([]);
    onReset();
  };
  
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-card rounded-lg border mb-6">
      <div className="flex-1 space-y-4">
        <div>
          <Label htmlFor="search" className="text-sm font-medium">Search</Label>
          <Input
            id="search"
            placeholder="Search by name, author, or tag..."
            className="mt-1"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium">Categories</Label>
            <div className="mt-2 space-y-2">
              {categories.map(category => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${category}`} 
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) => 
                      handleCategoryChange(category, checked as boolean)
                    }
                  />
                  <Label htmlFor={`category-${category}`} className="text-sm cursor-pointer">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <Label className="text-sm font-medium">Sources</Label>
            <div className="mt-2 space-y-2">
              {sources.map(source => (
                <div key={source} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`source-${source}`} 
                    checked={selectedSources.includes(source)}
                    onCheckedChange={(checked) => 
                      handleSourceChange(source, checked as boolean)
                    }
                  />
                  <Label htmlFor={`source-${source}`} className="text-sm cursor-pointer">
                    {source}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:border-l md:pl-4 space-y-4 min-w-[200px]">
        <div>
          <Label className="text-sm font-medium">Sort By</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="mt-1 w-full justify-between">
                <span>Newest First</span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Clock className="mr-2 h-4 w-4" />
                <span>Newest First</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SortDesc className="mr-2 h-4 w-4" />
                <span>Most Popular</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SortAsc className="mr-2 h-4 w-4" />
                <span>A-Z</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div>
          <Label className="text-sm font-medium">Date Added</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="mt-1 w-full justify-between">
                <span>All Time</span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Last 24 Hours</DropdownMenuItem>
              <DropdownMenuItem>Last 7 Days</DropdownMenuItem>
              <DropdownMenuItem>Last 30 Days</DropdownMenuItem>
              <DropdownMenuItem>This Year</DropdownMenuItem>
              <DropdownMenuItem>All Time</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex flex-col gap-2 pt-2 mt-auto">
          <Button onClick={handleApplyFilters} className="w-full">
            <Filter className="mr-2 h-4 w-4" />
            Apply Filters
          </Button>
          <Button variant="outline" onClick={handleReset} className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
