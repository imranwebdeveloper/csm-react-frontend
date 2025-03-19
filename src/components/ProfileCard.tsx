"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getProfile } from "@/api/authApi";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import type { ApiSingleResponse, IUser } from "@/types";
import EditProfileDialog from "./EditProfileDialog";

const ProfileCard = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const { data, error, isPending } = useQuery<ApiSingleResponse<IUser>>({
    queryKey: ["profile", user?.token],
    queryFn: () => getProfile(user?.token || ""),
    enabled: !!user?.token,
  });

  if (isPending) return <p>Loading profile...</p>;
  if (error) return <p className="text-red-500">Error loading profile</p>;

  const authUser = data?.data;

  if (!authUser) return <p>No profile data available</p>;

  return (
    <div className="">
      <Dialog open={open} onOpenChange={setOpen}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Profile Information</CardTitle>

            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </DialogTrigger>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <p className="font-medium">Username:</p>
              <p className="col-span-2">{authUser.username}</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <p className="font-medium">Email:</p>
              <p className="col-span-2">{authUser.email}</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <p className="font-medium">Joined:</p>
              <p className="col-span-2">
                {new Date(authUser.createdAt || "").toLocaleDateString()}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <p className="font-medium">Bio:</p>
              <p className="col-span-2">{"No bio set"}</p>
            </div>
          </CardContent>
        </Card>
        <EditProfileDialog profile={authUser} onClose={() => setOpen(false)} />
      </Dialog>
    </div>
  );
};

export default ProfileCard;
