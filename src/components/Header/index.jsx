import { Link } from "react-router-dom";

import styles from "./header.module.css";

export default function Header() {
	return (
		<header>
			<Link to="/" className={styles.logo}>
				Primeflix
			</Link>
			<Link to="/movie/:id" className={styles.favorites}>
				Meus filmes
			</Link>
		</header>
	);
}
