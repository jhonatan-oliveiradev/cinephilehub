import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Movie from "./pages/Movie";

function RoutesApp() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/movie/:id" element={<Movie />} />
			</Routes>
		</BrowserRouter>
	);
}

export default RoutesApp;
