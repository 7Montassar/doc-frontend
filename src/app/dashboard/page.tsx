import React from 'react'
import {getUserRole} from "@/app/dashboard/actions";
import { Dashboard as EmployeeDashboard  } from "@/app/(employee)/_components/Dashboard";
import { Dashboard as AdminDashboard } from "@/app/(admin)/_components/Dashboard";
import { Dashboard as ManagerDashboard } from "@/app/(manager)/_components/Dashboard";

const Dashboard = async () => {
    const role = await getUserRole();
    if (role === "employee") {
        return <EmployeeDashboard />
    }
    if (role === "manager") {
        return <ManagerDashboard />
    }
    if (role === "admin") {
        return <AdminDashboard />
    }
    return (
        <div>Dashboard</div>
    )
}
export default Dashboard
