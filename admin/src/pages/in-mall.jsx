import React, { useState } from 'react'

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

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-200">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-10">
                <h1 className="text-3xl font-bold text-center mb-12 text-blue-700">Submit your recyclables in-mall</h1>
                <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                        <label htmlFor="email" className="md:w-fit font-semibold text-gray-700 text-lg">Email:</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="flex-1 px-6 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* 2 Columns Grid for Inputs */}
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