import { getUsers, User } from "@/services/userService";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import UserFilters from "@/components/molecules/UserFilters/UserFilters";
import Header from "@/components/organisms/Header/Header";
import { useUserContext } from "@/context/UserContext";
import Table from "@/components/organisms/Table/Table";

interface UserPageProps {
  initialUsers: User[];
}

const UserPage = ({ initialUsers }: UserPageProps) => {
  const {
    setLoading,
    setFilteredUsers,
    setUsers,
    openModal,
    refreshState,
    setRefreshState,
  } = useUserContext();
  const [filterIn, setFilterIn] = useState<boolean>(false);

  useEffect(() => {
    setUsers(initialUsers);
    setFilteredUsers(initialUsers);
    setLoading(false);
  }, [initialUsers]);

  useEffect(() => {
    if (filterIn || refreshState) {
      (async () => {
        setLoading(true);
        const filtered = await getUsers({
          page: 1,
          limit: 50,
        });
        setFilteredUsers(filtered);
        setLoading(false);
        setFilterIn(false);
        setRefreshState(false);
      })();
    }
  }, [filterIn, refreshState]);

  return (
    <div>
      <Header modalAddUser={() => openModal()} />
      <UserFilters setFilterIn={setFilterIn} />
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
