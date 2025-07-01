
import { useState } from "react";
import { BarChart3, Settings, Play, Pause, Trash2, Eye, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const installedPlugins = [
  {
    id: "1",
    name: "Customer Support Pro",
    status: "active",
    performance: 94,
    conversations: 1250,
    satisfaction: 4.8,
    description: "Handling customer inquiries and support tickets"
  },
  {
    id: "2",
    name: "Sales Assistant Elite", 
    status: "active",
    performance: 87,
    conversations: 890,
    satisfaction: 4.6,
    description: "Converting visitors into customers"
  },
  {
    id: "3",
    name: "Product Finder AI",
    status: "inactive",
    performance: 91,
    conversations: 650,
    satisfaction: 4.9,
    description: "Helping customers discover products"
  }
];

export default function Dashboard() {
  const [plugins, setPlugins] = useState(installedPlugins);
  const { toast } = useToast();

  const togglePlugin = (id: string) => {
    setPlugins(prev => 
      prev.map(plugin => 
        plugin.id === id 
          ? { ...plugin, status: plugin.status === 'active' ? 'inactive' : 'active' }
          : plugin
      )
    );
    
    const plugin = plugins.find(p => p.id === id);
    toast({
      title: `Plugin ${plugin?.status === 'active' ? 'Deactivated' : 'Activated'}`,
      description: `${plugin?.name} is now ${plugin?.status === 'active' ? 'inactive' : 'active'}.`,
    });
  };

  const removePlugin = (id: string) => {
    const plugin = plugins.find(p => p.id === id);
    setPlugins(prev => prev.filter(p => p.id !== id));
    toast({
      title: "Plugin Removed",
      description: `${plugin?.name} has been removed from your store.`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">My AI Chatbots</h1>
          <p className="text-muted-foreground">
            Manage your installed chatbot plugins and monitor their performance
          </p>
        </div>
        
        <Button className="bg-primary hover:bg-primary/90">
          <Play className="w-4 h-4 mr-2" />
          Train All Bots
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Plugins</CardTitle>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {plugins.filter(p => p.status === 'active').length}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{plugins.filter(p => p.status === 'active').length}</div>
            <p className="text-xs text-muted-foreground">of {plugins.length} total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {plugins.reduce((sum, p) => sum + p.conversations, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(plugins.reduce((sum, p) => sum + p.performance, 0) / plugins.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Excellent performance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
            <span className="text-yellow-500">★</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(plugins.reduce((sum, p) => sum + p.satisfaction, 0) / plugins.length).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">Out of 5.0</p>
          </CardContent>
        </Card>
      </div>

      {/* Plugin List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Installed Plugins</h2>
        
        {plugins.map((plugin) => (
          <Card key={plugin.id} className="transition-all hover:shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{plugin.name}</CardTitle>
                    <CardDescription>{plugin.description}</CardDescription>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge variant={plugin.status === 'active' ? 'default' : 'secondary'}>
                    {plugin.status}
                  </Badge>
                  <Switch
                    checked={plugin.status === 'active'}
                    onCheckedChange={() => togglePlugin(plugin.id)}
                  />
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Performance</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress value={plugin.performance} className="flex-1" />
                    <span className="text-sm font-medium">{plugin.performance}%</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Conversations</p>
                  <p className="text-lg font-semibold">{plugin.conversations.toLocaleString()}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Satisfaction</p>
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-semibold">{plugin.satisfaction}</span>
                    <span className="text-yellow-500">★</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View Logs
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </Button>
                <Button variant="outline" size="sm">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-destructive hover:text-destructive"
                  onClick={() => removePlugin(plugin.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
