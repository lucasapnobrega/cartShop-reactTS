import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { CartItemsContextProvider } from "./contexts/CartItemsContext"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"

import 'react-toastify/dist/ReactToastify.css'
import Loader from "./components/Loader/Loader"
import WrapperProviders from "./providers/WrapperProviders"

function App() {
  return (
    <>
      <WrapperProviders>
        <CartItemsContextProvider>
          <Header />

          <Outlet />

          <ToastContainer
            position='top-center'
            autoClose={1250}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
          />

          <Loader />
        </CartItemsContextProvider>
      </WrapperProviders>
      
      <Footer />
    </>
  )
}

export default App
