type Props = {
  name?: string | null;
};

export function AssignedUser({ name }: Props) {
  return (
    <div className="flex items-center space-x-2">
      <span className="truncate">{name?.split(" ").at(0)}</span>
    </div>
  );
}
