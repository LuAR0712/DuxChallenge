import { createContext, useContext, useState } from "react";
import { createUser, updateUser, User } from "@/services/userService";

interface UserContextProps {
  users: User[];
  setUsers: (user: User[]) => void;
  filteredUsers: User[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setFilteredUsers: (user: User[]) => void;
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  refreshState: boolean;
  setRefreshState: (refreshState: boolean) => void;
  handleSaveUser: (user: Omit<User, "id">) => Promise<void>;
  openModal: (user?: User) => void;
  closeModal: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({
  children,
  initialUsers,
}: {
  children: React.ReactNode;
  initialUsers: User[];
}) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(initialUsers);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [refreshState, setRefreshState] = useState<boolean>(false)

  const handleSaveUser = async (user: Omit<User, "id">) => {
    const userWithCorrectType = {
      ...user,
      estado: user.estado as "ACTIVO" | "INACTIVO",
    };

    if (selectedUser) {
      const updatedUser = await updateUser(
        Number(selectedUser.id),
        userWithCorrectType
      );
      setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    } else {
      const newUser = await createUser(userWithCorrectType);
      setUsers([...users, newUser]);
    }
  };

  const openModal = (user?: User) => {
    setSelectedUser(user || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <UserContext.Provider
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
        setRefreshState
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext debe ser usado dentro de un UserProvider");
  }
  return context;
};
