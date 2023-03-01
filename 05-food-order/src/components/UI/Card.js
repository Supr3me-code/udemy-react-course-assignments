import styles from "./Card.modules.css";

const Card = (props) => {
  return <div className={styles["card"]}>{props.children}</div>;
};

export default Card;
