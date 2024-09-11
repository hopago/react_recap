import Home from "./Home";
import Layout from "./Layout";
import Login from "./Login";
import UserPage from "./UserPage";
import NotFound from "./NotFound";
import RequireAuth from "./RequireAuth";
import PersistAuth from "./components/PersistAuth";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/** PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />

        {/** PROTECTED */}
        <Route element={<PersistAuth />}>
          <Route element={<RequireAuth />}>
            <Route path="user" element={<UserPage />} />
          </Route>
        </Route>

        {/** 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
