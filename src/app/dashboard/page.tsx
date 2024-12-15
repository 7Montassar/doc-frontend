import React from 'react'
import {getUserRole} from "@/app/dashboard/actions";
import { Dashboard as EmployeeDashboard  } from "@/app/(employee)/_components/Dashboard";
import {redirect} from "next/navigation";

const Dashboard = async () => {
    const role = await getUserRole();
    if (role === "employee") {
        return <EmployeeDashboard />
    }
    return (
        <div>Dashboard</div>
    )
}
export default Dashboard
