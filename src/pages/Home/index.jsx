/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import Loader from "../../components/Loader";
import api from "../../services/api";
import styles from "./home.module.css";

export default function Home() {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredMovies, setFilteredMovies] = useState([]);
	const [page, setPage] = useState(1);
	const [moviesPerPage] = useState(10);

	useEffect(() => {
		async function loadMovies() {
			const response = await api.get("movie/now_playing", {
				params: {
					api_key: import.meta.env.VITE_API_KEY,
					language: "pt-BR",
					page: page
				}
			});

			const formattedMovies = response.data.results.map((movie) => ({
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
			setLoading(false);
		}

		loadMovies();
	}, [page]);

	useEffect(() => {
		const filteredMovies = movies.filter((movie) =>
			movie.title.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredMovies(filteredMovies);
	}, [movies, searchTerm]);

	const handleSearchInputChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleSearch = (event) => {
		event.preventDefault();
		setPage(1);
	};

	const handleLoadMore = () => {
		setPage(page + 1);

		scrollTo(top);
	};

	if (loading) {
		return <Loader />;
	}

	return (
		<div className={styles.container}>
			<div className={styles["search-bar"]}>
				<form onSubmit={handleSearch}>
					<input
						type="text"
						value={searchTerm}
						onChange={handleSearchInputChange}
						placeholder="Pesquisar filmes..."
					/>
					<button type="submit">
						<FaSearch size={20} />
					</button>
				</form>
			</div>
			<div className={styles["movie-list"]}>
				{searchTerm !== ""
					? filteredMovies.map((movie) => (
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
					  ))
					: movies.slice(0, moviesPerPage).map((movie) => (
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
					  ))}
			</div>
			{!searchTerm && movies.length > moviesPerPage && (
				<button className={styles["load-more"]} onClick={handleLoadMore}>
					Carregar Mais
				</button>
			)}
		</div>
	);
}
