import { User } from "@/services/userService";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import styles from "../UserModals/UserModal.module.css";
import { useUserContext } from "@/context/UserContext";

interface UserModalProps {
  visible: boolean;
  onHide: () => void;
  onSave: (user: Omit<User, "id">) => void;
  user?: User;
}

const UserModal = ({ user, visible, onHide, onSave }: UserModalProps) => {
  const { setRefreshState } = useUserContext();
  const [id, setId] = useState<string>("");
  const [usuario, setUsuario] = useState<string>("");
  const [estado, setEstado] = useState<"ACTIVO" | "INACTIVO" | "">("");
  const [sector, setSector] = useState<number>(0);

  useEffect(() => {
    if (user) {
      setId(user.id);
      setUsuario(user.usuario);
      setEstado(user.estado);
      setSector(user.sector);
    } else {
      setId("");
      setUsuario("");
      setEstado("");
      setSector(0);
    }
  }, [user]);

  const handleSave = () => {
    setRefreshState(true);
    onSave({ usuario, estado, sector });
    onHide();
  };

  return (
    <div>
      <Dialog
        visible={visible}
        onHide={onHide}
        className={styles.modalContainer}
        header="Usuario"
        headerStyle={{
          backgroundColor: "#0763E7",
          color: "#FFFFFF",
          padding: "5px 20px",
        }}
      >
        <div className={styles.contentContainer}>
          <div className={styles.inputContainer}>
            <label htmlFor="usuario">Usuario</label>
            <InputText
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className={styles.inputText}
              placeholder="Ingrese el id del usuario"
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="usuario">Usuario</label>
            <InputText
              id="usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className={styles.inputText}
              placeholder="Ingrese el nombre del usuario"
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="estado">Estado</label>
            <Dropdown
              id="estado"
              value={estado}
              options={["ACTIVO", "INACTIVO"]}
              onChange={(e) =>
                setEstado(e.target.value as "ACTIVO" | "INACTIVO")
              }
              className={styles.inputText}
              placeholder="Seleccione un estado para el usuario"
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="sector">Sector</label>
            <Dropdown
              id="sector"
              value={sector}
              options={[4000]}
              onChange={(e) => setSector(e.target.value)}
              className={styles.inputText}
              placeholder="Seleccione un sector para el usuario"
            />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Button
            label="Confirmar"
            icon="pi pi-check"
            onClick={handleSave}
            className={styles.buttonConfirmStyles}
            raised
          />
          <Button
            label="Cancelar"
            icon="pi pi-times"
            outlined
            onClick={onHide}
            className={styles.buttonStyles}
            raised
          />
        </div>
      </Dialog>
    </div>
  );
};

export default UserModal;
