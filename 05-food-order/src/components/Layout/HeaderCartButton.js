import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  const [itemAdded, setItemAdded] = useState(false);
  const numberOfCartItems = items.reduce((currNumber, item) => {
    return currNumber + item.amount;
  }, 0);

  let btnClasses = `${styles["button"]} ${itemAdded && styles["bump"]}`;

  useEffect(() => {
    if (items.length === 0) return;

    setItemAdded(true);
    const timer = setTimeout(() => {
      setItemAdded(false);
    }, 300);
    
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={styles["icon"]}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles["badge"]}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
