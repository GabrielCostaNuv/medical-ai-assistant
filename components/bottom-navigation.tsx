"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TrendingUp, Calendar, Users, FileText, Brain } from "lucide-react"

const navigationItems = [
  {
    href: "/dashboard", // Updated dashboard route
    icon: TrendingUp,
    label: "Dashboard",
  },
  {
    href: "/agenda",
    icon: Calendar,
    label: "Agenda",
  },
  {
    href: "/pacientes",
    icon: Users,
    label: "Pacientes",
  },
  {
    href: "/relatorios",
    icon: FileText,
    label: "Relatórios",
  },
  {
    href: "/assistente",
    icon: Brain,
    label: "IA",
  },
]

export function BottomNavigation() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      // Updated dashboard route check
      return pathname === "/dashboard"
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border md:hidden z-50">
      <div className="flex items-center justify-around py-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)

          return (
            <Link key={item.href} href={item.href} className="flex-1">
              <Button
                variant="ghost"
                size="sm"
                className={`flex-col gap-1 h-auto py-2 w-full ${active ? "text-primary" : "text-muted-foreground"}`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-xs">{item.label}</span>
              </Button>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
