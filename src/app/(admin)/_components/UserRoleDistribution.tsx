"use client"

import { useEffect, useState } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { fetchUserRoleDistribution } from "../actions" // Adjust the path as needed

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

export function UserRoleDistribution() {
    const [data, setData] = useState<{ name: string; value: number }[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await fetchUserRoleDistribution();

                // Transform the response object into an array of { name, value } pairs
                const transformedData = Object.entries(fetchedData).map(([name, value]) => ({
                    name,
                    value: Number(value), // Ensure value is treated as a number
                }));

                setData(transformedData);
            } catch (error) {
                console.error("Error fetching user role distribution:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    )
}
