import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, register } from "../redux/apiCalls";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://i.pinimg.com/564x/63/e6/7c/63e67c40a5344f682b71c0d2c4e16225.jpg")
      center;
  background-size: cover;
  display: flex;

  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 20px;

  background-color: white;
  ${mobile({ width: "75% " })}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #48d1cc;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const handleClick = async (e) => {
    e.preventDefault();
    await register(dispatch, { username, email, password });
    login(dispatch, { username, email, password });
  };
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>

        <Form>
          <Input placeholder="name"></Input>
          <Input placeholder="last name"></Input>
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          ></Input>
          <Input
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <Input
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          ></Input>

          <Agreement>
            By creating an account, I have read and agreed with the{" "}
            <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleClick} disabled={isFetching} redirect="/">
            CREATE
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
