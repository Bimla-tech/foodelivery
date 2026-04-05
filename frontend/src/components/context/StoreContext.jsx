import axios from "axios";
import { createContext, useEffect, useState } from "react";

// Create context
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState("");

  //const url = "http://localhost:4000"; // Backend URL
  const url = process.env.REACT_APP_API_URL;

fetch(`${url}/api/food`)

  // ---------------- ADD ITEM TO CART ----------------
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (token) {
      try {
        await axios.post(
          url + "/api/cart/add",
          { itemId },
          { headers: { token } }
        );
      } catch (err) {
        console.error("Add to cart API error:", err);
      }
    }
  };

  // ---------------- REMOVE ITEM FROM CART ----------------
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      newCart[itemId] = (newCart[itemId] || 1) - 1;
      if (newCart[itemId] <= 0) delete newCart[itemId];
      return newCart;
    });

    if (token) {
      try {
        await axios.post(
          url + "/api/cart/remove",
          { itemId },
          { headers: { token } }
        );
      } catch (err) {
        console.error("Remove from cart API error:", err);
      }
    }
  };

  // ---------------- GET TOTAL CART AMOUNT ----------------
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        // Convert itemId to number to match MySQL id type
        const itemInfo = food_list.find((product) => product.id === Number(itemId));
        if (itemInfo) totalAmount += itemInfo.price * cartItems[itemId];
      }
    }
    return totalAmount;
  };

  // ---------------- FETCH FOOD LIST ----------------
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      // Ensure id is a number
      const list = response.data.data.map((item) => ({
        ...item,
        id: Number(item.id),
      }));
      setFoodList(list);
    } catch (err) {
      console.error("Fetch food list error:", err);
    }
  };

  // ---------------- LOAD CART FROM BACKEND ----------------
  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        url + "/api/cart/get",
        {},
        { headers: { token } }
      );
      // Ensure keys are strings (state object keys must be string)
      const loadedCart = {};
      for (const key in response.data.data) {
        loadedCart[String(key)] = response.data.data[key];
      }
      setCartItems(loadedCart);
    } catch (err) {
      console.error("Load cart data error:", err);
    }
  };

  // ---------------- INITIAL LOAD ----------------
  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
        await loadCartData(savedToken);
      }
    };
    loadData();
  }, []);

  // ---------------- CONTEXT VALUE ----------------
  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
