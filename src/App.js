import './App.css';
import {lazy, Suspense} from 'react';
import {Switch, Route} from 'react-router-dom';
import Container from './components/Container/Container';
import AppBar from './components/AppBar/AppBar';
import PendingLoader from './components/Loader/Loader';
import NotFound from './components/NotFound/NotFound';

const HomePageView = lazy(() => import('./views/HomePageView/HomePageView.js' /* webpackChunkName: "home-page" */));
const MoviesPageView = lazy(() => import('./views/MoviesPageView/MoviesPageView.js' /* webpackChunkName: "movies-page" */));
const MovieDetailsPageView = lazy(() => import('./views/MovieDetailsPageView/MovieDetailsPageView.js' /* webpackChunkName: "movie-details-page" */));

function App() {
  return (
    <Container>
      <AppBar />

      <Suspense fallback={<PendingLoader />}>
        <Switch>
          <Route path="/" exact>
            <HomePageView />
          </Route>
          
          <Route path="/movies" exact>
            <MoviesPageView />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPageView />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
      
    </Container>
  );
}

export default App;
