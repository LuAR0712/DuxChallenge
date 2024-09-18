import { getUsers } from "@/services/userService";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import UserFilters from "@/components/molecules/UserFilters/UserFilters";
import Header from "@/components/organisms/Header/Header";
import { useUserContext } from "@/context/UserContext";
import Table from "@/components/organisms/Table/Table";

interface User {
  id: number;
  usuario: string;
  estado: "ACTIVO" | "INACTIVO";
  sector: number;
}

interface UserPageProps {
  initialUsers: User[];
}

const UserPage = ({ initialUsers }: UserPageProps) => {
  const { setLoading, setFilteredUsers, setUsers, openModal } =
    useUserContext();
  const [filterIn, setFilterIn] = useState<boolean>(false);

  useEffect(() => {
    setUsers(initialUsers);
    setFilteredUsers(initialUsers);
    setLoading(false);
  }, [initialUsers]);

  useEffect(() => {
    if (filterIn) {
      (async () => {
        setLoading(true);
        const filtered = await getUsers({
          page: 1,
          limit: 20,
        });
        setFilteredUsers(filtered);
        setLoading(false);
        setFilterIn(false);
      })();
    }
  }, [filterIn]);

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

  return (
    <div>
      <Header modalAddUser={() => openModal()} />
      <UserFilters onFilter={handleFilter} setFilterIn={setFilterIn} />
      <Table />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const users = await getUsers();

  return {
    props: { initialUsers: users },
  };
};

export default UserPage;
