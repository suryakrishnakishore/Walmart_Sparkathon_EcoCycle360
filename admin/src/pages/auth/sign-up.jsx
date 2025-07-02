import React, { useEffect, useState } from 'react'
import api from '../../libs/apiCalls';
import { Link, useNavigate } from 'react-router-dom';
import { BiLoader } from "react-icons/bi";
import { toast } from "sonner";
import useStore from '../../store';

function SignUp() {
    const { user } = useStore((state) => state);

    const [form, setForm] = useState({
        name: '',
        gender: '',
        employee_id: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        user && navigate("/");
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { status, data: response } = await api.post("/auth/sign-up", form);
            console.log("Response: ", response);

            if (status === 201) {
                toast.success("Account created successfully. Now you can login...");
                setTimeout(() => {
                    navigate("/sign-in");
                }, 1500)
            }

            console.log(response);

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || error.message);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen  flex items-center justify-center  bg-gradient-to-br from-blue-300 to-green-400'>
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 mb-1" htmlFor="name">Name</label>
                        <input
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                            type="text"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1" htmlFor="gender">Gender</label>
                        <select
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                            id="gender"
                            name="gender"
                            value={form.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
                        <input
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                            type="text"
                            id="employee_id"
                            name="employee_id"
                            value={form.employee_id}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1" htmlFor="password">Password</label>
                        <input
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                            type="password"
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-2 mt-2 flex justify-center text-center text-white font-semibold rounded-lg transition
                            ${loading
                                ? "bg-blue-300 cursor-not-allowed"
                                : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                            }`}
                        disabled={loading}
                    >
                        {loading ? <BiLoader className='text-2x1 align-middle text-center text-white animate-spin' /> : "Create an Account"}
                    </button>

                    <div className="text-right">
                        <span className="text-gray-600 text-sm">
                            Already have an account?{' '}
                            <Link
                                to="/sign-in"
                                className="text-blue-500 hover:underline font-medium"
                            >
                                Sign In
                            </Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;