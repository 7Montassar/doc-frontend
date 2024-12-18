'use client'

import { useState } from 'react'
import SubmittedDayOff from '../_components/submitted-day-off'
import Navbar from '@/app/(employee)/_components/Navbar'

export default function DayOffRequestForm() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [reason, setReason] = useState('')
  const [description, setDescription] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [requestNumber] = useState(Math.floor(Math.random() * 1000000)) // Random request number
  const [employeeName, setEmployeeName] = useState('') // Placeholder, use actual user info
  const [employeeEmail,  setEmployeeEmail] = useState('') // Placeholder

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
        <SubmittedDayOff
            employeeName={employeeName}
            employeeEmail={employeeEmail}
            startDate={new Date(startDate)}
            endDate={new Date(endDate)}
            reason={reason}
            description={description}
            requestNumber={requestNumber}
        />
    )
  }

  return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">

        <div className="max-w-md w-full space-y-8 bg-white p-6 sm:p-8 rounded-xl shadow-md">
          <div>
            <h1 className="text-3xl font-bold text-center text-[#0E708B]">Day Off Request</h1>
          </div>
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">Employee Name</label>
              <input
                  id="employee-name"
                  name="employee-name"
                  type="text"
                  required
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#0E708B] focus:border-[#0E708B] sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">Employee Email</label>
              <input
                  id="employee-email"
                  name="employee-email"
                  type="email"
                  required
                  value={employeeEmail}
                  onChange={(e) => setEmployeeEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#0E708B] focus:border-[#0E708B] sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                  id="start-date"
                  name="start-date"
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#0E708B] focus:border-[#0E708B] sm:text-sm"
                  min={new Date().toISOString().split('T')[0]} // Set minimum date to today
              />
            </div>
            <div>
              <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                  id="end-date"
                  name="end-date"
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#0E708B] focus:border-[#0E708B] sm:text-sm"
                  min={startDate || new Date().toISOString().split('T')[0]} // Set minimum date to start date or today
              />
            </div>
            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason for Day Off</label>
              <select
                  id="reason"
                  name="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#0E708B] focus:border-[#0E708B] sm:text-sm"
              >
                <option value="">Select a reason</option>
                <option value="vacation">Vacation</option>
                <option value="sick-leave">Sick Leave</option>
                <option value="personal">Personal</option>
                <option value="family">Family Emergency</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={4}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#0E708B] focus:border-[#0E708B] sm:text-sm"
              />
            </div>
            <div>
              <button type="submit" className="w-full py-2 px-4 bg-[#0E708B] text-white rounded-md">Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}
