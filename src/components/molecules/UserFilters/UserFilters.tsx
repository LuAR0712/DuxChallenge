import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import styles from "../UserFilters/filters.module.css";
import { getUsers } from "@/services/userService";
import { useUserContext } from "@/context/UserContext";

interface UserFiltersProps {
  setFilterIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserFilters = ({ setFilterIn }: UserFiltersProps) => {
  const { setLoading, setFilteredUsers } = useUserContext();
  const [search, setSearch] = useState<string>("");
  const [estado, setEstado] = useState<"ACTIVO" | "INACTIVO" | "">("");

  const estados = [
    { label: "ACTIVO", value: "ACTIVO" },
    { label: "INACTIVO", value: "INACTIVO" },
  ];

  const handleClear = () => {
    setSearch("");
    setEstado("");
    setFilterIn(true);
  };

  const handleFilter = async ({
    search,
    estado,
  }: {
    search: string;
    estado: "ACTIVO" | "INACTIVO" | "";
  }) => {
    try {
      setLoading(true);
      const filtered = await getUsers({
        limit: 20,
        page: 1,
        search: search || "",
        estado: estado || "",
      });
      setFilteredUsers(filtered);
      setLoading(false);
    } catch (error) {
      console.log("Error aplicando filtros", error);
      setLoading(false);
    }
  };

  const handleApplyFilter = () => {
    handleFilter({ search, estado });
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.inputContainer}>
        <span className={styles.iconInput}>
          <i className="pi pi-search"></i>
        </span>
        <InputText
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar"
          className={styles.inputText}
        />
      </div>
      <div className={styles.dropdownContainer}>
        <span className={styles.iconInput}>
          <i className="pi pi-search"></i>
        </span>
        <Dropdown
          value={estado}
          options={estados}
          onChange={(e) => setEstado(e.value)}
          placeholder="Filtrar por estado"
          className={styles.dropdown}
        />
      </div>
      <div>
        <Button
          icon="pi pi-filter"
          onClick={handleApplyFilter}
          label="Aplicar Filtros"
          className={styles.buttonFilter}
        />
        <Button
          icon="pi pi-trash"
          onClick={handleClear}
          className={styles.buttonClear}
          tooltip="Borrar filtros"
          tooltipOptions={{
            position: "bottom",
            mouseTrack: true,
            mouseTrackTop: 15,
          }}
        />
      </div>
    </div>
  );
};

export default UserFilters;
