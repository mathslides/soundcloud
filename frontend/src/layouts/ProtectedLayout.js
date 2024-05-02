import React from 'react';
import Navbar from '../components/Navbar';
import BottomBar from '../components/BottomBar';
import Sidebar from '../components/Sidebar';
import Views from "../components";

function ProtectedLayout() {
	return (
		<div className="flex h-screen">
			<Sidebar />
			<div className="flex flex-col w-full">
				<Navbar />
				<main className="overflow-auto">
					<Views />
				</main>
				<div className="w-full fixed bottom-0 left-0 bg-black text-white">
					<BottomBar />
				</div>
			</div>
		</div>
	);
}

export default ProtectedLayout;
