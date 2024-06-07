import { Route, Routes } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

import HomePage from '../../pages/HomePage';
import MoviesPage from '../../pages/MoviesPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import css from './App.module.css';

export default function App() {
  return (
    <div className={css.container}>
      <h1>Search movies!</h1>

      <Navigation />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
