import "./App.css";
import Main from "./components/Main/Main";
import { CustomerContextProvider } from "./Context/CustomerContext";

function App() {
  return (
    <CustomerContextProvider>
      <Main />
    </CustomerContextProvider>
  );
}

export default App;
