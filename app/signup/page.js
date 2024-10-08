'use client';

import { useState } from 'react';
import axios from 'axios';

export default function SignupPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        // Vérification que les champs ne sont pas vides
        if (formData.name.trim() === '' || formData.email.trim() === '' || formData.password.trim() === '') {
            setMessage('Tous les champs sont requis.');
            setIsError(true);
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        // Ici le call API vers /api/auth/signup
        try {
            const response = await axios.post('/api/auth/signup', formData);

            console.log('Inscription réussie: ', response.data);
            setMessage('Inscription réussie');
            setIsError(false);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                // Si l'API renvoie un message d'erreur
                setMessage(err.response.data.message);
            } else {
                // Message générique en cas d'erreur
                setMessage("Erreur lors de l'inscription. Veuillez réessayer.");
            }
            setIsError(true);
            console.log("Erreur lors de l'inscription", err);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-400">Inscription</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="form-group">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Nom
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 w-full text-gray-700 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 w-full text-gray-700 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 w-full text-gray-700 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        S&apos;inscrire
                    </button>
                </form>

                {message && (
                    <div
                        className={`mt-4 p-4 rounded-lg text-center ${
                            isError
                                ? 'bg-red-100 text-red-700 border border-red-400'
                                : 'bg-green-100 text-green-700 border border-green-400'
                        }`}
                        role="alert"
                    >
                        {isError ? '⚠️ ' : '🎉 '}
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}
