
import React, { Suspense } from 'react';
import Navbar from '../components/Navbar';
import BottomBar from '../components/BottomBar';
import Sidebar from '../components/Sidebar';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

function ProtectedLayout({ children }) {

	const isAuthenticated = useSelector((state) => !!state.session.user);
	if (!isAuthenticated) return <Redirect to="/" />

	return (
		<div className="flex h-screen">
			<Sidebar />
			<div className="flex flex-col w-full" style={{ marginLeft: 250 }}>
				<Navbar />
				<main className="overflow-auto mt-8 mb-6">
					{children}
				</main>
				<div className="w-full fixed bottom-0 left-0 bg-black text-white " style={{ paddingLeft: 120 }}>
					<BottomBar />
				</div>
			</div>
		</div>
	);
}

export default ProtectedLayout;
