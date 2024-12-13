// import './App.css'
import { useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import BeforeLoginRouter from "./BeforeLoginRouter";
import AfterLoginRouter from "./AfterLoginRouter";
import { AppProvider } from "./context/AppContext";

const App: React.FC = () => {
  const { userToken, errorCode, logoutData } = useSelector(
    (state: any) => state.rootReducer.auth
  );

  return (
    <AppProvider>
      <Router>
        {userToken ? <AfterLoginRouter /> : <BeforeLoginRouter />}
      </Router>
    </AppProvider>
  );
};

export default App;
