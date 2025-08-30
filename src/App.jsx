import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import HomePage from "./Home/HomePage";
import SignIn from "./SignIn/SignIn";
import Signup from "./Signup/Signup";


function App() {
  return (
    <div className="app-wrapper">
      <Router>
        <Layout>
                  <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
