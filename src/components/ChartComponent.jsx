import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    LineChart,
    Line,
    ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const ChartComponent = ({ users }) => {
    // 🟦 Format role for consistency
    const formatRole = (role) =>
        role.replace("my_", "").replace("_", " ").toLowerCase();

    // 📊 Group by role
    const roleCounts = users.reduce((acc, user) => {
        const role = formatRole(user.role);
        acc[role] = (acc[role] || 0) + 1;
        return acc;
    }, {});

    const roleData = Object.keys(roleCounts).map((role) => ({
        name: role.charAt(0).toUpperCase() + role.slice(1),
        value: roleCounts[role],
    }));

    // 📈 Monthly user joining simulation based on dummy data generation
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlyJoinCounts = Array(12).fill(0);

    users.forEach(user => {
        const date = new Date(user.createdAt);
        const monthIndex = date.getMonth();
        monthlyJoinCounts[monthIndex]++;
    });

    const lineData = months.map((month, index) => ({
        month,
        users: monthlyJoinCounts[index],
    }));

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 🥧 Pie Chart */}
            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">User Role Distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie
                            data={roleData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            dataKey="value"
                        >
                            {roleData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* 📊 Bar Chart */}
            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Users by Role</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={roleData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* 📉 Line Chart */}
            <div className="bg-white p-4 rounded-lg shadow col-span-1 md:col-span-2">
                <h3 className="text-lg font-semibold mb-4">Monthly User Growth</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={lineData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="users" stroke="#82ca9d" strokeWidth={3} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ChartComponent;
