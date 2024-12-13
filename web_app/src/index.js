import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import { RegistrationProvider } from "./context/registrationContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <RegistrationProvider>
    <App />
  </RegistrationProvider>,
);