"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
    {
        name: "John",
        total: Math.floor(Math.random() * 100) + 20,
    },
    {
        name: "Jane",
        total: Math.floor(Math.random() * 100) + 20,
    },
    {
        name: "Bob",
        total: Math.floor(Math.random() * 100) + 20,
    },
    {
        name: "Alice",
        total: Math.floor(Math.random() * 100) + 20,
    },
    {
        name: "Tom",
        total: Math.floor(Math.random() * 100) + 20,
    },
]

export function TopUsers() {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                />
                <Bar dataKey="total" fill="#8884d8" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    )
}

