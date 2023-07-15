import { Link } from "react-router-dom";
import styles from "./favorites.module.css";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import toast from "react-hot-toast";

export default function Favorites() {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		const myList = localStorage.getItem("@cinephilehub");
		const savedMovies = JSON.parse(myList) || [];

		setMovies(savedMovies);
	}, []);

	function removeFromMyList(id) {
		let filterMovies = movies.filter((item) => {
			return item.id !== id;
		});

		setMovies(filterMovies);
		localStorage.setItem("@cinephilehub", JSON.stringify(filterMovies));
		toast.success(`Filme removido da sua lista!`, {
			style: {
				borderRadius: 10,
				backgroundColor: "#18181b",
				color: "#f3f3f3",
				border: `solid #181818`
			},
			iconTheme: {
				primary: "#00e4a0",
				secondary: "#f3f3f3"
			}
		});
	}

	return (
		<div className={styles["my-movies"]}>
			<h1>Minha lista</h1>

			{movies.length === 0 && (
				<span>Você não possui nenhum filme salvo :( </span>
			)}

			<ul>
				{movies.map((item) => {
					return (
						<li key={item.id}>
							<span>{item.title}</span>

							<div className={styles.buttons}>
								<Link to={`/movie/${item.id}`}>
									<TbListDetails size={20} color="#00e4a0" />
								</Link>
								<button onClick={() => removeFromMyList(item.id)}>
									<FaTrashAlt size={20} fill="#e91e63" />
								</button>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
