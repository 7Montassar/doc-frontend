'use client'

import { useState } from 'react'
import { BarChart, Users, FileText, Archive, LogOut } from 'lucide-react'
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
  SidebarFooter,
} from '@/components/ui/sidebar'
import { Button } from './ui/button'
import { clearSession } from '@/lib/auth'

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
      <SidebarFooter
        className="flex items-center justify-center gap-2 text-sm text-gray-500"
      >
        <Button 
              variant="ghost" 
              size="sm" 
              onClick={async() => {await clearSession(); window.location.reload();}}
              className="mb-8 w-full text-white bg-[#0E708B] hover:bg-[#0c5f75] hover:text-gray-900 hover:bg-gray-100"
            >
              <LogOut className=" mr-2 h-4 w-4" />
              Logout
            </Button>
      </SidebarFooter>
    </Sidebar>
  )
}

