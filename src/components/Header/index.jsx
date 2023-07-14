import { Link } from "react-router-dom";

import "./header.module.scss";

export default function Header() {
	return (
		<header>
			<Link to="/" className="logo">
				Primeflix
			</Link>
			<Link to="/movie/:id" className="favorites">
				Meus filmes
			</Link>
		</header>
	);
}
