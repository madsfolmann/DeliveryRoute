import "./App.css";
import { Map } from "./components/Map/Map";
import { PlanRoute } from "./components/PlanRoute/PlanRoute";

const App: React.FC = () => {
  return (
    <div className="w-screen h-screen flex">
      <div className="w-[60%] m-5 rounded-3xl overflow-hidden shadow-2xl">
        <Map />
      </div>
      <div className="w-[40%] p-3 flex-row justify-center items-center">
        <PlanRoute />
      </div>
    </div>
  );
};

export default App;
