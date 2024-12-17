'use client'

import React, { useState, useEffect } from 'react'
import { X, Loader2, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getToken } from "@/app/dashboard/actions"

interface WorkflowItem {
  id: number
  former_status: string
  new_status: string
  updated_at: string
  updated_by_username: string
}

interface WorkflowPopupProps {
  documentId: number
  onClose: () => void
}

const statusColors: { [key: string]: string } = {
  'Pending': 'bg-yellow-200 text-yellow-800',
  'Under Review': 'bg-blue-200 text-blue-800',
  'Accepted': 'bg-green-200 text-green-800',
  'Declined': 'bg-red-200 text-red-800',
}

export default function HorizontalChainedWorkflowPopup({ documentId, onClose }: WorkflowPopupProps) {
  const [workflows, setWorkflows] = useState<WorkflowItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchWorkflows() {
      try {
        const token = await getToken()
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/workflows/get_workflows_by_document_id/?document_id=${documentId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch workflows')
        }

        const data = await response.json()
        console.log(data)
        setWorkflows(data)
        setLoading(false)
      } catch (err) {
        setError('Error fetching workflows')
        setLoading(false)
      }
    }

    fetchWorkflows()
  }, [documentId])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-5xl"
      >
        <Card className="bg-white shadow-2xl overflow-hidden">
          <CardHeader className="bg-emerald-800 text-white">
            <CardTitle className="text-2xl font-bold">Document Workflow Journey</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="absolute top-2 right-2 text-white hover:bg-white/20">
              <X className="h-6 w-6" />
            </Button>
          </CardHeader>
          <CardContent className="p-6">
            {loading && (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-800" />
              </div>
            )}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {!loading && !error && (
              <ScrollArea className="h-[60vh]">
                <AnimatePresence>
                  <div className="flex flex-col space-y-8">
                    {workflows.map((workflow, index) => (
                      <motion.div
                        key={workflow.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-center space-x-4"
                      >
                        <StatusBubble status={workflow.former_status} />
                        <ArrowRight className="text-emerald-800" size={24} />
                        <StatusBubble status={workflow.new_status} />
                        <div className="flex-grow">
                          <h3 className="text-lg font-semibold text-emerald-800">
                            {workflow.former_status} → {workflow.new_status}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Updated by {workflow.updated_by_username}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(workflow.updated_at).toLocaleString()}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </AnimatePresence>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
        <BackgroundBubbles />
      </motion.div>
    </div>
  )
}

function StatusBubble({ status }: { status: string }) {
  // Transform the status to only the first letter of each word in uppercase
  const statusAbbreviation = status
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('');

  return (
    <div
      className={`flex-shrink-0 w-16 h-16 rounded-full ${
        statusColors[status] || 'bg-gray-200'
      } flex items-center justify-center text-sm font-bold shadow-lg border-2 border-emerald-800`}
    >
      {statusAbbreviation}
    </div>
  );
}


function BackgroundBubbles() {
  const bubbles = Array.from({ length: 20 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute rounded-full bg-emerald-800 opacity-5"
      style={{
        width: Math.random() * 100 + 20,
        height: Math.random() * 100 + 20,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        y: [0, -10, 0],
        scale: [1, 1.1, 1],
        opacity: [0.05, 0.1, 0.05],
      }}
      transition={{
        duration: Math.random() * 2 + 2,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    />
  ))

  return <div className="absolute inset-0 overflow-hidden pointer-events-none">{bubbles}</div>
}

