import { IUser } from "@/types";

export function saveUserToStorage({
  user,
  token,
}: {
  user: IUser;
  token: string;
}) {
  localStorage.setItem("csm-user", JSON.stringify({ user, token }));
}

export function getUserFromStorage() {
  const user = localStorage.getItem("csm-user");
  return user ? JSON.parse(user) : null;
}

export function removeUserFromStorage() {
  localStorage.removeItem("csm-user");
}
