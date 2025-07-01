
import { useState } from "react";
import { Filter, Grid, List, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PluginCard } from "@/components/PluginCard";
import { useToast } from "@/hooks/use-toast";

const plugins = [
  {
    id: "1",
    name: "Customer Support Pro",
    description: "Advanced AI chatbot for customer service with multi-language support and sentiment analysis.",
    rating: 4.8,
    downloads: 15420,
    price: "$29/month",
    tags: ["Customer Support", "AI", "Multi-language"],
    image: "/placeholder.svg"
  },
  {
    id: "2",
    name: "Sales Assistant Elite",
    description: "Boost your sales with intelligent product recommendations and upselling capabilities.",
    rating: 4.7,
    downloads: 8750,
    price: "$39/month",
    tags: ["Sales", "Recommendations", "Upselling"],
    image: "/placeholder.svg"
  },
  {
    id: "3",
    name: "Product Finder AI",
    description: "Help customers find exactly what they're looking for with smart search and filtering.",
    rating: 4.9,
    downloads: 12300,
    price: "Free",
    tags: ["Search", "Product Discovery", "AI"],
    image: "/placeholder.svg"
  },
  {
    id: "4",
    name: "Order Tracker Plus",
    description: "Keep customers informed about their orders with real-time tracking and updates.",
    rating: 4.6,
    downloads: 6850,
    price: "$19/month",
    tags: ["Order Tracking", "Notifications", "Support"],
    image: "/placeholder.svg"
  },
  {
    id: "5",
    name: "Review Collector",
    description: "Automatically collect and manage customer reviews to boost your store's reputation.",
    rating: 4.5,
    downloads: 4200,
    price: "$15/month",
    tags: ["Reviews", "Automation", "Reputation"],
    image: "/placeholder.svg"
  },
  {
    id: "6",
    name: "Personalization Engine",
    description: "Create personalized shopping experiences with AI-driven customer insights.",
    rating: 4.8,
    downloads: 9100,
    price: "$49/month",
    tags: ["Personalization", "AI", "Analytics"],
    image: "/placeholder.svg"
  }
];

export default function Marketplace() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [installedPlugins, setInstalledPlugins] = useState<string[]>([]);
  const { toast } = useToast();

  const handleInstall = (pluginId: string) => {
    setInstalledPlugins(prev => [...prev, pluginId]);
    const plugin = plugins.find(p => p.id === pluginId);
    toast({
      title: "Plugin Installed!",
      description: `${plugin?.name} has been successfully installed to your store.`,
    });
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Chatbot Marketplace</h1>
          <p className="text-muted-foreground">
            Discover and install AI-powered chatbots to enhance your e-commerce experience
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-background">
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-white transition-colors">
          All Categories
        </Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-white transition-colors">
          Customer Support
        </Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-white transition-colors">
          Sales & Marketing
        </Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-white transition-colors">
          Product Discovery
        </Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-white transition-colors">
          Analytics
        </Badge>
        <Button variant="ghost" size="sm" className="ml-2">
          <Filter className="w-4 h-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Plugin Grid */}
      <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
        {plugins.map((plugin) => (
          <PluginCard
            key={plugin.id}
            {...plugin}
            isInstalled={installedPlugins.includes(plugin.id)}
            onInstall={handleInstall}
          />
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center pt-8">
        <Button variant="outline" size="lg">
          Load More Plugins
        </Button>
      </div>
    </div>
  );
}
