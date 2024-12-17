import { FileText, Calendar, BarChart, Plus } from 'lucide-react'
import Link from 'next/link'

export default function AvailableActions() {
    const actions = [
        { name: 'Create Invoice', icon: FileText, href: '/create-invoice' },
        { name: 'Create Day Off Request', icon: Calendar, href: '/create-day-off' },
        { name: 'Create Report', icon: BarChart, href: '/create-report' },
        { name: 'Create Other Document', icon: Plus, href: '/create-other' },
    ]

    return (
        <div className="flex flex-wrap gap-4">
            {actions.map((action, index) => (
                <Link
                    key={index}
                    href={action.href}
                    className="flex items-center justify-center px-4 py-2 bg-[#0E708B] text-white rounded-md hover:bg-[#0E708B]/80 transition-colors duration-300"
                >
                    <action.icon className="w-5 h-5 mr-2" />
                    {action.name}
                </Link>
            ))}
        </div>
    )
}

