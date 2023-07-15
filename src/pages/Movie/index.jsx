/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaPlus, FaPlay, FaMoneyBillWave } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { TbPigMoney } from "react-icons/tb";
import { PiRocketLaunch } from "react-icons/pi";

import api from "../../services/api";
import Loader from "../../components/Loader";
import styles from "./movie.module.css";
import { toast } from "react-hot-toast";

export default function Movie() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [movie, setMovie] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadMovie() {
			try {
				const response = await api.get(`/movie/${id}`, {
					params: {
						api_key: import.meta.env.VITE_API_KEY,
						language: "pt-BR",
						append_to_response: "credits" // Adiciona os créditos do filme à resposta
					}
				});

				setMovie(response.data);
				setLoading(false);
			} catch (error) {
				console.log("Filme não encontrado", error);
				toast.error(`Filme não encontrado! \n Retornando à Página inicial`, {
					style: {
						borderRadius: 10,
						backgroundColor: "#18181b",
						color: "#f3f3f3",
						border: `solid #181818`
					}
				});
				navigate("/", { replace: true });
			}
		}

		loadMovie();

		return () => {
			console.log("Componente foi desmontado");
		};
	}, [id, navigate]);

	if (loading) {
		return <Loader />;
	}

	return (
		<div className={styles["movie-info"]}>
			<h1>{movie.title}</h1>
			<img
				src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
				alt={movie.title}
			/>
			<h3>Sinopse:</h3>
			<span>{movie.overview}</span>

			<div className={styles["middle-info"]}>
				<div>
					<h4>Gênero:</h4>
					<span className={styles.genre}>
						{movie.genres !== undefined &&
							movie.genres
								.map((genre) => genre.name)
								.slice(0, 3)
								.join(", ")}
					</span>
				</div>

				<div>
					<h4>Elenco:</h4>
					<span className={styles.cast}>
						{movie.credits && movie.credits.cast
							? movie.credits.cast
									.slice(0, 2)
									.map((cast) => cast.name)
									.join(", ")
							: "Não informado"}
					</span>
				</div>

				<div>
					<h4>Direção:</h4>
					<span className={styles.director}>
						{movie.credits && movie.credits.crew
							? movie.credits.crew
									.filter((person) => person.job === "Director")
									.slice(0, 1)
									.map((director) => director.name)
									.join(", ")
							: "Não informado"}
					</span>
				</div>
			</div>

			<div className={styles["inner-info"]}>
				{movie.vote_average !== undefined && (
					<div className={styles.rating}>
						<strong>
							<AiFillStar size={20} />
						</strong>
						<div>
							<span
								style={{
									color: movie.vote_average >= 7 ? "#00e4a0" : "#e91e63"
								}}
							>
								{movie.vote_average.toFixed(1)}
							</span>{" "}
							<span>/ 10</span>
						</div>
					</div>
				)}

				{movie.release_date !== undefined && (
					<div className={styles["release-date"]}>
						<strong>
							<PiRocketLaunch size={20} />
						</strong>
						<span>
							{new Date(movie.release_date).toLocaleDateString("pt-BR", {
								day: "2-digit",
								month: "long",
								year: "numeric"
							})}
						</span>
					</div>
				)}

				<div className={styles.budget}>
					<strong>
						<TbPigMoney size={20} />
					</strong>
					<span>
						{movie.budget !== 0
							? new Intl.NumberFormat("pt-BR", {
									style: "currency",
									currency: "BRL"
							  }).format(movie.budget)
							: "Não informado"}
					</span>
				</div>

				<div className={styles.profit}>
					<strong>
						<FaMoneyBillWave size={20} />
					</strong>
					<span
						style={{
							color: movie.revenue > movie.budget ? "#00e4a0" : "#e91e63"
						}}
					>
						{movie.revenue !== 0
							? new Intl.NumberFormat("pt-BR", {
									style: "currency",
									currency: "BRL"
							  }).format(movie.revenue)
							: "Não informado"}
					</span>
				</div>
			</div>

			<div className={styles["area-buttons"]}>
				<button>
					Minha lista
					<FaPlus size={18} />
				</button>
				<button>
					<a
						href={`https://youtube.com/results?search_query=${movie.title} Trailer`}
						target="_blank"
						rel="noreferrer"
					>
						Trailer
						<FaPlay size={18} />
					</a>
				</button>
			</div>
		</div>
	);
}
