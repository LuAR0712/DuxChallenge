import UserModal from "@/components/molecules/UserModals/UserModal";
import { useUserContext } from "@/context/UserContext";
import { deleteUser } from "@/services/userService";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import React from "react";

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
    users
  } = useUserContext();

  const handleDeleteUser = async (userId: number) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.log("Error eliminando el usuario", error);
    }
  };

  const confirmDeleteUser = (userId: number) => {
    confirmDialog({
      message: "¿Estás seguro de que deseas eliminar este usuario?",
      header: "Confirmar eliminación",
      icon: "pi pi-exclamation-triangle",
      accept: () => handleDeleteUser(userId),
      reject: () => console.log("Se cancelo la eliminacion"),
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
          style={{ width: "93%", marginLeft: "30px", marginBottom: "20px" }}
        >
          <Column field="usuario" header="Usuario" />
          <Column field="estado" header="Estado" />
          <Column field="sector" header="Sector" />
          <Column
            body={(rowData) => (
              <>
                <Button
                  label="Editar"
                  icon="pi pi-pencil"
                  onClick={() => openModal(rowData)}
                  style={{ padding: "3px" }}
                  rounded
                />
                <Button
                  label="Borrar"
                  icon="pi pi-trash"
                  onClick={() => confirmDeleteUser(rowData.id)}
                  style={{ marginLeft: "15px", padding: "3px" }}
                  rounded
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
      <ConfirmDialog />
    </>
  );
};

export default Table;
