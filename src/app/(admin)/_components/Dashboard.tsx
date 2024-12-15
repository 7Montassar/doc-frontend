'use client'

import { useState } from 'react'
import { DashboardSidebar } from '@/app/(admin)/_components/Sidebar'
import UserTable from '../_components/UserTable'
import OldDocumentsTable from '@/components/OldDocumentsTable'
import DocumentTable from '@/components/DocumentTable'
import Stats from '@/app/(admin)/_components/Stats'
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export const Dashboard = () => {
    const [activeSection, setActiveSection] = useState('stats')

    const handleSectionChange = (section: string) => {
        setActiveSection(section)
    }

    return (
        <SidebarProvider>
            <div className="flex h-screen bg-gray-100">
                <DashboardSidebar onSectionChange={handleSectionChange} activeSection={activeSection} />
                <SidebarInset className="flex-1 overflow-hidden">
                    <div className="h-full overflow-auto">
                        <div className="w-full p-8">
                            <h1 className="text-4xl font-bold mb-6 text-[#0E708B]">
                                {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
                            </h1>
                            <div>
                                {activeSection === 'stats' && (
                                    <section>
                                        <Stats />
                                    </section>
                                )}
                                {activeSection === 'users' && (
                                    <section>
                                        <UserTable />
                                    </section>
                                )}
                                {activeSection === 'documents' && (
                                    <section>
                                        <h2 className="text-2xl font-semibold mb-6 text-[#0E708B]">Documents</h2>
                                        <DocumentTable />
                                    </section>
                                )}
                                {activeSection === 'oldDocuments' && (
                                    <section>
                                        <h2 className="text-2xl font-semibold mb-6 text-[#0E708B]">Old Documents</h2>
                                        <OldDocumentsTable />
                                    </section>
                                )}
                            </div>
                        </div>
                    </div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
}