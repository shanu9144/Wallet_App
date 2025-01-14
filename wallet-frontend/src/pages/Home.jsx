import { Link } from 'react-router-dom';

const Home = () => (
    <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold">Welcome to Wallet App</h1>
        <div className="mt-4 space-x-4">
            <Link to="/login" className="px-4 py-2 bg-blue-500 text-white rounded">
                Login
            </Link>
            <Link to="/register" className="px-4 py-2 bg-green-500 text-white rounded">
                Register
            </Link>
        </div>
    </div>
);

export default Home;
