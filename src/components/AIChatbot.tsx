'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send, X, Mic, Copy, RotateCcw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import VividBackground from './VividBackground'

export default function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([])
    const [isListening, setIsListening] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleSend = () => {
        if (input.trim()) {
            setMessages([...messages, { role: 'user', content: input }])
            // Mock AI response
            setTimeout(() => {
                setMessages(prev => [...prev, { role: 'ai', content: `Here's a mock response to: "${input}"` }])
            }, 1000)
            setInput('')
        }
    }

    const handleVoiceInput = () => {
        setIsListening(true)
        // Mock voice recognition
        setTimeout(() => {
            setInput('This is a mock voice input')
            setIsListening(false)
        }, 2000)
    }

    const handleCopy = (content: string) => {
        navigator.clipboard.writeText(content)
    }

    const handleReset = () => {
        setMessages([])
    }

    return (
        <>
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-8 right-8 z-50"
                    >
                        <Button
                            onClick={() => setIsOpen(true)}
                            className="rounded-full p-4 bg-[#0E708B] text-white shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <MessageCircle className="h-6 w-6" />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50 z-50"
                    >
                        <div className="w-full max-w-2xl h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-[#0E708B] relative">
                            <VividBackground />
                            <div className="flex justify-between items-center p-6 border-b border-[#0E708B] relative z-10">
                                <h2 className="text-xl font-semibold text-[#0E708B]">AI Assistant</h2>
                                <div className="flex items-center space-x-2">
                                    <Button variant="ghost" size="icon" onClick={handleReset} className="text-[#0E708B] hover:text-[#0E708B] hover:bg-[#0E708B]/10 transition-colors">
                                        <RotateCcw className="h-5 w-5" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-[#0E708B] hover:text-[#0E708B] hover:bg-[#0E708B]/10 transition-colors">
                                        <X className="h-6 w-6" />
                                    </Button>
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
                                {messages.map((message, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-[80%] p-4 rounded-2xl relative group ${
                                            message.role === 'user'
                                                ? 'bg-[#0E708B] text-white'
                                                : 'bg-white text-[#0E708B] border border-[#0E708B]'
                                        }`}>
                                            {message.content}
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleCopy(message.content)}
                                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </motion.div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                            <div className="p-6 border-t border-[#0E708B] bg-white relative z-10">
                                <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex space-x-4">
                                    <Input
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Ask a question..."
                                        className="flex-1 border-[#0E708B] text-[#0E708B] placeholder-[#0E708B]/50 focus:ring-[#0E708B] focus:border-[#0E708B]"
                                    />
                                    <Button
                                        type="button"
                                        onClick={handleVoiceInput}
                                        className={`bg-[#0E708B] hover:bg-[#0E708B]/90 text-white transition-colors ${isListening ? 'animate-pulse' : ''}`}
                                    >
                                        <Mic className="h-5 w-5" />
                                    </Button>
                                    <Button type="submit" className="bg-[#0E708B] hover:bg-[#0E708B]/90 text-white transition-colors">
                                        <Send className="h-5 w-5" />
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

