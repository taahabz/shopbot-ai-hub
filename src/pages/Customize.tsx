
import { useState } from "react";
import { Plus, Save, Play, Zap, MessageSquare, Settings, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const workflowSteps = [
  { id: '1', type: 'trigger', title: 'Customer Message', description: 'When a customer sends a message' },
  { id: '2', type: 'condition', title: 'Intent Detection', description: 'Analyze message intent' },
  { id: '3', type: 'action', title: 'Generate Response', description: 'AI generates appropriate response' },
  { id: '4', type: 'action', title: 'Send Reply', description: 'Send message to customer' }
];

export default function Customize() {
  const [botName, setBotName] = useState("ShopBot Assistant");
  const [welcomeMessage, setWelcomeMessage] = useState("Hi! I'm your AI shopping assistant. How can I help you today?");
  const [personalityMode, setPersonalityMode] = useState("friendly");
  const [enabledFeatures, setEnabledFeatures] = useState({
    productRecommendations: true,
    orderTracking: true,
    customerSupport: true,
    reviewCollection: false,
    multilingual: false
  });
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your chatbot configuration has been updated successfully.",
    });
  };

  const toggleFeature = (feature: keyof typeof enabledFeatures) => {
    setEnabledFeatures(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }));
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Chatbot Customization</h1>
          <p className="text-muted-foreground">
            Configure your AI chatbot's behavior, responses, and workflows
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Play className="w-4 h-4 mr-2" />
            Test Bot
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Basic Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Basic Configuration
            </CardTitle>
            <CardDescription>
              Configure your chatbot's identity and basic behavior
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="bot-name">Bot Name</Label>
              <Input
                id="bot-name"
                value={botName}
                onChange={(e) => setBotName(e.target.value)}
                placeholder="Enter bot name"
              />
            </div>
            
            <div>
              <Label htmlFor="welcome-message">Welcome Message</Label>
              <Textarea
                id="welcome-message"
                value={welcomeMessage}
                onChange={(e) => setWelcomeMessage(e.target.value)}
                placeholder="Enter welcome message"
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="personality">Personality Mode</Label>
              <Select value={personalityMode} onValueChange={setPersonalityMode}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Features Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Features & Capabilities
            </CardTitle>
            <CardDescription>
              Enable or disable specific chatbot features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(enabledFeatures).map(([key, enabled]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <Label className="capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {key === 'productRecommendations' && 'Suggest products based on customer preferences'}
                    {key === 'orderTracking' && 'Track and update customers on order status'}
                    {key === 'customerSupport' && 'Handle customer service inquiries'}
                    {key === 'reviewCollection' && 'Collect customer reviews and feedback'}
                    {key === 'multilingual' && 'Support multiple languages'}
                  </p>
                </div>
                <Switch
                  checked={enabled}
                  onCheckedChange={() => toggleFeature(key as keyof typeof enabledFeatures)}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Workflow Builder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Conversation Workflow
          </CardTitle>
          <CardDescription>
            Customize how your chatbot handles different conversation scenarios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workflowSteps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                  step.type === 'trigger' ? 'bg-green-500' :
                  step.type === 'condition' ? 'bg-yellow-500' : 'bg-blue-500'
                }`}>
                  {index + 1}
                </div>
                
                <Card className="flex-1">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{step.title}</h4>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {step.type}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
                
                {index < workflowSteps.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
            ))}
            
            <Button variant="outline" className="w-full mt-4">
              <Plus className="w-4 h-4 mr-2" />
              Add Workflow Step
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Response Templates</CardTitle>
          <CardDescription>
            Set up common responses for frequently asked questions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Greeting Response</Label>
              <Input placeholder="Hello! How can I help you today?" className="mt-1" />
            </div>
            <div>
              <Label>Product Not Found</Label>
              <Input placeholder="I couldn't find that product. Let me help you search..." className="mt-1" />
            </div>
            <div>
              <Label>Order Status Inquiry</Label>
              <Input placeholder="Let me check your order status for you..." className="mt-1" />
            </div>
            <div>
              <Label>Fallback Response</Label>
              <Input placeholder="I'm not sure about that. Let me connect you with a human agent." className="mt-1" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
