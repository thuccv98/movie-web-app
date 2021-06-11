import './App.css';
import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Trending from "./Pages/Trending/Trending.js";
import Movies from "./Pages/Movies/Movies.js";
import Series from "./Pages/Series/Series.js";
import Search from "./Pages/Search/Search.js";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <container>
          <Switch>
            <Route path='/' component={Trending} exact/>
            <Route path='/movies' component={Movies} />
            <Route path='/series' component={Series} />
            <Route path='/search' component={Search} />
          </Switch>
        </container>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
