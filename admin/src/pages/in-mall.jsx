import React, { useState, useEffect } from 'react';
import api from '../libs/apiCalls.js';
import { BiLoaderAlt } from 'react-icons/bi';
import SavingsPop from '../components/savings-pop.jsx';

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
    const [suggestions, setSuggestions] = useState([]);
    const [ showPop, setShowPop ] = useState(false);
    const [ prediction_results, setPrediction_results ] = useState({});

    const getSuggestions = async () => {
        try {
            const { status, data: result } = await api.get(`/search/customer-mail?query=${form.email}`);
            if (status === 200) {
                setSuggestions(result?.list || []);
            }
        } catch (err) {
            console.error(err);
            setSuggestions([]);
        }
    };

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
            const { status, data: prediction } = await api.post("/calculate/co2", form);
            if (status === 201) {
                console.log("Predictions Values", prediction);
                setPrediction_results(prediction);
                setShowPop(true);
            }
        } catch (err) {
            console.log("Prediction error", err);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (form.email.length < 2) {
            setSuggestions([]);
            return;
        }

        const timeoutId = setTimeout(getSuggestions, 300);
        return () => clearTimeout(timeoutId);
    }, [form.email]);

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 p-4">
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 md:p-10">
                    <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">Submit Your Recyclables In-Mall</h1>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="flex flex-col gap-6">
                            <div className="relative">
                                <label htmlFor="email" className="block font-medium text-gray-700 mb-2 text-lg">Email Address</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 text-lg transition"
                                        value={form.email}
                                        onChange={handleChange}
                                        autoComplete="off"
                                        required
                                    />
                                    {suggestions.length > 0 && (
                                        <ul className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                                            {suggestions.map((suggestion, ind) => (
                                                <li
                                                    key={ind}
                                                    className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                                                    onClick={() => {
                                                        setForm((prev) => ({ ...prev, email: suggestion.email }));
                                                        setSuggestions([]);
                                                    }}
                                                >
                                                    <div className="flex flex-col">
                                                        <span className="font-semibold text-blue-800">{suggestion.name}</span>
                                                        <span className="text-gray-600 text-sm">{suggestion.email}</span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { id: "plastic", label: "Plastic (in Kgs)" },
                                { id: "electronic", label: "Electronic (in Kgs)" },
                                { id: "books", label: "Books (in Kgs)" },
                                { id: "papers", label: "Papers (in Kgs)" },
                                { id: "glass", label: "Glass (in Kgs)" },
                                { id: "clothes", label: "Clothes (in Kgs)" }
                            ].map((item) => (
                                <div key={item.id} className="space-y-2">
                                    <label htmlFor={item.id} className="block font-medium text-gray-700 text-lg">
                                        {item.label}
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        name={item.id}
                                        id={item.id}
                                        className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 text-lg transition"
                                        value={form[item.id]}
                                        onChange={handleChange}
                                        min="0"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full md:w-48 py-3 rounded-xl font-semibold text-white text-lg transition-all
                                ${loading
                                        ? "bg-blue-400 cursor-not-allowed"
                                        : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg cursor-pointer"
                                    }`}
                            >
                                {loading ? (
                                    <BiLoaderAlt className='text-2xl text-white animate-spin' />
                                ) : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        {showPop && <SavingsPop open={showPop} onClose={() => setShowPop(false)} co2Saved={Number(prediction_results.prediction.saving).toPrecision(4)} userName={"Team Atlas"}/>}
        </>
    );
}

export default InMall;