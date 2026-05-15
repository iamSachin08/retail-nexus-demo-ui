import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MobileTableColumn {
  key: string
  label: string
  render?: (value: any, row: any) => React.ReactNode
}

interface MobileTableProps {
  data: any[]
  columns: MobileTableColumn[]
  onRowClick?: (row: any) => void
  className?: string
  primaryField?: string
  secondaryField?: string
  statusField?: string
  actionButtons?: (row: any) => React.ReactNode
}

export function MobileTable({ 
  data, 
  columns, 
  onRowClick, 
  className,
  primaryField,
  secondaryField,
  statusField,
  actionButtons
}: MobileTableProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {data.map((row, index) => (
        <Card 
          key={index} 
          className={cn(
            "transition-all duration-200",
            onRowClick && "cursor-pointer hover:shadow-md hover:scale-[1.02]"
          )}
          onClick={() => onRowClick?.(row)}
        >
          <CardContent className="p-4">
            <div className="space-y-3">
              {/* Primary Info Row */}
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  {primaryField && (
                    <div className="font-medium text-foreground truncate">
                      {row[primaryField]}
                    </div>
                  )}
                  {secondaryField && (
                    <div className="text-sm text-muted-foreground mt-1">
                      {row[secondaryField]}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 ml-3">
                  {statusField && row[statusField] && (
                    <Badge 
                      variant={
                        row[statusField]?.toLowerCase().includes('success') || 
                        row[statusField]?.toLowerCase().includes('active') ||
                        row[statusField]?.toLowerCase().includes('completed')
                          ? 'default' 
                          : row[statusField]?.toLowerCase().includes('pending') ||
                            row[statusField]?.toLowerCase().includes('processing')
                          ? 'secondary'
                          : row[statusField]?.toLowerCase().includes('failed') ||
                            row[statusField]?.toLowerCase().includes('cancelled')
                          ? 'destructive'
                          : 'outline'
                      }
                      className="text-xs"
                    >
                      {row[statusField]}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                {columns
                  .filter(col => col.key !== primaryField && col.key !== secondaryField && col.key !== statusField)
                  .slice(0, 4) // Show max 4 additional fields
                  .map((column) => (
                    <div key={column.key} className="space-y-1">
                      <div className="text-xs text-muted-foreground font-medium">
                        {column.label}
                      </div>
                      <div className="text-foreground">
                        {column.render ? column.render(row[column.key], row) : row[column.key]}
                      </div>
                    </div>
                  ))}
              </div>

              {/* Action Buttons */}
              {actionButtons && (
                <div className="flex flex-wrap gap-2 pt-2 border-t">
                  {actionButtons(row)}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}