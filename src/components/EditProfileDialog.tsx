import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
import { IUser } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateProfile } from "@/api/authApi";
import { useAuth } from "@/hooks/useAuth";

const ProfileSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  // bio: Yup.string().max(500, "Bio must be less than 500 characters"),
});

interface EditProfileDialogProps {
  profile: IUser;
  onClose: () => void;
}

const EditProfileDialog = ({ profile, onClose }: EditProfileDialogProps) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const mutation = useMutation({
    mutationFn: (values: { username: string }) =>
      updateProfile(values, user?.token || ""),
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      onClose();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    },
  });

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogDescription>
          Update your profile information below.
        </DialogDescription>
      </DialogHeader>
      <Formik
        initialValues={{
          username: profile.username || "",
          // bio: profile?.bio || "",
        }}
        validationSchema={ProfileSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          mutation.mutate(values, {
            onSettled: () => setSubmitting(false),
            onSuccess: () => resetForm(),
          });
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Field
                as={Input}
                id="username"
                name="username"
                placeholder="Your username"
                className={
                  errors.username && touched.username ? "border-red-500" : ""
                }
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-sm text-red-500"
              />
            </div>

            {/* <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Field
                as={Textarea}
                id="bio"
                name="bio"
                placeholder="Tell us about yourself"
                className={errors.bio && touched.bio ? "border-red-500" : ""}
              />
              <ErrorMessage
                name="bio"
                component="div"
                className="text-sm text-red-500"
              />
            </div> */}

            <DialogFooter>
              <Button
                type="submit"
                disabled={mutation.isPending || isSubmitting}
              >
                {mutation.isPending || isSubmitting
                  ? "Saving..."
                  : "Save Changes"}
              </Button>
            </DialogFooter>
          </Form>
        )}
      </Formik>
    </DialogContent>
  );
};

export default EditProfileDialog;
