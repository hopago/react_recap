import { Link } from "react-router-dom";
import Users from "./components/Users";

const UserPage = () => {
  return (
    <section>
      <h1>유저 페이지</h1>
      <br />
      <p>유저 리스트를 볼 수 있습니다</p>
      <br />
      <Users />
      <br />
      <div>
        <Link to="/">홈 페이지로 이동</Link>
      </div>
    </section>
  );
};

export default UserPage;
