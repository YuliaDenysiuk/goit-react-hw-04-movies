import './App.css';
import {Routes, Route} from 'react-router-dom';
import Container from './components/Container/Container';
import AppBar from './components/AppBar/AppBar';
import HomePageView from './views/HomePageView/HomePageView';
import MoviesPageView from './views/MoviesPageView/MoviesPageView';
import MovieDetailsPageView from './views/MovieDetailsPageView/MovieDetailsPageView';
import NotFoundView from './views/NotFoundView/NotFoundView';

function App() {
  return (
    <Container>
      <AppBar />

      <Routes>
        <Route path="/" exact="true" element={<HomePageView />} />
        <Route path="/movies" exact="true" element={<MoviesPageView />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPageView />} />
        <Route element={<NotFoundView />} />
      </Routes>
      
    </Container>
  );
}

export default App;
