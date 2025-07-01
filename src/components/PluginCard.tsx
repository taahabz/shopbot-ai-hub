
import { useState } from "react";
import { Star, Download, ExternalLink, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface PluginCardProps {
  id: string;
  name: string;
  description: string;
  rating: number;
  downloads: number;
  price: string;
  tags: string[];
  image: string;
  isInstalled?: boolean;
  onInstall?: (id: string) => void;
}

export function PluginCard({ 
  id, 
  name, 
  description, 
  rating, 
  downloads, 
  price, 
  tags, 
  image, 
  isInstalled = false,
  onInstall 
}: PluginCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInstall = () => {
    onInstall?.(id);
    setIsModalOpen(false);
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 bg-card border border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-3">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{rating}</span>
          </div>
        </div>
        <CardTitle className="text-lg">{name}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Download className="w-4 h-4" />
            <span>{downloads.toLocaleString()}</span>
          </div>
          <span className="font-semibold text-foreground">{price}</span>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex gap-2 w-full">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1">
                <ExternalLink className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-background">
              <DialogHeader>
                <DialogTitle>{name}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Plugin Preview Demo</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{rating} rating</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      <span>{downloads.toLocaleString()} installs</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleInstall} disabled={isInstalled}>
                      {isInstalled ? 'Installed' : `Install ${price}`}
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button 
            size="sm" 
            className="flex-1" 
            onClick={handleInstall}
            disabled={isInstalled}
          >
            {isInstalled ? 'Installed' : 'Install'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
