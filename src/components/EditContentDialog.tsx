"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
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
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { updateContent } from "@/lib/api";

const ContentSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  youtubeUrl: Yup.string()
    .required("YouTube URL is required")
    .matches(
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/,
      "Please enter a valid YouTube URL"
    ),
  isDraft: Yup.boolean(),
});

interface EditContentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content: {
    id: string;
    title: string;
    description: string;
    youtubeUrl: string;
    isDraft?: boolean;
  };
}

export default function EditContentDialog({
  open,
  onOpenChange,
  content,
}: EditContentDialogProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] });
      toast({
        title: "Content updated",
        description: "Your content has been updated successfully",
      });
      onOpenChange(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update content",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (values: any) => {
    mutation.mutate({
      id: content.id,
      ...values,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Content</DialogTitle>
          <DialogDescription>
            Update your content details below.
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={{
            title: content.title,
            description: content.description,
            youtubeUrl: content.youtubeUrl,
            isDraft: content.isDraft || false,
          }}
          validationSchema={ContentSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Field
                  as={Input}
                  id="title"
                  name="title"
                  placeholder="Enter a title"
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
                  placeholder="Enter a description"
                  className={
                    errors.description && touched.description
                      ? "border-red-500"
                      : ""
                  }
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

              <div className="flex items-center space-x-2">
                <Field as={Switch} id="isDraft" name="isDraft" />
                <Label htmlFor="isDraft">Save as draft</Label>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Updating..." : "Update Content"}
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
