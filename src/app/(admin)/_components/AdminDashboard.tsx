    "use client"
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
    import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
    import { Overview } from "./Overview"
    import { RecentActivity } from "./RecentActivity"
    import { UserRoleDistribution } from "./UserRoleDistribution"
    import { DocumentStatusDistribution } from "./DocumentStatusDistribution"
    import { WorkflowTimeline } from "./WorkflowTimeline"
    import { TopManagers } from "./TopManagers"
    import {
    fetchActiveUsersStats, fetchDashboardData, fetchRecentActivities, fetchWorkflowChanges,
} from "@/app/(admin)/actions";
    import {useEffect, useState} from "react";

    export function AdminDashboard() {
        const [loading, setLoading] = useState(true);
        const [recentActivities, setRecentActivities] = useState([]);
        const [documents, setDocuments] = useState<any>({ total: 0, change: 0 });
        const [activeUsers, setActiveUsers] = useState<any>({ total: 0, change: 0 });
        const [pendingDocs, setPendingDocs] = useState({ total: 0, change: 0 });
        const [documentStatusData, setDocumentStatusData] = useState<{ name: string; value: number }[]>([]);
        const [workflowChanges, setWorkflowChanges] = useState<any>({ total: 0, change: 0 });



        useEffect(() => {
            const fetchStats = async () => {
                try {
                    const data = await fetchDashboardData();
                    const users = await fetchActiveUsersStats();
                    const activities = await fetchRecentActivities();
                    const workflowData = await fetchWorkflowChanges();
                    console.log(workflowData);

                    setDocuments(data.total_documents);
                    setActiveUsers(users);
                    setPendingDocs(data.pending_documents);
                    setDocumentStatusData(data.status_distribution);
                    setRecentActivities(activities);
                    setWorkflowChanges(workflowData);
                } catch (error) {
                    console.error("Error fetching dashboard data:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchStats();
        }, []);




        return (
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Tabs defaultValue="overview" className="space-y-4">
                    <TabsContent value="overview" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Total Documents
                                    </CardTitle>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="h-4 w-4 text-muted-foreground"
                                    >
                                        <path
                                            d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{documents.total}</div>
                                    <p className="text-xs text-muted-foreground">
                                        {documents.change > 0 ? `+${documents.change}%` : `${documents.change}%`} from last month
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Active Users
                                    </CardTitle>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="h-4 w-4 text-muted-foreground"
                                    >
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                                        <circle cx="9" cy="7" r="4"/>
                                        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{activeUsers.total || 0}</div>
                                    <p className="text-xs text-muted-foreground">
                                        {activeUsers.change > 0 ? `+${activeUsers.change}%` : `${activeUsers.change}%`} from last week
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Pending Documents</CardTitle>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="h-4 w-4 text-muted-foreground"
                                    >
                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{pendingDocs.total}</div>
                                    <p className="text-xs text-muted-foreground">
                                        {pendingDocs.change >= 0
                                            ? `+${pendingDocs.change}% from yesterday`
                                            : `${pendingDocs.change}% from yesterday`}
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Workflow Changes
                                    </CardTitle>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="h-4 w-4 text-muted-foreground"
                                    >
                                        <rect width="20" height="14" x="2" y="5" rx="2"/>
                                        <path d="M2 10h20"/>
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {loading ? "Loading..." : workflowChanges.total}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {loading
                                            ? ""
                                            : workflowChanges.change > 0
                                                ? `+${workflowChanges.change}% from last week`
                                                : `${workflowChanges.change}% from last week`}
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                            <Card className="col-span-4">
                                <CardHeader>
                                    <CardTitle>Document Overview</CardTitle>
                                </CardHeader>
                                <CardContent className="pl-2">
                                    <Overview/>
                                </CardContent>
                            </Card>
                            <Card className="col-span-3">
                                <CardHeader>
                                    <CardTitle>Recent Activity</CardTitle>
                                    <CardDescription>
                                        Latest document and user updates
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {loading ? (
                                        <p className="text-sm text-muted-foreground">Loading...</p>
                                    ) : (
                                        <RecentActivity activities={recentActivities} />
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                            <Card className="col-span-4">
                                <CardHeader>
                                    <CardTitle>User Role Distribution</CardTitle>
                                </CardHeader>
                                <CardContent className="pl-2">
                                    <UserRoleDistribution/>
                                </CardContent>
                            </Card>
                            <Card className="col-span-3">
                                <CardHeader>
                                    <CardTitle>Document Status Distribution</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {loading ? (
                                        <p className="text-sm text-muted-foreground">Loading...</p>
                                    ) : (
                                        <DocumentStatusDistribution data={documentStatusData} />
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                            <Card className="col-span-4">
                                <CardHeader>
                                    <CardTitle>Workflow Timeline</CardTitle>
                                </CardHeader>
                                <CardContent className="pl-2">
                                    <WorkflowTimeline/>
                                </CardContent>
                            </Card>
                            <Card className="col-span-3">
                                <CardHeader>
                                    <CardTitle>Top Managers</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <TopManagers/>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        )
    }

