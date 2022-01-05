import { useLocation } from "react-router";
import { getUsers, addProduct, getOrders } from "../redux/apiCalls";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect } from "react";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/cartRedux";
import { useState } from "react";
import { Category } from "@material-ui/icons";
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
  display: flex 
 flex-direction:column
  
  ${mobile({ width: "75% " })};
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Button = styled.button`
  width: 45%;
  border: none;
  padding: 5px 5px;
  background-color: #48d1cc;
  color: white;
  cursor: pointer;
display:flex

  margin-bottom: 5px;
  flex-direction:column
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  margin: 20px;
  ${mobile({ margin: "0px 15px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;
const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const AdminPanel = () => {
  const user = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();
  const [action, setAction] = useState("");
  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState();
  const [sizes, setSizes] = useState([]);
  const [color, setColor] = useState([]);
  const handleFilters = (e) => {
    const value = e.target.value;
    setAction(value);
  };

  const handleClickGet = async (e) => {
    e.preventDefault();
    await getUsers(dispatch);
  };
  const handleClickGetOrders = async (e) => {
    e.preventDefault();
    await getOrders(dispatch);
  };
  const handleClickAddProduct = async (e) => {
    e.preventDefault();
    try {
      await addProduct(dispatch, {
        title: title,
        img: imgUrl,
        desc: description,
        categories: category === "" ? "Clothing" : category,
        price: price,
        size: sizes,
        color,
      });
    } catch (err) {}
    alert(title + " has been added, go to shop to check it out");
  };
  return (
    <Container>
      <Wrapper>
        <Title>Welcome admin, choose an action </Title>
        <Filter>
          <Select name="action" onChange={handleFilters}>
            <Option>choose action</Option>
            <Option>get all users</Option>
            <Option>get all orders</Option>
            <Option>add product</Option>
          </Select>
        </Filter>
        {action === "get all users" && (
          <Form>
            <Button onClick={handleClickGet}>GET ALL USERS</Button>
          </Form>
        )}
        {action === "get all orders" && (
          <Form>
            <Button onClick={handleClickGetOrders}>GET ALL ORDERS</Button>
          </Form>
        )}
        {action === "add product" && (
          <Form>
            <Input
              placeholder="product name"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></Input>
            <Input
              placeholder="price in $"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            ></Input>
            <Input
              placeholder="Image Url"
              onChange={(e) => {
                setImgUrl(e.target.value);
              }}
            ></Input>
            <Input
              placeholder="description "
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></Input>
            <div>
              <Input
                placeholder="size "
                id="size"
                onChange={async (e) => {
                  await setSize(e.target.value);
                }}
              ></Input>
              <button
                onClick={async (e) => {
                  e.preventDefault();

                  await setSizes([
                    ...sizes,
                    document.getElementById("size").value,
                  ]);
                  alert(
                    document.getElementById("size").value +
                      " has been added,you cana add another size"
                  );
                }}
              >
                size
              </button>
            </div>
            <div>
              <Input
                placeholder=" choose Color "
                type="color"
                name="color"
                onChange={(e) => {
                  setColor([...color, e.target.value]);
                  alert(
                    e.target.value + " added,click again to add another color"
                  );
                }}
              />{" "}
              <label>color</label>
            </div>
            <Filter>
              <Select
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <Option disabled>choose category</Option>
                <Option value="Clothing">Clothing</Option>
                <Option value="Tech">Tech</Option>
                <Option value="Home Gym">Home Gym</Option>
              </Select>
            </Filter>
            <Button onClick={handleClickAddProduct}>ADD</Button>
          </Form>
        )}
        <Link to="/">Back to shop</Link>
      </Wrapper>
    </Container>
  );
};

export default AdminPanel;
