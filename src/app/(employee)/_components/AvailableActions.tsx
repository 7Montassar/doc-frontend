import { FileText, Calendar, BarChart } from 'lucide-react'

export default function AvailableActions() {
  const actions = [
    { name: 'Create Invoice', icon: FileText },
    { name: 'Create Day Off Request', icon: Calendar },
    { name: 'Create Report', icon: BarChart },
  ]

  return (
    <div className="flex flex-wrap gap-4">
      {actions.map((action, index) => (
        <button
          key={index}
          className="flex items-center justify-center px-4 py-2 bg-[#0E708B] text-white rounded-md hover:bg-[#0E708B]/80 transition-colors duration-300"
        >
          <action.icon className="w-5 h-5 mr-2" />
          {action.name}
        </button>
      ))}
    </div>
  )
}

