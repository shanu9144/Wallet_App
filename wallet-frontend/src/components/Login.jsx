import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../services/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }
            const { data } = await axios.post('/auth/login', { email, password });
            if (data.token) {
                localStorage.setItem('token', data.token);
                navigate('/dashboard');
            }
        } catch (err) {
            const message = err.response?.data?.message || 'Login failed!';
            alert(message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-400 to-pink-500">
            <form onSubmit={handleSubmit} className="p-8 bg-white rounded shadow-lg w-96">
                <h1 className="text-3xl font-bold mb-4">Login</h1>
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
                <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded mt-4">
                    Login
                </button>
                <p className="mt-4 text-center">
                    Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
