import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CustomField {
    id: string
    name: string
    type: 'text' | 'number' | 'date' | 'checkbox' | 'dropdown'
    content: string
    options?: string[]
}

interface PreviewProps {
    title: string
    description: string
    documentNumber: number | null
    customFields: CustomField[]
    theme: 'light' | 'dark'
    accentColor: string
    fontSize: number
    layout: 'single' | 'double'
}

export default function Preview({ title, description, documentNumber, customFields, theme, accentColor, fontSize, layout }: PreviewProps) {
    return (
        <Card className={`${theme === 'dark' ? 'bg-gray-800 text-white' : ''} overflow-auto max-h-[800px]`}>
            <CardHeader>
                <CardTitle>Document Preview</CardTitle>
            </CardHeader>
            <CardContent>
                <div className={`space-y-4 ${layout === 'double' ? 'columns-2' : ''}`} style={{ fontSize: `${fontSize}px` }}>
                    <div>
                        <h2 className="text-2xl font-semibold" style={{ color: accentColor }}>{title || 'Untitled Document'}</h2>
                        <p className="text-sm text-gray-500">
                            Document #{documentNumber !== null ? documentNumber : 'Generating...'}
                        </p>
                    </div>
                    {description && (
                        <div>
                            <h3 className="font-semibold" style={{ color: accentColor }}>Description:</h3>
                            <p>{description}</p>
                        </div>
                    )}
                    {customFields.map((field) => (
                        <div key={field.id}>
                            <h3 className="font-semibold" style={{ color: accentColor }}>{field.name}:</h3>
                            {field.type === 'checkbox' ? (
                                <input type="checkbox" checked={field.content === 'true'} readOnly />
                            ) : field.type === 'dropdown' ? (
                                <select value={field.content}>
                                    {field.options?.map((option) => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            ) : (
                                <p>{field.content || `[${field.type}]`}</p>
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

