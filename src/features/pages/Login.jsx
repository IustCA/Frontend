import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();
  return <button onClick={() => navigate("profile")}>ok!</button>;
}
