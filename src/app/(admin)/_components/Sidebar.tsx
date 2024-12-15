'use client'

import { useState } from 'react'
import { BarChart, Users, FileText, Archive } from 'lucide-react'
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'

type SidebarProps = {
  onSectionChange: (section: string) => void
  activeSection: string
}

export function DashboardSidebar({ onSectionChange, activeSection }: SidebarProps) {
  const menuItems = [
    { icon: BarChart, label: 'Stats', id: 'stats' },
    { icon: Users, label: 'Users', id: 'users' },
    { icon: FileText, label: 'Documents', id: 'documents' },
    { icon: Archive, label: 'Old Documents', id: 'oldDocuments' },
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-xl font-bold px-4 py-2">Admin Dashboard</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onSectionChange(item.id)}
                    className={cn(
                      activeSection === item.id && "bg-sidebar-accent text-sidebar-accent-foreground"
                    )}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

