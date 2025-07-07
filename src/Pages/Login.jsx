import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Axios } from "../AxiosProvider";


const Login = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!navigator.onLine) {
            toast.error("You are offline. Please connect to the internet.");
            return;
        }

        try {
            const response = await Axios.post("/login", formData)
            const data = await response.data

            localStorage.setItem('token', data.token)
            localStorage.setItem("username", response.data.user.user);
            localStorage.setItem("email", response.data.user.email);

            toast.success(data.msg)
            navigate('/dashboard')
        } catch (error) {
            // console.log("Error Response:", error.response);
            toast.error(error.response?.data?.msg || error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
                    Welcome Back 👋
                </h2>

                <form onSubmit={handleLogin} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Email</label>
                        <div className="flex items-center border border-gray-300 rounded-md px-3">
                            <FaEnvelope className="text-gray-400 mr-2" />
                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full py-2 outline-none text-sm"

                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Password</label>
                        <div className="flex items-center border border-gray-300 rounded-md px-3">
                            <FaLock className="text-gray-400 mr-2" />
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full py-2 outline-none text-sm"

                            />
                        </div>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
                    >
                        Log In
                    </button>

                    {/* Additional Links */}
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <Link to="/forgot-password" className="hover:text-blue-600">
                            Forgot Password?
                        </Link>
                        <Link to="/register" className="hover:text-blue-600">
                            Create Account
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
