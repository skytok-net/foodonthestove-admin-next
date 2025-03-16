"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useNavigation } from "@/hooks/use-navigation";
import { cn } from '@/lib/utils';
import { 
  ChevronDown, 
  ChevronRight, 
  Home,
  FileText,
  LayoutDashboard,
  ShoppingCart,
  Beef,
  Users,
  Settings,
  LucideProps
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
  SidebarProvider
} from '@/components/ui/sidebar';

// Define interfaces for navigation items
interface NavigationItemEdge {
  node: NavigationItem;
}

interface NavigationItemsCollection {
  edges: NavigationItemEdge[];
}

interface NavigationItem {
  id: string;
  name: string;
  path: string;
  iconName?: string | null;
  navigationItemsCollection?: NavigationItemsCollection | null;
}

export const NavigationSidebar = () => {
  const { adminNavigation, currentNavigationItem, loading, error, isReady } = useNavigation();
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = React.useState<Record<string, boolean>>({});

  if (loading || !isReady) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Toggle expanded state for items with children
  const toggleExpanded = (item: NavigationItem) => {
    setExpandedItems(prev => ({
      ...prev,
      [item.path]: !prev[item.path]
    }));
  };

  // Recursive function to check if a child item is active
  const checkIfChildIsActive = (children: NavigationItem[], currentPath: string): boolean => {
    if (!children) return false;
    return children.some(child => 
      child.path === currentPath || 
      (child.navigationItemsCollection?.edges && 
       child.navigationItemsCollection.edges.length > 0 && 
       checkIfChildIsActive(child.navigationItemsCollection.edges.map((edge) => edge.node), currentPath))
    );
  };

  // Check if an item is expanded
  const isExpanded = (item: NavigationItem) => {
    // If the item is already in the expanded state, return that
    if (expandedItems[item.path] !== undefined) {
      return expandedItems[item.path];
    }
    
    // Otherwise, auto-expand if a child is active
    if (item.navigationItemsCollection?.edges && item.navigationItemsCollection.edges.length > 0) {
      return checkIfChildIsActive(
        item.navigationItemsCollection.edges.map((edge) => edge.node), 
        pathname || ''
      );
    }
    
    return false;
  };

  // Check if an item is active
  const isActive = (item: NavigationItem) => {
    return item.path === pathname || (currentNavigationItem?.id === item.id);
  };

  // Function to render the appropriate icon based on iconName
  const renderIcon = (iconName?: string | null): React.ReactNode => {
    if (!iconName) return null;
    
    const props = { className: "mr-2 h-4 w-4" } as LucideProps;
    
    switch (iconName) {
      case 'home':
        return <Home {...props} />;
      case 'file-text':
        return <FileText {...props} />;
      case 'layout-dashboard':
        return <LayoutDashboard {...props} />;
      case 'shopping-cart':
        return <ShoppingCart {...props} />;
      case 'beef':
        return <Beef {...props} />;
      case 'users':
        return <Users {...props} />;
      case 'settings':
        return <Settings {...props} />;
      default:
        return null;
    }
  };

  // Render a navigation item
  const renderItem = (item: NavigationItem) => {
    const hasChildren = item.navigationItemsCollection?.edges && item.navigationItemsCollection.edges.length > 0;
    const active = isActive(item);
    const expanded = hasChildren && isExpanded(item);
    
    return (
      <SidebarMenuItem key={item.id}>
        {hasChildren ? (
          <>
            <SidebarMenuButton
              isActive={active}
              onClick={() => toggleExpanded(item)}
              className="w-full justify-between"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  {renderIcon(item.iconName)}
                  <span>{item.name}</span>
                </div>
                {expanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
            </SidebarMenuButton>
            
            {expanded && item.navigationItemsCollection?.edges && (
              <SidebarMenuSub>
                {item.navigationItemsCollection.edges.map((edge) => {
                  const child = edge.node;
                  return (
                    <SidebarMenuSubItem key={child.id}>
                      <Link href={child.path} passHref legacyBehavior>
                        <SidebarMenuSubButton
                          asChild={true}
                          isActive={isActive(child)}
                          className={cn(
                            "pl-9", // Indent child items
                            isActive(child) && "font-medium"
                          )}
                        >
                          {child.name}
                        </SidebarMenuSubButton>
                      </Link>
                    </SidebarMenuSubItem>
                  );
                })}
              </SidebarMenuSub>
            )}
          </>
        ) : (
          <Link href={item.path} passHref legacyBehavior>
            <SidebarMenuButton
              asChild={true}
              isActive={active}
            >
              <div className="flex items-center">
                {renderIcon(item.iconName)}
                <span>{item.name}</span>
              </div>
            </SidebarMenuButton>
          </Link>
        )}
      </SidebarMenuItem>
    );
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar>
        <SidebarHeader className="border-b px-4 py-3">
          <h2 className="text-lg font-semibold">Admin Dashboard</h2>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {adminNavigation.map(renderItem)}
          </SidebarMenu>
        </SidebarContent>
        <SidebarTrigger />
      </Sidebar>
    </SidebarProvider>
  );
};
