import { File } from 'lucide-react'

export const DocumentBackground = () => {
    return (
        <div className="fixed inset-0 z-0 opacity-5">
            <div className="absolute inset-0 grid grid-cols-6 gap-4 p-4">
                {Array.from({ length: 60 }).map((_, i) => (
                    <File key={i} className="w-8 h-8 text-gray-400 transform rotate-45" />
                ))}
            </div>
        </div>
    )
}

