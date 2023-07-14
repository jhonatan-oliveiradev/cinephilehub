import { useEffect, useState } from "react";
import api from "../../services/api";

import styles from "./home.module.css";
import { Link } from "react-router-dom";

export default function Home() {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadMovies() {
			const response = await api.get("movie/now_playing", {
				params: {
					api_key: import.meta.env.VITE_API_KEY,
					language: "pt-BR",
					page: 1
				}
			});

			setMovies(response.data.results.slice(0, 10));
		}

		loadMovies();
		setLoading(false);
	}, [movies]);

	if (loading) {
		return (
			<div className={styles.loading}>
				<h1>Carregando filmes...</h1>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles["movie-list"]}>
				{movies.map((movie) => {
					return (
						<article key={movie.id}>
							<strong>{movie.title}</strong>
							<img
								src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
								alt={movie.title}
							/>
							<Link to={`/filme/${movie.id}`}>Detalhes</Link>
						</article>
					);
				})}
			</div>
		</div>
	);
}
