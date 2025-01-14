import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/api';

const Dashboard = () => {
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(true);
    const [transactions, setTransactions] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        fetchWalletData();
    }, []);

    const fetchWalletData = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('/wallet', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setBalance(data.balance);
            setTransactions(data.Transactions || []);
            setUser(data.user); // Assuming the API returns user info
        } catch (error) {
            alert(error.response?.data?.message || 'Error fetching wallet data');
        } finally {
            setLoading(false);
        }
    };

    const handleTransaction = async (type) => {
        if (!amount || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        try {
            setLoading(true);
            const { data } = await axios.post('/wallet/transaction', {
                type,
                amount: parseFloat(amount),
                description: `${type} transaction`
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setBalance(data.wallet.balance);
            setAmount('');
            fetchWalletData();
        } catch (error) {
            alert(error.response?.data?.message || 'Transaction failed');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                {user && (
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-2">
                            <span className="text-sm font-bold text-gray-700">{user.email.charAt(0).toUpperCase()}</span>
                        </div>
                        <p>Welcome, {user.email}</p>
                    </div>
                )}
                <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded">Logout</button>
            </div>
            <p>Balance: ${balance.toFixed(2)}</p>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter Amount"
                className="p-2 border rounded my-2"
            />
            <button
                onClick={() => handleTransaction('deposit')}
                className="px-4 py-2 bg-blue-500 text-white rounded mx-2"
            >
                Deposit
            </button>
            <button
                onClick={() => handleTransaction('withdraw')}
                className="px-4 py-2 bg-red-500 text-white rounded"
            >
                Withdraw
            </button>
            <div className="mt-4">
                <h2 className="text-xl font-bold">Recent Transactions</h2>
                <div className="mt-2">
                    {transactions.map((transaction) => (
                        <div key={transaction.id} className="border p-2 my-1 rounded">
                            <span className={`font-bold ${transaction.type === 'deposit' ? 'text-green-500' : 'text-red-500'}`}>
                                {transaction.type}: ${transaction.amount}
                            </span>
                            <span className="ml-2 text-gray-600">Balance: ${transaction.balance}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
