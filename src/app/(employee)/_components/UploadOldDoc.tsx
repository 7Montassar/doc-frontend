'use client'

import { useState, useCallback } from 'react'
import { Upload, File, CheckCircle } from 'lucide-react'

export default function UploadOldDoc() {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const endpoint = process.env.NEXT_PUBLIC_ENDPOINT

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    
    const droppedFile = e.dataTransfer.files[0]
    handleFile(droppedFile)
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      handleFile(selectedFile)
    }
  }, [])

  const handleFile = (selectedFile: File) => {
    if (selectedFile.type !== 'application/pdf') {
      setError('Please upload a PDF file')
      setFile(null)
    } else {
      setFile(selectedFile)
      setError(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) {
      setError('Please select a file to upload')
      return
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('owner_id', '1') // Default owner_id
    formData.append('category', 'Default Category') // Default category
    formData.append('manager_id', '1') // Default manager_id
    formData.append('status', 'pending') // Default status

    try {
      const response = await fetch(`${endpoint}/document/upload_and_save/`, {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        alert('File uploaded successfully!')
        console.log('Response:', data)
        setFile(null) // Clear file after successful upload
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'An error occurred during upload')
      }
    } catch (err) {
      console.error(err)
      setError('An unexpected error occurred. Please try again.')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ease-in-out ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileInput}
            className="hidden"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className="cursor-pointer flex flex-col items-center space-y-2"
          >
            <Upload className="w-12 h-12 text-gray-400" />
            <span className="text-gray-600">Drag & drop your PDF here or click to browse</span>
          </label>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {file && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <File className="w-4 h-4" />
            <span>{file.name}</span>
            <CheckCircle className="w-4 h-4 text-green-500" />
          </div>
        )}
        <button
          type="submit"
          disabled={!file}
          className={`w-full py-2 px-4 rounded-md text-white font-medium transition-all duration-300 ease-in-out ${
            file
              ? 'bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Upload PDF
        </button>
      </form>
    </div>
  )
}
