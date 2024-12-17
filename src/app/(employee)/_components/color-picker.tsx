'use client'

import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

interface ColorPickerProps {
    color: string
    onChange: (color: string) => void
}

export default function ColorPicker({ color, onChange }: ColorPickerProps) {
    const [isOpen, setIsOpen] = useState(false)

    const presetColors = [
        '#0E708B', '#FF6B6B', '#4ECDC4', '#45B7D1',
        '#F9C80E', '#FF8C42', '#98C1D9', '#7B287D',
        '#66D7D1', '#FC7A57', '#9B5DE5', '#00BBF9'
    ]

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="w-[80px] h-[30px] p-0"
                    style={{ backgroundColor: color }}
                />
            </PopoverTrigger>
            <PopoverContent className="w-[280px]">
                <div className="flex flex-wrap gap-1">
                    {presetColors.map((presetColor) => (
                        <Button
                            key={presetColor}
                            className="w-8 h-8 p-0"
                            style={{ backgroundColor: presetColor }}
                            onClick={() => {
                                onChange(presetColor)
                                setIsOpen(false)
                            }}
                        />
                    ))}
                </div>
                <input
                    type="color"
                    value={color}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full h-10 mt-2"
                />
            </PopoverContent>
        </Popover>
    )
}

