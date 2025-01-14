import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../services/api';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/auth/register', { email, password });
            alert('Registration successful!');
            navigate('/login');
        } catch (err) {
            const message = err.response?.data?.message || 'Registration failed!';
            setError(message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-400 to-blue-500">
            <form onSubmit={handleSubmit} className="p-8 bg-white rounded shadow-lg w-96">
                <h1 className="text-3xl font-bold mb-4">Register</h1>
                {error && <p className="text-red-500">{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full my-2 p-2 border rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full my-2 p-2 border rounded"
                />
                <button type="submit" className="w-full px-4 py-2 bg-green-500 text-white rounded mt-4">
                    Register
                </button>
                <p className="mt-4 text-center">
                    Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
