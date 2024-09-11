import { useNavigate } from "react-router-dom";
import useLogout from "./hooks/useLogout";

const Home = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("무언가 잘못됐군요...");
    }
  };

  return (
    <div>
      <h1>홈 페이지</h1>
      <br />
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default Home;
