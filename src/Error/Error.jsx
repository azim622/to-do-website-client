import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-blue-600">404</h1>
                <h2 className="text-3xl font-semibold mt-4">Oops! Page Not Found</h2>
                <p className="text-gray-600 mt-2">The page you are looking for might have been removed or is temporarily unavailable.</p>
                
                <div className="mt-6">
                    <Link to="/dashboard" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all">
                        Go Back Home
                    </Link>
                </div>
            </div>

           
        </div>
    );
};

export default Error;