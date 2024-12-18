"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
    { name: "Alice", documents: 23 },
    { name: "Bob", documents: 19 },
    { name: "Charlie", documents: 15 },
    { name: "David", documents: 12 },
    { name: "Eve", documents: 10 },
]

export function TopManagers() {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} layout="vertical">
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Bar dataKey="documents" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    )
}

