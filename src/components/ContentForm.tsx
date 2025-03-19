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
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { IContent } from "@/types";
import { createContent, updateContent } from "@/api/contentApi";
import { useState } from "react";
import { toast } from "react-toastify";

const ContentSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must be less than 100 characters")
    .required("Title is required"),
  description: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters")
    .required("Description is required"),
  youtubeUrl: Yup.string()
    .matches(
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/,
      "Please enter a valid YouTube URL"
    )
    .required("YouTube URL is required"),
});

interface AddContentDialogProps {
  onClose: () => void;
  formType: "add" | "edit";
  content?: IContent | null;
}

export default function ContentForm({
  onClose,
  formType,
  content,
}: AddContentDialogProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const addMutation = useMutation({
    mutationFn: async (contentData: Partial<IContent>) =>
      createContent(contentData, user?.token || ""),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] });
      onClose();
      toast.success("Content added successfully");
    },
    onError: () => {
      setErrorMsg("Failed to add content. Please try again.");
      toast.error("Failed to add content. Please try again.");
    },
  });
  const upDateMutation = useMutation({
    mutationFn: async (contentData: Partial<IContent>) =>
      updateContent(contentData, content?.id || "", user?.token || ""),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] });
      onClose();
      toast.success("Content Update successfully");
    },
    onError: () => {
      setErrorMsg("Failed to Update content. Please try again.");
      toast.error("Failed to update content. Please try again.");
    },
  });

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Add New Content</DialogTitle>
        <DialogDescription>
          Create new content to share with your audience.
        </DialogDescription>
      </DialogHeader>

      {errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>}

      <Formik
        initialValues={{
          title: content?.title || "",
          description: content?.description || "",
          youtubeUrl: content?.youtubeUrl || "",
        }}
        validationSchema={ContentSchema}
        onSubmit={(values, { resetForm }) => {
          setErrorMsg(null);
          if (formType === "add") {
            addMutation.mutate(values, {
              onSuccess: () => resetForm(),
            });
          } else {
            upDateMutation.mutate(values, {
              onSuccess: () => resetForm(),
            });
          }
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Field
                as={Input}
                id="title"
                name="title"
                placeholder="Enter content title"
                className={
                  errors.title && touched.title ? "border-red-500" : ""
                }
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-sm text-red-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Field
                as={Textarea}
                id="description"
                name="description"
                placeholder="Enter content description"
                className={
                  errors.description && touched.description
                    ? "border-red-500"
                    : ""
                }
                rows={4}
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-sm text-red-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="youtubeUrl">YouTube URL</Label>
              <Field
                as={Input}
                id="youtubeUrl"
                name="youtubeUrl"
                placeholder="https://www.youtube.com/watch?v=..."
                className={
                  errors.youtubeUrl && touched.youtubeUrl
                    ? "border-red-500"
                    : ""
                }
              />
              <ErrorMessage
                name="youtubeUrl"
                component="div"
                className="text-sm text-red-500"
              />
            </div>

            <DialogFooter className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting || addMutation.isPending}
              >
                {addMutation.isPending ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </Form>
        )}
      </Formik>
    </DialogContent>
  );
}
