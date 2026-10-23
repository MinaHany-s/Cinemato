import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Series from "./pages/Series";
import Movies from "./pages/Movies";
import MediaContextProvider from "./Contexts/MediaContextProvider";
import MoviesContextProvider from "./Contexts/MoviesContextProvider";
import SeriesContextProvider from "./Contexts/SeriesContextProvider";
import NotFoundPage from "./components/NotFoundPage";
import MediaDetails from "./components/MediaDetails";
import Favorites from "./pages/Favorites";

export default function App() {
  return (
    <BrowserRouter>
      <MediaContextProvider>
        <MoviesContextProvider>
          <SeriesContextProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/series" element={<Series />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/:type/:id" element={<MediaDetails />} />{" "}
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </SeriesContextProvider>
        </MoviesContextProvider>
      </MediaContextProvider>
    </BrowserRouter>
  );
}
