import styles from "./Container.module.css";
const Container = ({ children, asdf }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Container;
