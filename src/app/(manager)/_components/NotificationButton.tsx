'use client'

import React, { useState, useEffect } from 'react'
import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

type Notification = {
    id: number;
    message: string;
    read: boolean;
}

export function NotificationButton({ managerId }: { managerId: number }) {
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [unreadCount, setUnreadCount] = useState(0)

    useEffect(() => {
        const socket = new WebSocket(`ws://${process.env.NEXT_PUBLIC_API_BASE_URL}/ws/notifications/${managerId}/`)

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data)
            const newNotification: Notification = {
                id: Date.now(),
                message: data.message,
                read: false,
            }
            setNotifications(prev => [newNotification, ...prev])
            setUnreadCount(prev => prev + 1)
        }

        return () => {
            socket.close()
        }
    }, [managerId])

    const markAsRead = (id: number) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ))
        setUnreadCount(prev => Math.max(0, prev - 1))
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {unreadCount}
            </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <h3 className="font-medium leading-none">Notifications</h3>
                    <div className="grid gap-2">
                        {notifications.length === 0 ? (
                            <p className="text-sm text-gray-500">No new notifications</p>
                        ) : (
                            notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`p-2 rounded-md ${
                                        notification.read ? 'bg-gray-100' : 'bg-blue-50'
                                    }`}
                                    onClick={() => markAsRead(notification.id)}
                                >
                                    <p className="text-sm">{notification.message}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
