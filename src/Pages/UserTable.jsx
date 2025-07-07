import React, { useEffect, useState } from 'react';
import { Axios } from '../AxiosProvider';
import { useNavigate } from 'react-router-dom';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { CiCircleInfo } from "react-icons/ci";




const UsersTable = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [searchUser, setSearchUser] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [filterRole, setFilterRole] = useState('All');

    const limit = 10;

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000); // simulate loading
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const response = await Axios.get('/users', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsers(response.data.users);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
            user.email.toLowerCase().includes(searchUser.toLowerCase());

        const roleFormatted = user.role.replace('my_', '').replace('_', ' ').toLowerCase();
        const matchesRole =
            filterRole === 'All' ||
            roleFormatted === filterRole.toLowerCase();

        return matchesSearch && matchesRole;
    });


    const totalPage = Math.ceil(filteredUsers.length / limit);
    const indexOfLastUser = currentPage * limit;
    const indexOfFirstUser = indexOfLastUser - limit;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const pagination = [];
    for (let i = 1; i <= totalPage; i++) {
        pagination.push(
            <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm cursor-pointer border 
                    ${currentPage === i
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'}`}
            >
                {i}
            </button>
        );
    }

    const handleViewDetails = (userId) => {
        navigate(`/users/${userId}`);
    };

    const handleExportExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Users');

        worksheet.columns = [
            { header: 'ID', key: 'id', width: 36 },
            { header: 'Name', key: 'name', width: 20 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Role', key: 'role', width: 18 }
        ];

        worksheet.getRow(1).eachCell((cell) => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFFF00' },
            };
            cell.font = { bold: true };
            cell.alignment = { horizontal: 'center' };
            cell.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' },
            };
        });

        const exportData = filteredUsers.map(user => ({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
                .replace('my_', '')
                .replace('_', ' ')
                .replace(/\b\w/g, c => c.toUpperCase())
        }));

        exportData.forEach(user => {
            worksheet.addRow(user);
        });

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        saveAs(blob, 'UsersData.xlsx');
    };

    // Spinner UI while loading
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-white">
                {/* Bike Tyre Icon (Spinning) */}
                <svg
                    className="animate-spin w-20 h-20 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                    />
                </svg>

                {/* Optional Loading Text */}
                <p className="mt-4 text-sm text-black-500 tracking-wide">Loading data...</p>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 w-full max-w-7xl mx-auto">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
                <h2 className="text-xl sm:text-3xl font-bold text-gray-800">Users List</h2>

                <div className="flex flex-wrap gap-2">
                    <button
                        className="px-2 sm:px-3 py-1 rounded-md bg-gray-100 text-gray-700 text-xs sm:text-sm hover:bg-gray-200 disabled:opacity-50"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {pagination}
                    <button
                        className="px-2 sm:px-3 py-1 rounded-md bg-gray-100 text-gray-700 text-xs sm:text-sm hover:bg-gray-200 disabled:opacity-50"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPage))}
                        disabled={currentPage === totalPage}
                    >
                        Next
                    </button>
                </div>

                <button
                    onClick={handleExportExcel}
                    className="flex items-center justify-center gap-4 px-4 py-2 bg-blue-100 text-green-700 rounded-md text-sm hover:bg-blue-200 transition relative"
                >
                    Export Excel


                    <div className="relative group">
                        <CiCircleInfo className="text-xl cursor-pointer" />

                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2
                    w-max bg-black text-white text-xs rounded px-2 py-1 opacity-0
                    group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                            Export user data to Excel
                        </div>
                    </div>
                </button>


            </div>

            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* 🔍 Search */}
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchUser}
                    onChange={(e) => {
                        setSearchUser(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="w-full sm:max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm sm:text-base"
                />

                {/* 🎛️ Role Filter */}
                <select
                    value={filterRole}
                    onChange={(e) => {
                        setFilterRole(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                >
                    <option value="All">All Roles</option>
                    <option value="Admin">Admin</option>
                    <option value="Super Admin">Super Admin</option>
                    <option value="User">User</option>
                </select>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-md">
                <div className="hidden sm:block overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                            <tr>
                                <th className="px-4 py-3 text-left">#</th>
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Email</th>
                                <th className="px-4 py-3 text-left">Role</th>
                                <th className="px-4 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-gray-700">
                            {currentUsers.length > 0 ? (
                                currentUsers.map((user, index) => (
                                    <tr key={user._id} className="hover:bg-blue-50 transition">
                                        <td className="px-4 py-3">{(currentPage - 1) * limit + index + 1}</td>
                                        <td className="px-4 py-3">{user.name}</td>
                                        <td className="px-4 py-3">{user.email}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                                                ${user.role === 'my_admin'
                                                    ? 'bg-red-100 text-blue-600'
                                                    : user.role === 'my_super_admin'
                                                        ? 'bg-yellow-100 text-yellow-600'
                                                        : 'bg-green-100 text-green-600'}`}>
                                                {user.role.replace('my_', '').replace('_', ' ').toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <button
                                                onClick={() => handleViewDetails(user._id)}
                                                className="text-blue-600 hover:underline text-sm"
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-4 py-6 text-center text-gray-400">
                                        No users found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="sm:hidden divide-y divide-gray-200">
                    {currentUsers.length > 0 ? (
                        currentUsers.map((user, index) => (
                            <div key={user._id} className="p-4 flex flex-col gap-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium text-gray-600">#</span>
                                    <span>{(currentPage - 1) * limit + index + 1}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium text-gray-600">Name</span>
                                    <span>{user.name}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium text-gray-600">Email</span>
                                    <span className="text-right">{user.email}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium text-gray-600">Role</span>
                                    <span className={`text-xs font-semibold px-2 py-1 rounded-full 
                                        ${user.role === 'my_admin'
                                            ? 'bg-red-100 text-blue-600'
                                            : user.role === 'my_super_admin'
                                                ? 'bg-yellow-100 text-yellow-600'
                                                : 'bg-green-100 text-green-600'}`}>
                                        {user.role.replace('my_', '').replace('_', ' ').toUpperCase()}
                                    </span>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => handleViewDetails(user._id)}
                                        className="text-blue-600 hover:underline text-sm"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-4 text-center text-gray-400">No users found</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UsersTable;
