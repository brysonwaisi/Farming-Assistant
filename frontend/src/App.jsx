import Home from './pages/Home'
import Product from './components/Product'
import ProductList from './pages/ProductList'
import Register from './pages/Register'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Success from './pages/Success'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={ <Home />} />
        <Route path="/products/:category" element={ <ProductList />} />
        <Route path="/product/:id" element={ <Product />} />
        <Route path="/success" element={ <Success />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route path="/cart" element={ <Cart />} />
        </Routes>
    </Router>
  )
}

export default App
