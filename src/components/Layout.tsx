import { ReactNode } from "react";
import styles from "../styles/layout.module.css";
import MainHeader from "./organisms/MainHader/MainHeader";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <MainHeader />
      <div className={styles.layoutContainer}>
        <main>{children}</main>
        <footer className={styles.footerContainer}>
          <p>© 2024 Dux Software</p>
        </footer>
      </div>
    </>
  );
};

export default Layout;
