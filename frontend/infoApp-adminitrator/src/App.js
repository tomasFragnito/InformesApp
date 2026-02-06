import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { Report } from "./components/Report";
import { Navbar } from "./components/Navbar";


function App() {

  return (
    <div className="App">
      <header className="App-header" >
      <Navbar />


      <Report/>

      </header>
    </div>
  );
}

export default App;
