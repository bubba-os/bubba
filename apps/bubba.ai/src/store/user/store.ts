import { createContext } from "react";
import { createStore } from "zustand";

type User = {
  id: string;
  organization_id: string;
  name: string;
  image: string;
  locale: string;
  date_format: string;
  timezone: string;
};

export interface UserProps {
  data: User | null;
}

export interface UserState extends UserProps {
  setUser: (user: User) => void;
}

export const createUserStore = (initProps: UserProps) => {
  return createStore<UserState>()((set) => ({
    data: initProps?.data,
    setUser: (user: User) => set({ data: user }),
  }));
};

export type UserStore = ReturnType<typeof createUserStore>;
export const UserContext = createContext<UserStore | null>(null);
