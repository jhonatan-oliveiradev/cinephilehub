import { Link } from "react-router-dom";
import styles from "./error.module.css";

export default function Error() {
	return (
		<div className={styles["not-found"]}>
			<h1>404</h1>
			<h2>Página não encontrada...</h2>
			<Link to="/">Veja todos os filmes!</Link>
		</div>
	);
}
