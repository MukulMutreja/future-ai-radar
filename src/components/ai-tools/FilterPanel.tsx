
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
import { 
  ChevronDown, 
  Clock, 
  Filter, 
  RefreshCw, 
  SortAsc, 
  SortDesc, 
  TrendingUp, 
  Flame
} from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface FilterPanelProps {
  onApplyFilters: (filters: any) => void;
  onReset: () => void;
}

export function FilterPanel({ onApplyFilters, onReset }: FilterPanelProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>("newest");
  
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

  const sortOptions = [
    { id: "newest", label: "Newest First", icon: Clock },
    { id: "popular", label: "Most Popular", icon: TrendingUp },
    { id: "mostPopular", label: "Trending Now", icon: Flame },
    { id: "alphabetical", label: "A-Z", icon: SortAsc }
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
      sources: selectedSources,
      sort: sortOption
    });
  };
  
  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedSources([]);
    setSortOption("newest");
    onReset();
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };
  
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
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
                    <span>
                      {sortOptions.find(option => option.id === sortOption)?.label || "Newest First"}
                    </span>
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {sortOptions.map(option => (
                    <DropdownMenuItem 
                      key={option.id}
                      onClick={() => handleSortChange(option.id)}
                      className="cursor-pointer"
                    >
                      <option.icon className="mr-2 h-4 w-4" />
                      <span>{option.label}</span>
                    </DropdownMenuItem>
                  ))}
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
      </CardContent>
    </Card>
  );
}
