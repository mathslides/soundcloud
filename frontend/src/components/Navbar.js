import Navigation from "./Navbar/Navigation";
// import Auth from "./Navbar/Auth";
import { useRouteMatch } from "react-router-dom";
import Search from "./Navbar/Search";
import Auth from "./Navbar/Auth";
import { Link } from "react-router-dom"
import { Icon } from "../Icons";
function Navbar() {

	const searchRoute = useRouteMatch('/search')

	return (
		<nav className="h-[3.75rem] flex items-center justify-between px-8 relative z-10">
			<Navigation />

			{searchRoute && <Search />}

			{/*<Switch>*/}
			{/*	<Route exact path="/">*/}
			{/*		Home*/}
			{/*	</Route>*/}
			{/*	<Route path="/search">*/}
			{/*		Search*/}
			{/*	</Route>*/}
			{/*	<Route path="/collection">*/}
			{/*		Collection*/}
			{/*	</Route>*/}
			{/*</Switch>*/}
			{/* <Link to="/upload" className="text-white hover:text-gray-300 font-semibold mr-4 ml-auto">Add Song</Link> */}
			<Link to="/upload" className="flex items-center text-white hover:text-gray-300 text-sm mr-4 ml-auto">
				<Icon size={20} name="plus" className="mr-1 text-sm" /> {/* Plus icon */}
				Add Song
			</Link>
			<Auth />
		</nav>
	)
}

export default Navbar
