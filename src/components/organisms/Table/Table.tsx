import UserModal from "@/components/molecules/UserModals/UserModal";
import { useUserContext } from "@/context/UserContext";
import { deleteUser } from "@/services/userService";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import React from "react";
import styles from "../Table/Table.module.css";
import { Card } from "primereact/card";
import { ProgressSpinner } from "primereact/progressspinner";

const Table = () => {
  //Estados y funciones provenientes del contexto
  const {
    filteredUsers,
    loading,
    isModalOpen,
    handleSaveUser,
    selectedUser,
    openModal,
    closeModal,
    setUsers,
    users,
    setRefreshState,
  } = useUserContext();

  //Funcion de borrado de usuario al momento de la confirmacion enviando los datos al servicio
  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
      setRefreshState(true);
    } catch (error) {
      console.log("Error eliminando el usuario", error);
    }
  };

  //Configuracion del componente ConfirmDialog para la eliminacion de usuario
  const confirmDeleteUser = (userId: string) => {
    confirmDialog({
      message: "¿Estás seguro de que deseas eliminar este usuario?",
      header: "Confirmar eliminación",
      icon: "pi pi-exclamation-triangle",
      accept: () => handleDeleteUser(userId),
      reject: () => console.log("Se cancelo la eliminacion"),
      headerClassName: styles.confirmDialogHeader,
      contentClassName: styles.confirmDialogContent,
      acceptClassName: styles.confirmDialogAccept,
      rejectClassName: styles.confirmDialogReject,
      rejectLabel: "Cancelar",
      acceptLabel: "Confirmar",
      acceptIcon: "pi pi-check",
      rejectIcon: "pi pi-times",
    });
  };

  return (
    <>
      {loading ? (
        <div className={styles.loadingView}>
          <ProgressSpinner
            style={{ width: "50px", height: "50px", color: "#0763E7" }}
            strokeWidth="8"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
          <label>Cargando Datos...</label>
        </div>
      ) : (
        <Card className={styles.tableContainer}>
          <DataTable
            value={filteredUsers}
            stripedRows
            size="large"
            className={styles.tableStyles}
            removableSort
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
          >
            <Column field="id" header="Id" sortable />
            <Column
              field="usuario"
              header="Usuario"
              headerClassName={styles.tableHeader}
              bodyClassName={styles.tableBody}
              sortable
            />
            <Column field="estado" header="Estado" sortable />
            <Column field="sector" header="Sector" sortable />
            <Column
              body={(rowData) => (
                <>
                  <Button
                    icon="pi pi-pencil"
                    onClick={() => openModal(rowData)}
                    className={styles.editButton}
                    tooltip="Editar usuario"
                    tooltipOptions={{
                      position: "bottom",
                      mouseTrack: true,
                      mouseTrackTop: 15,
                    }}
                  />
                  <Button
                    icon="pi pi-trash"
                    onClick={() => confirmDeleteUser(rowData.id)}
                    style={{ marginLeft: "15px", padding: "3px" }}
                    className={styles.deleteButton}
                    tooltip="Borrar usuario"
                    tooltipOptions={{
                      position: "bottom",
                      mouseTrack: true,
                      mouseTrackTop: 15,
                    }}
                  />
                </>
              )}
            />
          </DataTable>
        </Card>
      )}
      <UserModal
        visible={isModalOpen}
        onHide={closeModal}
        onSave={handleSaveUser}
        user={selectedUser || undefined}
      />
      <ConfirmDialog className={styles.confirmDialog} />
    </>
  );
};

export default Table;
