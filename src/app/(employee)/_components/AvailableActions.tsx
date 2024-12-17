"use client"

import {FileText, Calendar, BarChart} from 'lucide-react'

export default function AvailableActions() {
    const actions = [
        {name: 'Create Invoice', icon: FileText, path: '/invoice'},
        {name: 'Create Day Off Request', icon: Calendar, path: '/day_off'},
        {name: 'Create Report', icon: BarChart, path: '/report'},
    ]

    return (
        <div className="flex flex-wrap gap-4">
            {actions.map((action, index) => (
                <button
                    key={index}
                    onClick={() => window.location.href = action.path}
                    className="flex items-center justify-center px-4 py-2 bg-[#0E708B] text-white rounded-md hover:bg-[#0E708B]/80 transition-colors duration-300"
                >
                    <action.icon className="w-5 h-5 mr-2"/>
                    {action.name}
                </button>
            ))}
        </div>
    )
}

