import { BASE_URL } from "@/modules/users/constants/api";

export async function getUsers(
  page: number = 1,
  limit: number = 30,
  search: string = ""
) {
  const skip = (page - 1) * limit;

  let initialUrl = `${BASE_URL}/users`;
  const queryParams = `limit=${limit}&skip=${skip}`;

  if (search.trim() !== "") {
    initialUrl += `/search?q=${encodeURIComponent(search)}&${queryParams}`;
  } else {
    initialUrl += `?${queryParams}`;
  }

  const res = await fetch(initialUrl);
  const data = await res.json();
  return data;
}
