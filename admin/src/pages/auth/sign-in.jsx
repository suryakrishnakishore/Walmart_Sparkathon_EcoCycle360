import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../libs/apiCalls';
import { BiLoader } from 'react-icons/bi';
import { toast } from "sonner";
import useStore from '../../store';

function SignIn() {
    const [form, setForm] = useState({
        employee_id: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();
    const { user, setCredentials } = useStore((state) => state);

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
            const { status, data: response } = await api.post("/auth/admin-sign-in", form);
            if (status === 200) {
                toast.success(response?.message);

                const userInfo = { ...response?.user, token: response?.token };
                localStorage.setItem("ecoadmin", JSON.stringify(userInfo));
                setCredentials(userInfo);

                setTimeout(() => {
                    navigate("/home");
                }, 1500)
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 to-green-400'>
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign In</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
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
                        {loading ? <BiLoader className='text-2xl text-white animate-spin' /> : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SignIn;