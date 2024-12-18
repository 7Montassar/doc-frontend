"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
    { name: "Mon", changes: 12 },
    { name: "Tue", changes: 19 },
    { name: "Wed", changes: 3 },
    { name: "Thu", changes: 5 },
    { name: "Fri", changes: 2 },
    { name: "Sat", changes: 0 },
    { name: "Sun", changes: 0 },
]

export function  WorkflowTimeline() {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="changes" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    )
}

