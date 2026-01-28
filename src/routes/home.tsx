import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function Home() {
  const navigate = useNavigate();
  // logOut: firebase signOut 메서드로 로그아웃.
  const logOut = () => {
    auth.signOut();
    navigate("/login");
  };
  return (
    <h1>
      <button onClick={logOut}>Log Out</button>
    </h1>
  );
}
