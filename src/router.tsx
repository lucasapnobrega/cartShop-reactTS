import { createBrowserRouter } from "react-router-dom";
import App from './App'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Admin from "./pages/Admin/Admin";
import PurchaseCompleted from "./pages/PurchaseCompleted/PurchaseCompleted";
import WrapperProviders from "./providers/WrapperProviders";
import Edit from "./pages/Admin/Edit/Edit";


const router = createBrowserRouter([
  { 
    path: "/", 
    element: <App />, 
    children: [
      {index: true, element: <Home />},
      {path: 'cart', element: <Cart />},
      {path: 'purchaseCompleted', element: <PurchaseCompleted />}
    ]
  },
  {
    path: '/admin', 
    element: <WrapperProviders><Admin /></WrapperProviders>
  },
  {
    path: 'admin/edit/:id', 
    element: <WrapperProviders><Edit /></WrapperProviders>
  }
])

export default router