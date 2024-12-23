"use client"
import { useState } from 'react'
import SubmittedReport from "@/app/(employee)/_components/submitted-report";
import Navbar from '@/app/(employee)/_components/Navbar';

export default function ReportForm() {
  const [email, setEmail] = useState('')
  const [department, setDepartment] = useState('')
  const [reportType, setReportType] = useState('')
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [reportNumber, setReportNumber] = useState(Math.floor(Math.random() * 1000000))// Example report number



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true) // Set to true to show SubmittedReport component
  }

  if (submitted) {
    return (
        <SubmittedReport
            email={email}
            department={department}
            reportType={reportType}
            subject={subject}
            description={description}
            reportNumber={reportNumber}
        />
    )
  }

  return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-6 sm:p-8 rounded-xl shadow-md">
          <div>
            <h1 className="text-3xl font-bold text-center text-[#0E708B]">Report Submission</h1>
          </div>
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#0E708B] focus:border-[#0E708B] sm:text-sm"
                    placeholder="Email address"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
                <select
                    id="department"
                    name="department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#0E708B] focus:border-[#0E708B] sm:text-sm"
                >
                  <option value="">Select a department</option>
                  <option value="hr">Human Resources</option>
                  <option value="it">Information Technology</option>
                  <option value="finance">Finance</option>
                  <option value="marketing">Marketing</option>
                </select>
              </div>
              <div className="mt-4">
                <label htmlFor="report-type" className="block text-sm font-medium text-gray-700">Report Type</label>
                <select
                    id="report-type"
                    name="report-type"
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    required
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#0E708B] focus:border-[#0E708B] sm:text-sm"
                >
                  <option value="">Select report type</option>
                  <option value="incident">Incident Report</option>
                  <option value="progress">Progress Report</option>
                  <option value="expense">Expense Report</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mt-4">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#0E708B] focus:border-[#0E708B] sm:text-sm"
                    placeholder="Subject"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#0E708B] focus:border-[#0E708B] sm:text-sm"
                    placeholder="Description"
                    rows={4}
                ></textarea>
              </div>
            </div>

            <div className="mt-6">
              <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#0E708B] hover:bg-[#0a5a6f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0E708B]"
              >
                Submit Report
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}
