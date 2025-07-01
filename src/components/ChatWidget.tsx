
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Paperclip, Mic, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  products?: Array<{
    id: string;
    name: string;
    price: string;
    image: string;
  }>;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI shopping assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'd be happy to help you with that! Let me find some great products for you.",
        isBot: true,
        timestamp: new Date(),
        products: [
          {
            id: '1',
            name: 'Premium Wireless Headphones',
            price: '$199.99',
            image: '/placeholder.svg'
          },
          {
            id: '2',
            name: 'Smart Fitness Watch',
            price: '$299.99',
            image: '/placeholder.svg'
          }
        ]
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const quickReplies = ["Show me deals", "Track my order", "Product recommendations", "Customer support"];

  return (
    <>
      {/* Chat Bubble */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg chat-bubble bg-primary hover:bg-primary/90 z-50"
          size="icon"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-background border border-border rounded-2xl shadow-2xl z-50 flex flex-col slide-up">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-primary/5 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/bot-avatar.jpg" />
                <AvatarFallback className="bg-primary text-white">AI</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm">ShopBot Assistant</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] ${message.isBot ? 'bg-muted' : 'bg-primary text-white'} rounded-2xl px-4 py-2`}>
                  <p className="text-sm">{message.text}</p>
                  
                  {message.products && (
                    <div className="mt-3 space-y-2">
                      {message.products.map((product) => (
                        <Card key={product.id} className="p-3 bg-background">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-muted rounded-lg"></div>
                            <div className="flex-1">
                              <p className="font-medium text-sm text-foreground">{product.name}</p>
                              <p className="text-primary font-semibold">{product.price}</p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="px-4 pb-2">
            <div className="flex flex-wrap gap-1">
              {quickReplies.map((reply) => (
                <Button
                  key={reply}
                  variant="outline"
                  size="sm"
                  className="text-xs h-7"
                  onClick={() => setInputValue(reply)}
                >
                  {reply}
                </Button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  className="pr-20"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Paperclip className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Smile className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <Button onClick={handleSend} size="icon" className="h-10 w-10">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
