
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Bot,
  ShoppingCart,
  MessageSquare,
  Settings,
  BarChart3,
  Zap,
  Heart,
  Search,
  Star,
  Users,
  Package
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Marketplace", url: "/", icon: Package },
  { title: "My Plugins", url: "/dashboard", icon: Bot },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Customization", url: "/customize", icon: Settings },
];

const categoryItems = [
  { title: "Customer Support", url: "/category/support", icon: MessageSquare },
  { title: "Sales Assistant", url: "/category/sales", icon: ShoppingCart },
  { title: "Product Finder", url: "/category/search", icon: Search },
  { title: "Personalization", url: "/category/personal", icon: Heart },
  { title: "Reviews & Rating", url: "/category/reviews", icon: Star },
  { title: "User Engagement", url: "/category/engagement", icon: Users },
  { title: "Automation", url: "/category/automation", icon: Zap },
];

export function AppSidebar() {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible>
      <SidebarContent className="bg-sidebar">
        <div className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-bold text-lg">ShopBot AI</h2>
                <p className="text-xs text-muted-foreground">Plugin Hub</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="w-4 h-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categoryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="w-4 h-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
