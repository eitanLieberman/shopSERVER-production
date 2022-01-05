import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/cartRedux";
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
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75% " })}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
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

const Success = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  dispatch(clearCart());
  const handleClick = (e) => {
    dispatch(clearCart());
  };

  return (
    <Container>
      <Wrapper>
        <Title>Thank you for you purchase!</Title>

        <Link to="/" onClick={handleClick}>
          <Button onClick={handleClick}>BACK TO SHOP</Button>
        </Link>
      </Wrapper>
    </Container>
  );
};

export default Success;
