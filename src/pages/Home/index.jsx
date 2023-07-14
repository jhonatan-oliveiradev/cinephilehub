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

			const formattedMovies = response.data.results
				.slice(0, 10)
				.map((movie) => ({
					...movie,
					formattedReleaseDate: new Date(movie.release_date).toLocaleDateString(
						"pt-BR",
						{
							day: "2-digit",
							month: "long",
							year: "numeric"
						}
					)
				}));

			setMovies(formattedMovies);
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
							<div className={styles["movie-release-date"]}>
								<p>Lançamento:</p> <span>{movie.formattedReleaseDate}</span>
							</div>
							<img
								src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
								alt={movie.title}
							/>
							<Link to={`/movie/${movie.id}`}>Detalhes</Link>
						</article>
					);
				})}
			</div>
		</div>
	);
}
