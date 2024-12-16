'use client'

import { useState, useEffect } from 'react'
import { DashboardSidebar } from '@/app/(admin)/_components/Sidebar'
import UserTable from '../_components/UserTable'
import OldDocumentsTable from '@/components/OldDocumentsTable'
import DocumentTable from '@/components/DocumentTable'
import Stats from '@/app/(admin)/_components/Stats'
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { getAllUsers} from "@/app/(admin)/actions";
import {User} from "@/types/user"; // Make sure this is the correct import path for getAllUsers

export const Dashboard = () => {
    const [activeSection, setActiveSection] = useState('stats')
    const [users, setUsers] = useState<User[]>([]); // Hold fetched users in state
    const [loading, setLoading] = useState(true); // To track if users are still being fetched
    const [error, setError] = useState<string | null>(null); // To handle errors

    const handleSectionChange = (section: string) => {
        setActiveSection(section)
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await getAllUsers();
                console.log("fetchedUsers", fetchedUsers);
                setUsers(fetchedUsers); // Update state with fetched users
            } catch (err) {
                setError('Failed to fetch users'); // Handle any errors
            } finally {
                setLoading(false); // Set loading to false once the fetch completes
            }
        };

        fetchUsers().then(r => console.log(r));
    }, []); // Empty dependency array to only run once when component mounts

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
                                        {loading && <p>Loading users...</p>}
                                        {error && <p className="text-red-500">{error}</p>}
                                        {!loading && !error && users.length === 0 && <p>No users found.</p>}
                                        {!loading && !error && users.length > 0 && <UserTable initialUsers={users} />} {/* Pass fetched users here */}
                                    </section>
                                )}
                                {activeSection === 'documents' && (
                                    <section>
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
