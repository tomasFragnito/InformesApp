import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { Lobby } from "./components/Lobby";
import { Navbar } from "./components/Navbar";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        
      <Navbar />
      <Lobby />

      </header>
    </div>
  );
}

export default App;
