import { User } from "@/services/userService";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";

interface UserModalProps {
  visible: boolean;
  onHide: () => void;
  onSave: (user: Omit<User, "id">) => void;
  user?: User;
}

const UserModal = ({ user, visible, onHide, onSave }: UserModalProps) => {
  const [usuario, setUsuario] = useState<string>("");
  const [estado, setEstado] = useState<"ACTIVO" | "INACTIVO">("ACTIVO");
  const [sector, setSector] = useState<number>(0);

  useEffect(() => {
    if (user) {
      setUsuario(user.usuario);
      setEstado(user.estado);
      setSector(user.sector);
    } else {
      setUsuario("");
      setEstado("ACTIVO");
      setSector(0);
    }
  }, [user]);

  const handleSave = () => {
    onSave({ usuario, estado, sector });
    onHide();
  };

  return (
    <div style={{padding: '10px', justifyContent: 'center', display: 'flex'}} >
      <Dialog
        visible={visible}
        onHide={onHide}
        style={{
          width: "500px",
          height: "300px",
        }}
      >
        <div className="p-field">
          <label htmlFor="usuario">Usuario</label>
          <InputText
            id="usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>
        <div className="p-field">
          <label htmlFor="estado">Estado</label>
          <Dropdown
            id="estado"
            value={estado}
            options={["ACTIVO", "INACTIVO"]}
            onChange={(e) => setEstado(e.target.value as "ACTIVO" | "INACTIVO")}
          />
        </div>
        <div className="p-field">
          <label htmlFor="sector">Sector</label>
          <InputText
            id="sector"
            value={sector.toString()}
            onChange={(e) => setSector(Number(e.target.value))}
          />
        </div>
        <Button label="Guardar" icon="pi pi-check" onClick={handleSave} />
        <Button label="Cancelar" onClick={onHide} />
      </Dialog>
    </div>
  );
};

export default UserModal;
