import { BASE_URL, USER_SELECT_FIELDS } from "@/modules/users/constants/api";
import type { UsersResponse } from "@/modules/users/types/users";

export async function getUsers(
  page: number = 1,
  limit: number = 30,
  search: string = ""
): Promise<UsersResponse> {
  const skip = (page - 1) * limit;

  let initialUrl = `${BASE_URL}/users`;
  const selectFields = USER_SELECT_FIELDS.join(",");
  const queryParams = `limit=${limit}&skip=${skip}&select=${selectFields}`;

  if (search.trim() !== "") {
    initialUrl += `/search?q=${encodeURIComponent(search)}&${queryParams}`;
  } else {
    initialUrl += `?${queryParams}`;
  }

  const res = await fetch(initialUrl);

  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }

  const data = await res.json();
  return data;
}
