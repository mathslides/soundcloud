import { NavLink } from "react-router-dom";

function Title({ title, more = false }) {
	return (
		<header className="flex items-center justify-between mb-2" >

			<div to={more ?? '#'}>
				<h3 className="text-2xl text-white font-semibold tracking-tight hover:underline">{title}</h3>
			</div>

			{more && (
				<div className={"text-xs text-white hover:underline font-semibold uppercase text-link tracking-wider"} to={"/dashboard"}>
					SEE ALL
				</div>
			)}
		</header>
	)
}

export default Title
