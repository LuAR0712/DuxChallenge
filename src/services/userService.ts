const API_URL = "https://staging.duxsoftware.com.ar/api/personal";
const SECTOR = 4000;

export interface User {
  id: string;
  usuario: string;
  estado: "ACTIVO" | "INACTIVO" | "";
  sector: number;
}

interface FetchUserParams {
  limit?: number;
  page?: number;
  search?: string;
  estado?: "ACTIVO" | "INACTIVO" | "";
}

export const getUsers = async ({
  limit = 0,
  page = 1,
  search = "",
  estado = "",
}: FetchUserParams = {}): Promise<User[]> => {
  try {
    let url = `${API_URL}?sector=${SECTOR}&_limit=${limit}&_page=${page}`;
    if (search) {
      url += `&usuario_like=${search}`;
    }
    if (estado) {
      url += `&estado=${estado}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error obteniendo los usuarios");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error obteniendo usuarios", error);
    return [];
  }
};

export const createUser = async (user: User): Promise<User> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...user, sector: SECTOR }),
    });
    if (!response.ok) {
      throw new Error("Error obteniendo los usuarios");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error obteniendo usuarios", error);
    throw error;
  }
};

export const updateUser = async (
  id: string,
  user: Partial<User>
): Promise<User> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Error actualizando el usuario");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error actualizando el usuario", error);
    throw error;
  }
};

export const deleteUser = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error eliminando el usuario");
    }
  } catch (error) {
    console.log("Error eliminando el usuario", error);
    throw error;
  }
};
