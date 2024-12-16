'use client'

import { useState } from 'react'
import type { Metadata } from 'next'



export default function DayOffRequestForm() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value
    setStartDate(newStartDate)
    
    // If the end date is before the new start date, reset it
    if (endDate < newStartDate) {
      setEndDate('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-6 sm:p-8 rounded-xl shadow-md">
        <div>
          <h1 className="text-3xl font-bold text-center text-[#0E708B]">Day Off Request</h1>
        </div>
        <form className="mt-8 space-y-4" action="#" method="POST">
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">Start Date</label>
              <input 
                id="start-date" 
                name="start-date" 
                type="date" 
                required 
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#0E708B] focus:border-[#0E708B] sm:text-sm" 
                value={startDate}
                onChange={handleStartDateChange}
                min={new Date().toISOString().split('T')[0]} // Set minimum date to today
              />
            </div>
            <div className="mt-4">
              <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">End Date</label>
              <input 
                id="end-date" 
                name="end-date" 
                type="date" 
                required 
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#0E708B] focus:border-[#0E708B] sm:text-sm" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate || new Date().toISOString().split('T')[0]} // Set minimum date to start date or today
              />
            </div>
            <div className="mt-4">
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason for Day Off</label>
              <select id="reason" name="reason" required className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#0E708B] focus:border-[#0E708B] sm:text-sm">
                <option value="">Select a reason</option>
                <option value="vacation">Vacation</option>
                <option value="sick-leave">Sick Leave</option>
                <option value="personal">Personal</option>
                <option value="family">Family Emergency</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mt-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea id="description" name="description" required className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#0E708B] focus:border-[#0E708B] sm:text-sm" placeholder="Please provide more details about your request" rows={4}></textarea>
            </div>
          </div>

          <div className="mt-6">
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#0E708B] hover:bg-[#0a5a6f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0E708B]">
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
