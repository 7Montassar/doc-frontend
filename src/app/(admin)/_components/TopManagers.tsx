"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { useEffect, useState } from "react"
import {fetchTopManagers} from "@/app/(admin)/actions";

export function TopManagers() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchTopManagers();
                setData(data);
            } catch (error) {
                console.error("Error fetching top managers data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p className="text-sm text-muted-foreground">Loading...</p>;
    }

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} layout="vertical">
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Bar dataKey="documents" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
}
