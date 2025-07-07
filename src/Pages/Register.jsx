import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Axios } from "../AxiosProvider";


const Register = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await Axios.post("/register", formData)
            const data = await response.data

            toast.success(data.msg)
            navigate('/login')
        } catch (error) {
            console.log("Error Response:", error.response);
            toast.error(error.response?.data?.error || error.response?.data?.msg || "Something went wrong");
        }

    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
                    Create Your Account 🚀
                </h2>

                <form onSubmit={handleRegister} className="space-y-5">

                    {/* Name */}

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                        <div className="flex items-center border border-gray-300 rounded-md px-3">
                            <FaUser className="text-gray-400 mr-2" />
                            <input
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full py-2 outline-none text-sm"

                            />
                        </div>
                    </div>

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

                    {/* Confirm Password */}

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Confirm Password</label>
                        <div className="flex items-center border border-gray-300 rounded-md px-3">
                            <FaLock className="text-gray-400 mr-2" />
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full py-2 outline-none text-sm"

                            />
                        </div>
                    </div>

                    {/* Register Button */}

                    <button
                        type="submit"
                        className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
                    >
                        Register
                    </button>

                    {/* Additional Links */}

                    <div className="text-sm text-gray-500 text-center mt-2">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 hover:underline">
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
