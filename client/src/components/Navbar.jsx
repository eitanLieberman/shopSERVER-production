import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { mobile } from "../responsive";
import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logoutUser } from "../redux/apiCalls";
import { logout } from "../redux/userRedux";
import { clearCart } from "../redux/cartRedux";
const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-color: black;
  font-weight: bold;
  cursor: pointer;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 15px;
  ${mobile({ fontSize: "12px", marginLeft: "5px" })}
`;

const Button = styled.button`
  font-size: 14px;
  cursor: pointer;
  margin-left: 0px;
  ${mobile({ fontSize: "12px", marginLeft: "0px" })}
`;

const Navbar = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.cart.quantity);

  const handleClick = async (e) => {
    await dispatch(clearCart());
    logoutUser(dispatch);
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          {user && user.isAdmin && (
            <MenuItem>
              {" "}
              <Link to="/AdminPanel">AdminPanel</Link>
            </MenuItem>
          )}

          {/* <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 18 }} />
          </SearchContainer> */}
        </Left>
        <Center>
          <Logo>
            {" "}
            <NavLink style={{ color: "black", textDecoration: "none" }} to="/">
              S.H.O.P
            </NavLink>
          </Logo>
        </Center>
        <Right>
          {!user && (
            <MenuItem>
              <Link to="/register">Register</Link>
            </MenuItem>
          )}
          {!user && (
            <MenuItem>
              {" "}
              <Link to="/login">Login</Link>
            </MenuItem>
          )}
          {user && (
            <MenuItem>
              {" "}
              <Link to="/" onClick={handleClick}>
                logout
              </Link>
            </MenuItem>
          )}

          {user && (
            <Link to="/cart">
              <MenuItem>
                <Badge badgeContent={quantity} color="primary">
                  <ShoppingCartOutlined />
                </Badge>
              </MenuItem>
            </Link>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
