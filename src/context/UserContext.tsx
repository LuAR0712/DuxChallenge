import { createContext, useContext, useState } from "react";
import { createUser, updateUser, User } from "@/services/userService";

//Contexto con el cual proveeremos a toda la aplicacion de los estados mas importantes

interface UserContextProps {
  users: User[]; //Lista de usuarios
  setUsers: (user: User[]) => void; //Funcion para actualizar lista de usuarios
  filteredUsers: User[]; //Lista de usuarios al momento de aplicar el filtro
  loading: boolean; //Estado de carga cuando se hace una peticion al servicio
  setLoading: (loading: boolean) => void; //Funcion para actualizar el estado de carga
  setFilteredUsers: (user: User[]) => void; //Funcion para actualizar la lista de usuarios una vez aplicado el filtro
  selectedUser: User | null; //Usuario seleccionado en la tabla
  setSelectedUser: (user: User | null) => void; //Funcion para actualizar el usuario seleccionado en la tabla
  isModalOpen: boolean; //Estado del modal (abierto o cerrado)
  setIsModalOpen: (open: boolean) => void; //Funcion de actualizacion del estado del modal
  refreshState: boolean; //Estado de carga cuando un valor se modifica
  setRefreshState: (refreshState: boolean) => void; //Funcion de actualizacion del estado refreshSate
  handleSaveUser: (user: User) => Promise<void>; //Ejecuta la funcion handleSave para crear o editar un usuario al momento de confirmar
  openModal: (user?: User) => void; //Funcion para abrir el modal desde cualquier lado de la aplicacion
  closeModal: () => void; //Funcion de cierre de modal
}

//Creacion del contexto con un valor inicial indefinido
const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({
  children,
  initialUsers,
}: {
  children: React.ReactNode;
  initialUsers: User[];
}) => {
  //Estados locales para manejar usuarios, estado de carga, modal, etc.
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(initialUsers);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [refreshState, setRefreshState] = useState<boolean>(false);

  //Funcion que se ejecuta al momento de confirmar la creacion o edicion en el modal dependiendo si existe el usuario o si se va a crear
  const handleSaveUser = async (user: User) => {
    const userWithCorrectType = {
      ...user,
      estado: user.estado as "ACTIVO" | "INACTIVO", //Asegura que el estado sea o ACTIVO o INACTIVO
      id: user.id,
    };

    if (selectedUser) {
      //Si hay un usuario seleccionado, se actualizan los datos del mismo
      const updatedUser = await updateUser(
        selectedUser.id,
        userWithCorrectType
      );
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u))
      );
      setRefreshState(true);
    } else {
      //Si no hay usuario, se crea uno nuevo
      const newUser = await createUser(userWithCorrectType);
      setUsers([...users, newUser]);
      setRefreshState(true);
    }
  };

  //Funcion para abrir el modal y seleccionar el usuario elegido para edicion o creacion si no es desde la tabla que se lo abre
  const openModal = (user?: User) => {
    setSelectedUser(user || null);
    setIsModalOpen(true);
  };

  //Funcion para cerrar el modal y deseleccionar el usuario elegido
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <UserContext.Provider
      //Proveedor del contexto que envuelve a los componentes hijos y les brinda los estados y funciones
      value={{
        users,
        setUsers,
        filteredUsers,
        loading,
        setLoading,
        setFilteredUsers,
        selectedUser,
        setSelectedUser,
        isModalOpen,
        setIsModalOpen,
        handleSaveUser,
        closeModal,
        openModal,
        refreshState,
        setRefreshState,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

//Hook personalizado para usar el contexto de usuario
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext debe ser usado dentro de un UserProvider");
  }
  return context;
};
