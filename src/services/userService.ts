//URL base de la API a consultar y constante de sector provisto previamente
const API_URL = "https://staging.duxsoftware.com.ar/api/personal";
const SECTOR = 4000;

//Interfaz que define la estructura del usuario utilizada a lo largo de la aplicacion
export interface User {
  id: string;
  usuario: string;
  estado: "ACTIVO" | "INACTIVO" | "";
  sector: number;
}

//Interfaz de parametros de busqueda de usuarios
interface FetchUserParams {
  limit?: number;
  page?: number;
  search?: string;
  estado?: "ACTIVO" | "INACTIVO" | "";
}

//Funcion que obtiene los datos/usuarios de la API
export const getUsers = async ({
  limit = 50,
  page = 1,
  search = "",
  estado = "",
}: FetchUserParams = {}): Promise<User[]> => {
  try {
    //Construccion de la URL con los parametros de busqueda y filtros
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

//Funcion que crea un nuevo usuario en la API
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

//Funcion que actualiza los datos de un usuario en la API
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

//Funcion que elimina un usuario de la API
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
