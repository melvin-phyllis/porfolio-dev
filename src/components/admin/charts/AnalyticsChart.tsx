"use client";

import { DailyStats } from "@/lib/firebase-db";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface AnalyticsChartProps {
    data: DailyStats[];
}

export function AnalyticsChart({ data }: AnalyticsChartProps) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const chartData = data.map((stat) => ({
        date: new Date(stat.date).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "short",
        }),
        vues: stat.views,
        visiteurs: stat.uniqueVisitors,
        événements: stat.events,
    }));

    if (data.length === 0) {
        return (
            <div className="flex items-center justify-center h-[350px] text-gray-500 dark:text-gray-400">
                Aucune donnée disponible pour cette période.
            </div>
        );
    }

    const isDark = mounted && resolvedTheme === "dark";

    // Couleurs adaptées au thème
    const colors = {
        grid: isDark ? "#374151" : "#e5e7eb",
        text: isDark ? "#9ca3af" : "#6b7280",
        tooltipBg: isDark ? "#1f2937" : "#ffffff",
        tooltipBorder: isDark ? "#374151" : "#e5e7eb",
        tooltipText: isDark ? "#f3f4f6" : "#111827",
        lineViews: "#465fff", // Brand blue
        lineVisitors: "#06b6d4", // Cyan
        lineEvents: "#22c55e", // Green
    };

    return (
        <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData}>
                <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke={colors.grid}
                    vertical={false}
                />
                <XAxis
                    dataKey="date"
                    tick={{ fill: colors.text, fontSize: 12 }}
                    axisLine={{ stroke: colors.grid }}
                    tickLine={{ stroke: colors.grid }}
                />
                <YAxis
                    tick={{ fill: colors.text, fontSize: 12 }}
                    axisLine={{ stroke: colors.grid }}
                    tickLine={{ stroke: colors.grid }}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: colors.tooltipBg,
                        border: `1px solid ${colors.tooltipBorder}`,
                        borderRadius: "12px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                    labelStyle={{ color: colors.tooltipText, fontWeight: 600 }}
                    itemStyle={{ color: colors.text }}
                />
                <Legend 
                    wrapperStyle={{ paddingTop: "20px" }}
                    formatter={(value) => (
                        <span style={{ color: colors.text }}>{value}</span>
                    )}
                />
                <Line
                    type="monotone"
                    dataKey="vues"
                    stroke={colors.lineViews}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6, fill: colors.lineViews }}
                />
                <Line
                    type="monotone"
                    dataKey="visiteurs"
                    stroke={colors.lineVisitors}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6, fill: colors.lineVisitors }}
                />
                <Line
                    type="monotone"
                    dataKey="événements"
                    stroke={colors.lineEvents}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6, fill: colors.lineEvents }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
