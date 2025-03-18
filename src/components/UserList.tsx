import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { fetchUsers } from "@/api/authApi";
import { ApiMultiResponse, IUser } from "@/types";
import Spinner from "./ui/spiner";

export default function UserList() {
  const { data, isLoading, error } = useQuery<ApiMultiResponse<IUser[]>>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading) {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users?.map((user) => (
        <Card key={user.id} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={user.image || ""} alt={user.username} />
                <AvatarFallback>
                  {user.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{user.username}</h3>
                <p className="text-sm text-muted-foreground">
                  {user.contents.length || 0} items
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50 p-6">
            <Button asChild className="w-full">
              <Link to={`/users/${user.id}`}>View Details</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
