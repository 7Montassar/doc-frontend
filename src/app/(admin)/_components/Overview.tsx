"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
    { name: "Jan", documents: 65 },
    { name: "Feb", documents: 59 },
    { name: "Mar", documents: 80 },
    { name: "Apr", documents: 81 },
    { name: "May", documents: 56 },
    { name: "Jun", documents: 55 },
    { name: "Jul", documents: 40 },
]

export function Overview() {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
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
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey="documents"
                    stroke="#8884d8"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}

