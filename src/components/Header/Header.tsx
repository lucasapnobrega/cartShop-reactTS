import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useCartItemsContext } from "../../contexts/CartItemsContext";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

import styles from './Header.module.css'
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

function Header() {
  const { cartItems } = useCartItemsContext()
  const [mobileMenu, setMobileMenu] = useState<boolean>(false)
  const isDesktop = useMediaQuery({ minWidth: 768 })

  const handleClick = () => {
    if(!isDesktop) {
      setMobileMenu(!mobileMenu);
      document.body.style.overflow = mobileMenu ? 'auto' : 'hidden';
    }
  }
  
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.title} title="Ir para Home">
        <h1>CartShop</h1>
      </Link>

      <nav className={`${styles.nav} ${mobileMenu && styles.active}`} onClick={handleClick}>
        <Link to="/" onClick={handleClick}>Catálogo</Link>
        <Link to="/admin" title="Área Administrativa">Admin</Link>
        
        <Link to="/cart" className={styles.cartIcon} title="Ir para o carrinho" onClick={handleClick}>
          {cartItems && cartItems.length > 0 && <span>{cartItems.length}</span>}  
          <FaCartShopping />
        </Link>
      </nav>

      <div
        className={styles.menuBars} 
        onClick={handleClick}
      >
        {mobileMenu ? <IoMdClose /> : <HiOutlineMenuAlt1 />}  
      </div>
    </header>
  )
}

export default Header