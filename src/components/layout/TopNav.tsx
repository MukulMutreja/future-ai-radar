
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell, Menu, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function TopNav() {
  return (
    <div className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
      <SidebarTrigger className="lg:hidden">
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle Menu</span>
      </SidebarTrigger>
      
      <div className="w-full flex-1">
        <form className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search AI tools..."
            className="w-full rounded-lg bg-background pl-8 md:w-2/3 lg:w-1/3"
          />
        </form>
      </div>
      
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Avatar>
          <AvatarImage src="" alt="Avatar" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
