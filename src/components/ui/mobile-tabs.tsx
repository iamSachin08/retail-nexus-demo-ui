import * as React from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface MobileTabsProps {
  tabs: Array<{ value: string; label: string; icon?: React.ReactNode }>
  activeTab: string
  onTabChange: (value: string) => void
  className?: string
}

export function MobileTabs({ tabs, activeTab, onTabChange, className }: MobileTabsProps) {
  return (
    <ScrollArea className={cn("w-full whitespace-nowrap", className)}>
      <div className="flex w-max space-x-2 p-1 bg-muted/50 rounded-lg">
        {tabs.map((tab) => (
          <Button
            key={tab.value}
            variant={activeTab === tab.value ? "default" : "ghost"}
            size="sm"
            onClick={() => onTabChange(tab.value)}
            className="flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            {tab.icon}
            <span className="text-xs">{tab.label}</span>
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}