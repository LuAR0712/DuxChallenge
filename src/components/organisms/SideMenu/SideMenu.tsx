import styles from "./sideMenu.module.css";
import React from "react";

const SideMenu = () => {
  return (
    <div className={styles.sideMenuContainer}>
      <div className={styles.iconContainer}>
        <i className="pi pi-fw pi-home"></i>
        <i className="pi pi-fw pi-user"></i>
        <i className="pi pi-fw pi-search"></i>
        <i className="pi pi-fw pi-question"></i>
      </div>
    </div>
  );
};

export default SideMenu;
