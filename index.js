const UserContext = React.createContext(null);
const Link = ReactRouterDOM.Link;
const Route = ReactRouterDOM.Route;
const HashRouter = ReactRouterDOM.HashRouter;
// const {useState} = React;
// sumulate getting products from DataBase
const products = [
  { name: "Apples:", country: "Italy", cost: 3, instock: 10 },
  { name: "Oranges:", country: "Spain", cost: 4, instock: 3 },
  { name: "Beans:", country: "USA", cost: 2, instock: 5 },
  { name: "Cabbage:", country: "USA", cost: 1, instock: 8 },
];
const cartItems = [];

const App = (props) => {
  const [items, setItems] = React.useState(products);
  const [cart, setCart] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  return (
    <HashRouter>
      <button>
        <Link to="/">Products</Link>
      </button>
      <button>
        <Link to="/addtoCart">Add to Cart</Link>
      </button>
      <button>
        <Link to="/editCart">Edit Cart</Link>
      </button>
      <button>
        <Link
          to={{
            pathname: "/showCart",
            data: cart, // your data array of objects
          }}
        >
          Show Cart
        </Link>
      </button>
      <hr/>
      <UserContext.Provider value={{items, setItems, cart, setCart, total, setTotal}}>
        <Route path="/" exact component={Products} />
        <Route path="/addToCart" component={AddToCart} />
        <Route path="/editCart" component={editCart} />
        <Route path="/showCart" component={Cart} />
      </UserContext.Provider>
    </HashRouter>
  );
};


//=========Cart=============
// const Cart = (props) => {
//   const { Card, Accordion, Button } = ReactBootstrap;
//   let data = props.location.data ? props.location.data : products;
//   console.log(`data:${JSON.stringify(data)}`);

//   return <Accordion defaultActiveKey="0">{list}</Accordion>;
// };
// useDataAPI ******************************************
const useDataApi = (initialUrl, initialData) => {
  const { useState, useEffect, useReducer } = React;
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });
  console.log(`useDataApi called`);
  useEffect(() => {
    console.log("useEffect Called");
    let didCancel = false;
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const result = await axios(url);
        console.log("FETCH FROM URl");
        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE" });
        }
      }
    };
    fetchData();
    return () => {
      didCancel = true;
    };
  }, [url]);
  return [state, setUrl];
};
// *****************************************************
// dataFetchReducer ************************************
const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};
// *****************************************************


// ========================================
ReactDOM.render(<App />, document.getElementById("root"));
