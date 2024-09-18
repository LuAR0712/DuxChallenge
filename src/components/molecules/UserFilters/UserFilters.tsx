import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import styles from "../UserFilters/filters.module.css";

interface UserFiltersProps {
  onFilter: (filters: {
    search: string;
    estado: "ACTIVO" | "INACTIVO" | "";
  }) => void;
  setFilterIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserFilters = ({ onFilter, setFilterIn }: UserFiltersProps) => {
  const [search, setSearch] = useState<string>("");
  const [estado, setEstado] = useState<"ACTIVO" | "INACTIVO" | "">("");

  const estados = [
    { label: "ACTIVO", value: "ACTIVO" },
    { label: "INACTIVO", value: "INACTIVO" },
  ];

  const handleFilter = () => {
    onFilter({ search, estado });
  };

  const handleClear = () => {
    setSearch("");
    setEstado("");
    setFilterIn(true);
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
          onClick={handleFilter}
          label="Aplicar Filtros"
          className={styles.buttonFilter}
        />
        <Button
          icon="pi pi-trash"
          onClick={handleClear}
          className={styles.buttonClear}
          tooltip="Borrar filtros"
          tooltipOptions={{ position: 'bottom', mouseTrack: true, mouseTrackTop: 15 }}
        />
      </div>
    </div>
  );
};

export default UserFilters;
