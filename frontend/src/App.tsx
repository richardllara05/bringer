import Router from "./pages";
import { CookiesProvider } from "react-cookie";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
    return (
        <div className="App">
            <CookiesProvider>
                <Router />
            </CookiesProvider>
        </div>
    );
};

export default App;
