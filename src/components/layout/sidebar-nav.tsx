
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Home,
  BookOpenText,
  Cpu,
  BarChart3,
  Lightbulb,
  Brain,
  Tags,
  type LucideIcon,
} from 'lucide-react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';

// Custom Neon Icon Base (wrapper for Lucide or custom SVGs)
const NeonIconWrapper = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("w-5 h-5 neon-glow-accent", className)}>
    {children}
  </div>
);

// Specific icons - using Lucide and wrapping for neon effect
const HomeIcon = (props: {className?: string}) => <NeonIconWrapper {...props}><Home className="w-full h-full" /></NeonIconWrapper>;
const ReflectionIcon = (props: {className?: string}) => <NeonIconWrapper {...props}><BookOpenText className="w-full h-full" /></NeonIconWrapper>;
const SimulationsIcon = (props: {className?: string}) => <NeonIconWrapper {...props}><Cpu className="w-full h-full" /></NeonIconWrapper>;
const ProgressIcon = (props: {className?: string}) => <NeonIconWrapper {...props}><BarChart3 className="w-full h-full" /></NeonIconWrapper>;
const InsightsIcon = (props: {className?: string}) => <NeonIconWrapper {...props}><Lightbulb className="w-full h-full" /></NeonIconWrapper>;
const MeditationIcon = (props: {className?: string}) => <NeonIconWrapper {...props}><Brain className="w-full h-full" /></NeonIconWrapper>;
const CategoriesIcon = (props: {className?: string}) => <NeonIconWrapper {...props}><Tags className="w-full h-full" /></NeonIconWrapper>;


const navItems = [
  { title: 'Dashboard', href: '/', icon: HomeIcon, tooltip: 'Dashboard' },
  { title: 'Daily Reflection', href: '/reflection', icon: ReflectionIcon, tooltip: 'Daily Reflection' },
  { title: 'Simulations', href: '/simulations', icon: SimulationsIcon, tooltip: 'Spending Simulations' },
  { title: 'Progress', href: '/progress', icon: ProgressIcon, tooltip: 'Track Progress' },
  { title: 'AI Insights', href: '/insights', icon: InsightsIcon, tooltip: 'AI Spending Insights' },
  { title: 'Meditation', href: '/meditation', icon: MeditationIcon, tooltip: 'Pre-Purchase Meditation' },
  { title: 'Categories', href: '/categories', icon: CategoriesIcon, tooltip: 'Manage Categories' },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2">
      <SidebarMenu>
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = pathname === item.href;
          return (
            <SidebarMenuItem key={item.title}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  variant="default"
                  className={cn(
                    "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    isActive && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                  )}
                  isActive={isActive}
                  tooltip={{
                    children: item.tooltip,
                    className: "bg-popover text-popover-foreground p-2 rounded-md shadow-lg border border-border",
                    side: "right",
                    align:"center"
                  }}
                >
                  <IconComponent className={cn("mr-3", isActive ? "text-sidebar-primary-foreground" : "text-accent")} />
                  <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </nav>
  );
}
