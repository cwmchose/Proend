import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "./App.css";

import Table from "./LazyTable";
import About from "./About";
import Layout from "./Layout";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<About />} />
            <Route path="table" element={<Table />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
