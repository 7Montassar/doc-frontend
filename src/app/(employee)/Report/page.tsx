import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Report Submission Form',
  description: 'Submit your reports easily with our online form',
}

export default function ReportForm() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-6 sm:p-8 rounded-xl shadow-md">
        <div>
          <h1 className="text-3xl font-bold text-center text-[#0E708B]">Report Submission</h1>
        </div>
        <form className="mt-8 space-y-4" action="#" method="POST">
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input id="email" name="email" type="email" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#0E708B] focus:border-[#0E708B] sm:text-sm" placeholder="Email address" />
            </div>
            <div className="mt-4">
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
              <select id="department" name="department" required className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#0E708B] focus:border-[#0E708B] sm:text-sm">
                <option value="">Select a department</option>
                <option value="hr">Human Resources</option>
                <option value="it">Information Technology</option>
                <option value="finance">Finance</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>
            <div className="mt-4">
              <label htmlFor="report-type" className="block text-sm font-medium text-gray-700">Report Type</label>
              <select id="report-type" name="report-type" required className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#0E708B] focus:border-[#0E708B] sm:text-sm">
                <option value="">Select report type</option>
                <option value="incident">Incident Report</option>
                <option value="progress">Progress Report</option>
                <option value="expense">Expense Report</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mt-4">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
              <input id="subject" name="subject" type="text" required className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#0E708B] focus:border-[#0E708B] sm:text-sm" placeholder="Subject" />
            </div>
            <div className="mt-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea id="description" name="description" required className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#0E708B] focus:border-[#0E708B] sm:text-sm" placeholder="Description" rows={4}></textarea>
            </div>
          </div>

          <div className="mt-6">
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#0E708B] hover:bg-[#0a5a6f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0E708B]">
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}