"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { clearSession } from '@/lib/auth'
import { LogOut } from 'lucide-react'

const Navbar = () => {
  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">DocFlow</h1>
            <nav className="ml-10 flex items-baseline space-x-4">
              <NavLink href="/dashboard">Dashboard</NavLink>
              <NavLink href="/invoice">Invoice</NavLink>
              <NavLink href="/day_off">Day Off</NavLink>
              <NavLink href="/report">Report</NavLink>
            </nav>
          </div>
          <div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={async() => {await clearSession(); window.location.reload();}}
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href}>
    <Button 
      variant="ghost" 
      size="sm"
      className="text-gray-700 hover:text-gray-900 hover:bg-gray-100"
    >
      {children}
    </Button>
  </Link>
)

export default Navbar

