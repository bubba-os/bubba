"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AssignedUser } from "./assigned-user";

type User = {
  id: string;
  name: string;
  email: string;
  image: string;
};

type Props = {
  selectedId?: string;
  isLoading: boolean;
  onSelect: (user?: User) => void;
  users: User[];
};

export function AssignUser({ selectedId, isLoading, onSelect, users }: Props) {
  const [value, setValue] = useState<string>();

  useEffect(() => {
    setValue(selectedId);
  }, [selectedId]);

  return (
    <div className="relative">
      {isLoading ? (
        <div className="h-[36px] border">
          <Skeleton className="absolute left-3 top-[39px] h-[14px] w-[60%]" />
        </div>
      ) : (
        <Select
          value={value}
          onValueChange={(id) => onSelect(users.find((user) => user.id === id))}
        >
          <SelectTrigger id="assign">
            <SelectValue placeholder="Select a user" />
          </SelectTrigger>
          <SelectContent>
            {users?.map((user) => {
              return (
                <SelectItem key={user?.id} value={user?.id ?? ""}>
                  <AssignedUser name={user?.name} />
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
