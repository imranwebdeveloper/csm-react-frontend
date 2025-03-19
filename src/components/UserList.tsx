import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { fetchUsers } from "@/api/authApi";
import { ApiMultiResponse, IUser } from "@/types";
import Spinner from "./ui/spiner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { formatDate } from "@/lib/utils";

export default function UserList() {
  const { data, error, isPending } = useQuery<ApiMultiResponse<IUser[]>>({
    queryKey: ["users"],
    queryFn: fetchUsers,
    refetchOnMount: true,
  });

  if (isPending) {
    return (
      <div className="my-10 flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Failed to load users</div>;
  }
  const users = data?.data || [];

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.image || ""} alt={user.username} />
                    <AvatarFallback>
                      {user.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.username}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <p className="text-sm text-muted-foreground">
                  {user.contents.length || 0} items
                </p>
              </TableCell>
              <TableCell>
                <p className="text-sm text-muted-foreground">
                  {formatDate(user?.createdAt?.toString() || "")}
                </p>
              </TableCell>
              <TableCell className="text-right">
                <Button asChild size="sm">
                  <Link to={`/users/${user.id}`}>View Details</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
