import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const onOrderHandler = () => {
    setShowForm(true);
  };

  const onOrderSubmit = async (userData) => {
    setIsSubmitting(true);
    const response = await fetch(
      "https://react-udemy-cd4ee-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          cartItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const modalActions = (
    <div className={styles["actions"]}>
      <button className={styles["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={styles["button"]} onClick={onOrderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={styles["total"]}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showForm && (
        <Checkout onConfirm={onOrderSubmit} onCancel={props.onClose} />
      )}
      {!showForm && modalActions}
    </>
  );

  const isSubmittingModalContent = <p>Sending Order Data...</p>;

  const didSubmitModalContent = (
    <>
      <p>Successfully Sent the Order!</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
