import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { fetchUser } from "@/api/authApi";
import { useParams } from "react-router";
import { ApiSingleResponse, IUser } from "@/types";
import Spinner from "@/components/ui/spiner";
import ContentList from "@/components/ContentList";

export default function UserDetails() {
  const params = useParams();
  const userId = params.id;
  const { data, isLoading, error } = useQuery<ApiSingleResponse<IUser>>({
    queryKey: ["User", userId],
    queryFn: () => fetchUser(userId),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Spinner />
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-500">
          Failed to load profile
        </h1>
      </div>
    );
  }

  const profile = data.data;

  return (
    <div className="container max-w-5xl mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profile.image || ""} alt={profile.username} />
              <AvatarFallback className="text-2xl">
                {profile.username.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <h1 className="text-3xl font-bold">{profile.username}</h1>
              </div>
              <p className="text-muted-foreground mt-2">
                {profile?.bio || "No bio provided"}
              </p>
              <div className="mt-4">
                <p className="text-sm">
                  <span className="font-medium">Email:</span> {profile.email}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Member since:</span>{" "}
                  {new Date(profile.createdAt || "").toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <ContentList contents={profile.contents} />
    </div>
  );
}
