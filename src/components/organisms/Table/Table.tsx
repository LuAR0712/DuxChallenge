import UserModal from "@/components/molecules/UserModals/UserModal";
import { useUserContext } from "@/context/UserContext";
import { deleteUser } from "@/services/userService";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import React from "react";
import styles from "../Table/Table.module.css";

const Table = () => {
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

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
      setRefreshState(true);
    } catch (error) {
      console.log("Error eliminando el usuario", error);
    }
  };

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
        <p>Cargando usuarios...</p>
      ) : (
        <DataTable
          value={filteredUsers}
          stripedRows
          size="large"
          className={styles.tableStyles}
          removableSort
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25]}
        >
          <Column
            field="usuario"
            header="Usuario"
            headerClassName={styles.tableHeader}
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
