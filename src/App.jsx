import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";
import "./App.css";

import Table from "./Table/Table";
// import Table from "./Table";
import Findings from "./Findings/Findings";
import Validation from "./Validation/Validation";
import Contact from "./Contact/Contact";
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
            <Route path="findings" element={<Findings />} />
            <Route path="validation" element={<Validation />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
