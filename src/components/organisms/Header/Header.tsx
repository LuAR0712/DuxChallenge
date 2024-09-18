import React from "react";
import styles from "../Header/Header.module.css";
import { Button } from "primereact/button";

interface HeaderProps {
  modalAddUser?: () => void;
}

const Header = ({ modalAddUser }: HeaderProps) => {
  return (
    <div className={styles.headerContainer}>
      <h2>Usuarios</h2>
      <Button
        label="Nuevo usuario"
        icon="pi pi-plus"
        onClick={modalAddUser}
        className={styles.buttonModal}
        size="small"
      />
    </div>
  );
};

export default Header;
