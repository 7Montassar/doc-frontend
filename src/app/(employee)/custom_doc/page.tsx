'use client'

import { useState, useId, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { Plus, Trash2, Move } from 'lucide-react'
import Preview from '../_components/doc-preview'
import ColorPicker from '../_components/color-picker'
import SubmittedCustomDocument from "@/app/(employee)/_components/submitted-custom-doc"

interface CustomField {
    id: string
    name: string
    type: 'text' | 'number' | 'date' | 'checkbox' | 'dropdown'
    content: string
    options?: string[] // For dropdown fields
}

export default function CustomDocumentForm() {
    const documentId = useId()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [documentNumber, setDocumentNumber] = useState<number | null>(null)
    const [customFields, setCustomFields] = useState<CustomField[]>([])
    const [theme, setTheme] = useState<'light' | 'dark'>('light')
    const [accentColor, setAccentColor] = useState('#0E708B')
    const [fontSize, setFontSize] = useState(16)
    const [layout, setLayout] = useState<'single' | 'double'>('single')
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        setDocumentNumber(Math.floor(Math.random() * 1000000))
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
    }

    const addCustomField = () => {
        const newField: CustomField = {
            id: `field-${Date.now()}`,
            name: '',
            type: 'text',
            content: '',
        }
        setCustomFields([...customFields, newField])
    }

    const updateCustomField = (id: string, field: Partial<CustomField>) => {
        setCustomFields(customFields.map(f => f.id === id ? { ...f, ...field } : f))
    }

    const removeCustomField = (id: string) => {
        setCustomFields(customFields.filter(f => f.id !== id))
    }

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return

        const items = Array.from(customFields)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)

        setCustomFields(items)
    }

    if (submitted) {
        return <SubmittedCustomDocument
            title={title}
            description={description}
            documentNumber={documentNumber ?? 0}
            customFields={customFields}
            theme={theme}
            accentColor={accentColor}
            fontSize={fontSize}
            layout={layout}
        />
    }

    return (
        <div className={`container mx-auto p-4 ${theme === 'dark' ? 'dark bg-gray-900 text-white' : ''}`}>
            <h1 className="text-3xl font-bold text-center mb-8" style={{ color: accentColor }}>Advanced Document Creator</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className={theme === 'dark' ? 'bg-gray-800 text-white' : ''}>
                    <CardHeader>
                        <CardTitle>Document Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="title">Document Title</Label>
                                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={4}
                                />
                            </div>
                            <div>
                                <Label>Custom Fields</Label>
                                <DragDropContext onDragEnd={onDragEnd}>
                                    <Droppable droppableId={`fields-${documentId}`}>
                                        {(provided) => (
                                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                                {customFields.map((field, index) => (
                                                    <Draggable key={field.id} draggableId={field.id} index={index}>
                                                        {(provided) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                className="flex flex-col space-y-2 mt-2 p-2 border rounded"
                                                            >
                                                                <div className="flex items-center space-x-2">
                                                                    <div {...provided.dragHandleProps}>
                                                                        <Move className="h-4 w-4" />
                                                                    </div>
                                                                    <Input
                                                                        placeholder="Field name"
                                                                        value={field.name}
                                                                        onChange={(e) => updateCustomField(field.id, { name: e.target.value })}
                                                                    />
                                                                    <Select
                                                                        value={field.type}
                                                                        onValueChange={(value) => updateCustomField(field.id, { type: value as CustomField['type'] })}
                                                                    >
                                                                        <SelectTrigger className="w-[120px]">
                                                                            <SelectValue placeholder="Type" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="text">Text</SelectItem>
                                                                            <SelectItem value="number">Number</SelectItem>
                                                                            <SelectItem value="date">Date</SelectItem>
                                                                            <SelectItem value="checkbox">Checkbox</SelectItem>
                                                                            <SelectItem value="dropdown">Dropdown</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        onClick={() => removeCustomField(field.id)}
                                                                    >
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                                {field.type === 'dropdown' ? (
                                                                    <Input
                                                                        placeholder="Options (comma-separated)"
                                                                        value={field.options?.join(', ') || ''}
                                                                        onChange={(e) => updateCustomField(field.id, { options: e.target.value.split(',').map(s => s.trim()) })}
                                                                    />
                                                                ) : (
                                                                    <Input
                                                                        placeholder={`Enter ${field.type} content`}
                                                                        value={field.content}
                                                                        onChange={(e) => updateCustomField(field.id, { content: e.target.value })}
                                                                        type={field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : 'text'}
                                                                    />
                                                                )}
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                                <Button type="button" onClick={addCustomField} className="mt-2">
                                    <Plus className="mr-2 h-4 w-4" /> Add Field
                                </Button>
                            </div>
                            <div className="space-y-4">
                                <Label>Design Options</Label>
                                <div className="flex items-center space-x-2">
                                    <Label htmlFor="theme">Dark Mode</Label>
                                    <Switch
                                        id="theme"
                                        checked={theme === 'dark'}
                                        onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="accentColor">Accent Color</Label>
                                    <ColorPicker color={accentColor} onChange={setAccentColor} />
                                </div>
                                <div>
                                    <Label htmlFor="fontSize">Font Size</Label>
                                    <Slider
                                        id="fontSize"
                                        min={12}
                                        max={24}
                                        step={1}
                                        value={[fontSize]}
                                        onValueChange={(value) => setFontSize(value[0])}
                                    />
                                    <span>{fontSize}px</span>
                                </div>
                                <div>
                                    <Label htmlFor="layout">Layout</Label>
                                    <Select value={layout} onValueChange={(value) => setLayout(value as 'single' | 'double')}>
                                        <SelectTrigger id="layout">
                                            <SelectValue placeholder="Select layout" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="single">Single Column</SelectItem>
                                            <SelectItem value="double">Double Column</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <Button type="submit" className="w-full" style={{ backgroundColor: accentColor }}>Create Document</Button>
                        </form>
                    </CardContent>
                </Card>
                <Preview
                    title={title}
                    description={description}
                    documentNumber={documentNumber ?? 0}
                    customFields={customFields}
                    theme={theme}
                    accentColor={accentColor}
                    fontSize={fontSize}
                    layout={layout}
                />
            </div>
        </div>
    )
}

