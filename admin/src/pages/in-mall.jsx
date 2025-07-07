import React, { useState } from 'react'
import api from '../libs/apiCalls.js';
import { useEffect } from 'react';

function InMall() {
    const [form, setForm] = useState({
        email: "",
        plastic: "",
        electronic: "",
        books: "",
        papers: "",
        glass: "",
        clothes: ""
    });
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("");

    const [suggewstions, setSuggestions] = useState([]);

    const getSuggestions = async (req, res) => {
        try {
            const { status, data: result } = await api.get(`/search/customer-mail?query=${form.email}`);
            if (status === 200) {
                console.log(result?.list);

                setSuggestions(result?.list);
            }
        } catch (err) {
            console.log(err);

        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Submit logic here
        setTimeout(() => setLoading(false), 1000);
    };

    useEffect(() => {
        if (form.email.length < 2) {
            setSuggestions([]);
            return;
        }

        const timeoutId = setTimeout(
            getSuggestions(),
            100
        );

        return () => clearTimeout(timeoutId);
    }, [form.email]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-200">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-10">
                <h1 className="text-3xl font-bold text-center mb-12 text-blue-700">Submit your recyclables in-mall</h1>
                <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                        <label htmlFor="email" className="md:w-fit font-semibold text-gray-700 text-lg">Email:</label>
                        <div className='flex w-full flex-col'>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="flex-1 px-6 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
                                value={form.email}
                                onChange={handleChange}
                                autoComplete='off'
                                required
                            />
                            {suggewstions.length > 0 && (
                                <ul className="absolute z-10 mt-15 w-auto bg-white border border-blue-200 rounded-lg shadow-lg max-h-56 overflow-y-auto">
                                    {suggewstions.map((suggestion, ind) => (
                                        <li
                                            key={ind}
                                            className="px-4 py-2 hover:bg-blue-50 cursor-pointer transition"
                                            onClick={() => {
                                                setForm((prev) => ({ ...prev, email: suggestion.email }));
                                                setSuggestions([]);
                                            }}
                                        >
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-blue-700">{suggestion.name}</span>
                                                <span className="text-gray-600 text-sm">{suggestion.email}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        <div>
                            <label htmlFor="plastic" className="block font-semibold text-gray-700 mb-2 text-lg">Plastic (in Kgs):</label>
                            <input
                                type="number"
                                step="0.01"
                                name="plastic"
                                id="plastic"
                                className="w-full px-6 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
                                value={form.plastic}
                                onChange={handleChange}
                                min="0"
                            />
                        </div>
                        <div>
                            <label htmlFor="electronic" className="block font-semibold text-gray-700 mb-2 text-lg">Electronic (in Kgs):</label>
                            <input
                                type="number"
                                step="0.01"
                                name="electronic"
                                id="electronic"
                                className="w-full px-6 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
                                value={form.electronic}
                                onChange={handleChange}
                                min="0"
                            />
                        </div>
                        <div>
                            <label htmlFor="books" className="block font-semibold text-gray-700 mb-2 text-lg">Books (in Kgs):</label>
                            <input
                                type="number"
                                step="0.01"
                                name="books"
                                id="books"
                                className="w-full px-6 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
                                value={form.books}
                                onChange={handleChange}
                                min="0"
                            />
                        </div>
                        <div>
                            <label htmlFor="papers" className="block font-semibold text-gray-700 mb-2 text-lg">Papers (in Kgs):</label>
                            <input
                                type="number"
                                step="0.01"
                                name="papers"
                                id="papers"
                                className="w-full px-6 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
                                value={form.papers}
                                onChange={handleChange}
                                min="0"
                            />
                        </div>
                        <div>
                            <label htmlFor="glass" className="block font-semibold text-gray-700 mb-2 text-lg">Glass (in Kgs):</label>
                            <input
                                type="number"
                                step="0.01"
                                name="glass"
                                id="glass"
                                className="w-full px-6 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
                                value={form.glass}
                                onChange={handleChange}
                                min="0"
                            />
                        </div>
                        <div>
                            <label htmlFor="clothes" className="block font-semibold text-gray-700 mb-2 text-lg">Clothes (in Kgs):</label>
                            <input
                                type="number"
                                step="0.01"
                                name="clothes"
                                id="clothes"
                                className="w-full px-6 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
                                value={form.clothes}
                                onChange={handleChange}
                                min="0"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center mt-8">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-48 py-3 rounded-lg font-semibold text-white text-lg transition
                                ${loading
                                    ? "bg-blue-300 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                                }`}
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default InMall;