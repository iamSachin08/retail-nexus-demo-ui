import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

interface ResponsiveDialogProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

interface ResponsiveDialogContentProps {
  children: React.ReactNode
  className?: string
  title?: string
  description?: string
  footer?: React.ReactNode
}

function ResponsiveDialog({ children, ...props }: ResponsiveDialogProps) {
  const isMobile = useIsMobile()
  
  if (isMobile) {
    return <Drawer {...props}>{children}</Drawer>
  }
  
  return <Dialog {...props}>{children}</Dialog>
}

function ResponsiveDialogTrigger({ children, ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger {...props}>{children}</DialogPrimitive.Trigger>
}

function ResponsiveDialogContent({ 
  children, 
  className, 
  title, 
  description, 
  footer,
  ...props 
}: ResponsiveDialogContentProps & React.ComponentProps<typeof DialogPrimitive.Content>) {
  const isMobile = useIsMobile()
  
  if (isMobile) {
    return (
      <DrawerContent className={cn("max-h-[85vh]", className)} {...props}>
        {(title || description) && (
          <DrawerHeader className="text-left">
            {title && <DrawerTitle>{title}</DrawerTitle>}
            {description && <DrawerDescription>{description}</DrawerDescription>}
          </DrawerHeader>
        )}
        <div className="px-4 overflow-y-auto flex-1">
          {children}
        </div>
        {footer && (
          <DrawerFooter>
            {footer}
          </DrawerFooter>
        )}
      </DrawerContent>
    )
  }
  
  return (
    <DialogContent className={cn("max-w-lg sm:max-w-2xl max-h-[85vh] overflow-y-auto", className)} {...props}>
      {(title || description) && (
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
      )}
      <div className="overflow-y-auto flex-1">
        {children}
      </div>
      {footer && (
        <DialogFooter>
          {footer}
        </DialogFooter>
      )}
    </DialogContent>
  )
}

export {
  ResponsiveDialog,
  ResponsiveDialogTrigger,
  ResponsiveDialogContent,
}