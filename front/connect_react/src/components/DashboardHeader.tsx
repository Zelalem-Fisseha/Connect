import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { UserMenu } from "./UserMenu";

interface DashboardHeaderProps {
  title: string;
  description: string;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  searchValue?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showSearch?: boolean;
  rightContent?: React.ReactNode;
}

export function DashboardHeader({
  title,
  description,
  searchPlaceholder = "Search...",
  onSearch,
  searchValue = "",
  onSearchChange,
  showSearch = true,
  rightContent,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:items-center md:justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      
      <div className="flex items-center space-x-2
        ">
        {showSearch && (
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={searchPlaceholder}
              className="w-full bg-background pl-8"
              value={searchValue}
              onChange={onSearchChange}
            />
          </div>
        )}
        
        {rightContent}
        
        <div className="ml-2">
          <UserMenu />
        </div>
      </div>
    </div>
  );
}
