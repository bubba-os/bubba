"use client";

import { SelectItem } from "@bubba/ui/select";
import { Spinner } from "@bubba/ui/spinner";
import { AssignedUser } from "./assigned-user";

interface User {
  id: string;
  image?: string | null;
  name: string | null;
}

interface Props {
  users: User[];
  isLoading: boolean;
  selectedId?: string;
  onSelect: (userId: string) => void;
}

export function SelectUser({ users, isLoading, selectedId, onSelect }: Props) {
  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center py-2">
        <Spinner />
      </div>
    );
  }

  return users.map((user) => (
    <SelectItem
      key={user.id}
      value={user.id}
      className="flex items-center gap-2"
    >
      <AssignedUser avatarUrl={user.image} fullName={user.name} />
    </SelectItem>
  ));
}
