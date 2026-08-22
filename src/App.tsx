import "./App.css";
import HeaderBar from "./components/layout/HeaderBar/HeaderBar.jsx";
import FormInputs from "./components/layout/FormInput/FormInputs.jsx";

function App() {
  return (
    <>
      <HeaderBar />
      <div className="mainContent">
        <FormInputs />
      </div>
    </>
  );
}

export default App;
