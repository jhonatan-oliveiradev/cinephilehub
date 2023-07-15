import { Link } from "react-router-dom";
import styles from "./header.module.css";
import logoImg from "/logo.svg";

export default function Header() {
	return (
		<header>
			<Link to="/" className={styles.logo}>
				<img src={logoImg} alt="Cinephilehub - Para quem ama filmes." />
			</Link>
			<Link to="/movie/:id" className={styles.favorites}>
				Meus filmes
			</Link>
		</header>
	);
}
