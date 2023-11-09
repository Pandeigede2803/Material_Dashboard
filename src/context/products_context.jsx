// Import axios for HTTP requests
import axios from 'axios';

// Import React, useContext, useEffect, and useReducer from 'react'
import React, { useContext, useEffect, useReducer } from 'react';

// Import reducer from the 'reducer' file
import reducer from '../reducers/products_reducer';

// Import necessary action types from the 'actions' file
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
  POST_PRODUCT_BEGIN,
  POST_PRODUCT_SUCCESS,
  POST_PRODUCT_ERROR,
} from '../components/actions';

// Initialize the initial state
const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
};

// Create a ProductsContext using React's createContext
const ProductsContext = React.createContext();

// Define the URL endpoints for products and single product
export const products_url = 'http://localhost:8000/admin/addproduct';
export const single_product_url = 'https://63cdf885d2e8c29a9bced636.mockapi.io/api/v1/products/';
export const post_products_url = 'http://localhost:8000/admin/addproduct';
// Create the ProductsProvider component to provide context
export const ProductsProvider = ({ children }) => {
  // Use useReducer to manage state with the imported reducer
  const [state, dispatch] = useReducer(reducer, initialState);

  // Function to open the sidebar
  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };

  // Function to close the sidebar
  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };

  // Function to fetch product data with asynchronous request
  const fetchProducts = async (products_url) => {
    // Dispatch GET_PRODUCTS_BEGIN action to indicate the start of the product request
    dispatch({ type: GET_PRODUCTS_BEGIN });

    try {
      // Send a GET request to the products URL
      const response = await axios.get(products_url);
      // Get product data from the response
      const products = response.data;
      console.log(products);
      // Dispatch GET_PRODUCTS_SUCCESS action with the successfully fetched products as payload
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
    } catch (error) {
      console.log(error);
      // Dispatch GET_PRODUCTS_ERROR action if there is an error in the request
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  };

  // Function to fetch a single product with asynchronous request
  const fetchSingleProduct = async (single_product_url) => {
    // Dispatch GET_SINGLE_PRODUCT_BEGIN action to indicate the start of the single product request
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });

    try {
      // Send a GET request to the single product URL
      const response = await axios.get(single_product_url);
      // Get the single product data from the response
      const singleProduct = response.data;
      // Dispatch GET_SINGLE_PRODUCT_SUCCESS action with the successfully fetched single product as payload
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct });
    } catch (error) {
      // Dispatch GET_SINGLE_PRODUCT_ERROR action if there is an error in the request
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
    }
  };

  // Function to post a product with asynchronous request
  const postProduct = async (productData) => {
    // Dispatch POST_PRODUCT_BEGIN action to indicate the start of the product posting
    dispatch({ type: POST_PRODUCT_BEGIN });

    try {
      // Send a POST request to the products URL with the product data
      const response = await axios.post(post_products_url, productData);
      // Get the newly created product data from the response
      const newProduct = response.data;
      // Dispatch POST_PRODUCT_SUCCESS action with the successfully created product as payload
      dispatch({ type: POST_PRODUCT_SUCCESS, payload: newProduct });
    } catch (error) {
      // Dispatch POST_PRODUCT_ERROR action if there is an error in the request
      dispatch({ type: POST_PRODUCT_ERROR });
    }
  };

  // Use useEffect to run fetchProducts only when the component is mounted
  useEffect(() => {
    fetchProducts(products_url);
  }, []);

  // Wrap child components in ProductsContext and provide the necessary functions and state
  return (
    <ProductsContext.Provider
      value={{
        ...state,
        openSidebar,
        closeSidebar,
        fetchSingleProduct,
        postProduct, // Include the postProduct function in the context value
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

// Export the useProductsContext function to use the ProductsContext
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
