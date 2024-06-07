import React from 'react';

const LoaderSpinner = () => {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black">
            <div className="w-16 h-16 border-4 border-solid rounded-full animate-spin-slow border-blue-200 border-t-blue-500"></div>
        </div>
    );
};

export default LoaderSpinner;

