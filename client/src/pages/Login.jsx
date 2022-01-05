import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/apiCalls";
import { useSelector } from "react-redux";
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
  width: 55%;
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
  flex-direction: column;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 35%;
  border: none;
  padding: 15px 20px;
  background-color: #48d1cc;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  text-align: center;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  let loginErr = null;
  const handleClick = async (e) => {
    try {
      e.preventDefault();
      login(dispatch, { username, email, password });
    } catch (err) {
      loginErr = err;
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>

        <Form>
          <Input
            placeholder="username/email"
            onChange={(e) => {
              setUsername(e.target.value);
              setEmail(e.target.value);
            }}
          ></Input>
          <Input
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          ></Input>

          <Button onClick={handleClick} disabled={isFetching}>
            LOGIN
          </Button>
          {error && <Error>Something went wrong</Error>}
          <Link>FORGOT USERNAME?</Link>
          <Link>NEW HERE? SING UP!</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
