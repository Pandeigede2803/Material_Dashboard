// Import axios untuk melakukan permintaan HTTP
import axios from 'axios'

// Impor React, useContext, useEffect, dan useReducer dari 'react'
import React, { useContext, useEffect, useReducer } from 'react'

// Impor reducer dari file 'reducer'
import reducer from '../reducers/products_reducer'

// Impor jenis tindakan yang diperlukan dari file 'actions'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../components/actions'

// Inisialisasi nilai awal state
const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
}

// Buat konteks ProductsContext menggunakan createContext dari React
const ProductsContext = React.createContext()

// Tentukan URL endpoint untuk produk dan produk tunggal
export const products_url = 'https://63cdf885d2e8c29a9bced636.mockapi.io/api/v1/products'
export const single_product_url = 'https://63cdf885d2e8c29a9bced636.mockapi.io/api/v1/products/'

// Buat komponen ProductsProvider untuk menyediakan konteks
export const ProductsProvider = ({ children }) => {
  // Gunakan useReducer untuk mengelola state dengan reducer yang telah diimpor
  const [state, dispatch] = useReducer(reducer, initialState)

  // Fungsi untuk membuka sidebar
  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN })
  }

  // Fungsi untuk menutup sidebar
  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE })
  }

  // Fungsi untuk mengambil data produk dengan permintaan asinkron
  const fetchProducts = async (products_url) => {
    // Membuat tindakan GET_PRODUCTS_BEGIN untuk mengindikasikan awal permintaan produk
    dispatch({ type: GET_PRODUCTS_BEGIN })
    try {
      // Mengirim permintaan GET ke URL produk
      const response = await axios.get(products_url)
      // Mendapatkan data produk dari respons
      const products = response.data
      console.log(products)
      // Mengirim tindakan GET_PRODUCTS_SUCCESS dengan payload produk yang berhasil diambil
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products })
    } catch (error) {
      console.log(error)
      // Mengirim tindakan GET_PRODUCTS_ERROR jika terjadi kesalahan dalam permintaan
      dispatch({ type: GET_PRODUCTS_ERROR })
    }
  }

  // Fungsi untuk mengambil data produk tunggal dengan permintaan asinkron
  const fetchSingleProduct = async (single_product_url) => {
    // Membuat tindakan GET_SINGLE_PRODUCT_BEGIN untuk mengindikasikan awal permintaan produk tunggal
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN })
    try {
      // Mengirim permintaan GET ke URL produk tunggal
      const response = await axios.get(single_product_url)
      // Mendapatkan data produk tunggal dari respons
      const singleProduct = response.data
      // Mengirim tindakan GET_SINGLE_PRODUCT_SUCCESS dengan payload produk tunggal yang berhasil diambil
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct })
    } catch (error) {
      // Mengirim tindakan GET_SINGLE_PRODUCT_ERROR jika terjadi kesalahan dalam permintaan
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR })
    }
  }

  // Menggunakan useEffect untuk menjalankan fetchProducts hanya saat komponen dimuat
  useEffect(() => {
    fetchProducts(products_url)
  }, [])

  // Membungkus komponen anak dalam konteks ProductsContext dan menyediakan fungsi-fungsi dan state yang diperlukan
  return (
    <ProductsContext.Provider
      value={{
        ...state,
        openSidebar,
        closeSidebar,
        fetchSingleProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

// Ekspor fungsi useProductsContext untuk menggunakan konteks ProductsContext
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
