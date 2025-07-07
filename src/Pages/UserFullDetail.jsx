import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Axios } from '../AxiosProvider';

const UserFullDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await Axios.get(`/users?id=${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    
                    },
                        
                });
                setUser(response.data.user);
            } catch (err) {
                
                console.error("Error fetching user:", err);
            } finally {
                setLoading(false);
            }
        };
        
        fetchUser();
    }, [id]);
    
    if (loading) {
        return <div className="p-6 text-gray-600">Loading user...</div>;
    }

    if (!user) {
       
        return (
            <div className="p-6 text-red-500">
                <p>User not found.</p>
                <button
                    onClick={() => navigate(-1)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-3xl mx-auto bg-white shadow-lg rounded-xl border border-gray-200">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">User Details</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
                <div>
                    <p className="text-sm text-gray-500">User ID</p>
                    <p className="text-base font-medium">{user._id}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="text-base font-medium">{user.name}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-base font-medium">{user.email}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Role</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold
                        ${user.role === 'my_admin'
                            ? 'bg-red-100 text-blue-600'
                            : user.role === 'my_super_admin'
                                ? 'bg-yellow-100 text-yellow-600'
                                : 'bg-green-100 text-green-600'}`}>
                        {user.role.replace('my_', '').replace('_', ' ').toUpperCase()}
                    </span>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Created At</p>
                    <p className="text-base font-medium">
                        {new Date(user.createdAt).toLocaleString()}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Updated At</p>
                    <p className="text-base font-medium">
                        {new Date(user.updatedAt).toLocaleString()}
                    </p>
                </div>
            </div>

            <div className="mt-8">
                <button
                    onClick={() => navigate(-1)}
                    className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                >
                    Back to List
                </button>
            </div>
        </div>
    );
};

export default UserFullDetails;
