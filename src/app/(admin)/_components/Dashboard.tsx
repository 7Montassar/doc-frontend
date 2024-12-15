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
            <div className="flex h-screen">
                <DashboardSidebar onSectionChange={handleSectionChange} activeSection={activeSection} />
                <SidebarInset className="flex-1 overflow-auto">
                    <div className="container w-full mx-auto px-4 py-8">
                        <h1 className="text-3xl font-bold mb-8 text-[#0E708B]">{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h1>
                        {activeSection === 'stats' && <Stats />}
                        {activeSection === 'users' && (
                            <section className="mb-12 w-full">
                                <UserTable />
                            </section>
                        )}
                        {activeSection === 'documents' && (
                            <section className="mb-12">
                                <h2 className="text-2xl font-semibold mb-4 text-[#0E708B]">Documents</h2>
                                <p>Documents section content goes here.</p>
                                <section className="mb-12">
                                    <DocumentTable />
                                </section>
                            </section>
                        )}
                        {activeSection === 'oldDocuments' && (
                            <section className="mb-12 flex-1">
                                <h2 className="text-2xl font-semibold mb-4 text-[#0E708B]">Old Documents</h2>
                                <OldDocumentsTable />
                            </section>
                        )}

                    </div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
}

