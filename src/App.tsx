import "./App.css";
import Home from "./components/Home/Home";
import { CustomerContextProvider } from "./Context/CustomerContext";

const App: React.FC = () => {
  return (
    <CustomerContextProvider>
      <Home />
    </CustomerContextProvider>
  );
};

export default App;
