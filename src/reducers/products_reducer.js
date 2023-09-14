// Impor jenis tindakan dari file tindakan
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

// Tentukan fungsi pengurangan produk
const products_reducer = (state, action) => {
  // Mengatasi pembukaan sidebar
  if (action.type === SIDEBAR_OPEN) {
    return { ...state, isSidebarOpen: true }
  }

  // Mengatasi penutupan sidebar
  if (action.type === SIDEBAR_CLOSE) {
    return { ...state, isSidebarOpen: false }
  }

  // Mengatasi awal proses pengambilan produk
  if (action.type === GET_PRODUCTS_BEGIN) {
    return { ...state, products_loading: true }
  }

  // Mengatasi pengambilan produk yang berhasil
  if (action.type === GET_PRODUCTS_SUCCESS) {
    // Saring produk unggulan dari payload
    const featured_products = action.payload.filter(
      (product) => product.featured === true
    )
    return {
      ...state,
      products_loading: false,
      products: action.payload,
      featured_products,
    }
  }

  // Mengatasi kesalahan selama pengambilan produk
  if (action.type === GET_PRODUCTS_ERROR) {
    return { ...state, products_loading: false, products_error: true }
  }

  // Mengatasi awal pengambilan produk tunggal
  if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
    return {
      ...state,
      single_product_loading: true,
      single_product_error: false,
    }
  }

  // Mengatasi pengambilan produk tunggal yang berhasil
  if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
    return {
      ...state,
      single_product_loading: false,
      single_product: action.payload,
    }
  }

  // Mengatasi kesalahan selama pengambilan produk tunggal
  if (action.type === GET_SINGLE_PRODUCT_ERROR) {
    return {
      ...state,
      single_product_loading: false,
      single_product_error: true,
    }
  }

  // Jika tidak ada jenis tindakan yang cocok, lempar kesalahan
  throw new Error(`Tidak Ada Pencocokan "${action.type}" - jenis tindakan`)
}

// Ekspor fungsi pengurangan produk
export default products_reducer
