import "./App.css";
import Navbar from "./components/Navbar";
import CurrencyDisplay from "./components/CurrencyDisplay";
function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <CurrencyDisplay></CurrencyDisplay>
    </div>
  );
}

export default App;
