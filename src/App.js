import './App.css';
import {Switch, Route} from 'react-router-dom';
import Container from './components/Container/Container';
import AppBar from './components/AppBar/AppBar';
import HomePageView from './views/HomePageView/HomePageView';
import MoviesPageView from './views/MoviesPageView/MoviesPageView';
import MovieDetailsPageView from './views/MovieDetailsPageView/MovieDetailsPageView';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <Container>
      <AppBar />

      <Switch>
        <Route path="/" exact><
          HomePageView />
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
      
    </Container>
  );
}

export default App;
