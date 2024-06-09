import { useState, FormEvent } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { EnterInput } from "../components/enterInput";
import { EnterButton } from "../components/enterButton";
import { ChangeButton } from "../components/changeButton";

const app = axios.create({
  baseURL: "https://chat-fqe8.onrender.com",
});

export function Enter() {
  const [isActive, setIsActive] = useState(false);
  //   const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const sregistrar = () => {
    setIsActive(true);
  };

  const slogar = () => {
    setIsActive(false);
  };

  const logar = async (event: FormEvent) => {
    event.preventDefault();

    if (email && password) {
      try {
        const { token } = await app
          .post("/user/login", { email, password })
          .then((result) => result.data);

        localStorage.setItem("token", token);
      } catch (error: any) {
        console.log(error);
        alert("Erro ao logar: " + error.response.data.msg);
      }
    }
  };

  const register = async (event: FormEvent) => {
    event.preventDefault();
    if (password === password2) {
      try {
        const { token } = await app
          .post("/user/register", { name, email, password })
          .then((result) => result.data);
        localStorage.setItem("token", token);
      } catch (error: any) {
        alert("Erro ao registrar: " + error.response.data.msg);
      }
    } else {
      alert("As senhas precisam ser iguais!");
    }
  };

  const containerClasses = isActive ? "container active" : "container";

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <div className={containerClasses} id="container">
        <div className="form-container sign-up">
          <form id="registrar" onSubmit={register}>
            <h1>CRIE SUA CONTA</h1>
            <EnterInput
              type="text"
              placeholder="Nome:"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <EnterInput
              type="email"
              placeholder="Email:"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <EnterInput
              type="password"
              placeholder="Senha:"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <EnterInput
              type="password"
              placeholder="Repita sua senha:"
              onChange={(e) => {
                setPassword2(e.target.value);
              }}
            />
            <EnterButton value="REGISTRE-SE" />
          </form>
        </div>

        <div className="form-container sign-in">
          <form id="logar" onSubmit={logar}>
            <h1>LOGIN</h1>
            <EnterInput
              type="email"
              placeholder="Email:"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <EnterInput
              type="password"
              placeholder="Senha:"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <EnterButton value="LOGIN" />
          </form>
        </div>

        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>BEM VINDO DE VOLTA</h1>
              <ChangeButton id="register" onClick={slogar} value="LOGAR" />
            </div>
            <div className="toggle-panel toggle-right">
              <h1>BEM VINDO</h1>
              <ChangeButton
                id="register"
                onClick={sregistrar}
                value="REGISTRE-SE"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
