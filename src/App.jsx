import "./App.css";
import Navbar from "./components/Navbar";
import Card from "./components/Card";

function App() {


  return (
    <>
      <div className="w-screen h-screen bg-violet-50">
        <Navbar />
        <Card />
      </div>
    </>
  );
}

export default App;
