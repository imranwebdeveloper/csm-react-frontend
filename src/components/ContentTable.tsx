import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteContent, getContents } from "@/api/contentApi";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Edit2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { formatDate, truncateText } from "@/lib/utils";
import { ApiMultiResponse, IContent } from "@/types";
import { toast } from "react-toastify";
import Spinner from "./ui/spiner";
import ContentForm from "./ContentForm";
import { Link } from "react-router";
import { DeleteConfirmation } from "./DeleteConfirmation";

export default function ContentTable() {
  const { user } = useAuth();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const [formType, setFormType] = useState<"add" | "edit">("add");
  const [selectedContent, setSelectedContent] = useState<IContent | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteItem, setDeleteItem] = useState<IContent | null>(null);

  const { data, error, isPending } = useQuery<ApiMultiResponse<IContent[]>>({
    queryKey: ["content", user?.token],
    queryFn: () => getContents(user?.token || ""),
    enabled: !!user?.token,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteContent(id, user?.token || ""),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] });
      toast.success("Content deleted successfully");
    },
    onError: (err) => {
      console.error("Error deleting content:", err);
      toast.error("Error deleting content");
    },
  });

  if (isPending)
    return (
      <div className="container py-10">
        <Spinner />
      </div>
    );
  if (error)
    return (
      <div className="container py-10 text-red-500">Error loading content</div>
    );

  const contentData = data?.data || [];

  const handleDelete = async () => {
    if (deleteItem?.id) {
      deleteMutation.mutate(deleteItem.id);
      setDeleteItem(null);
    }
  };

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Content</h1>
        <Button
          onClick={() => {
            setIsAddDialogOpen(true);
            setFormType("add");
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Content
        </Button>
      </div>

      <div className="rounded-md border">
        {contentData.length === 0 ? (
          <p className="text-2xl text-center font-semibold py-10">
            No content found
          </p>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Title</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Description
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Created
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contentData.map((content) => (
                  <TableRow key={content.id}>
                    <TableCell className="font-medium">
                      <Link
                        className="text-blue-500 underline"
                        to={`/users/${content.userId}`}
                      >
                        {truncateText(content.title, 30)}
                      </Link>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {truncateText(content.description || "", 50)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {formatDate(content?.createdAt?.toString())}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            setFormType("edit");
                            setIsAddDialogOpen(true);
                            setSelectedContent(content);
                          }}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => {
                            setDeleteConfirmation(true);
                            setDeleteItem(content);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <ContentForm
            onClose={() => {
              setIsAddDialogOpen(false);
              setSelectedContent(null);
              setFormType("add");
            }}
            formType={formType}
            content={selectedContent}
          />
        </Dialog>

        <DeleteConfirmation
          onConfirm={handleDelete}
          open={deleteConfirmation}
          setOpen={setDeleteConfirmation}
        />
      </div>
    </div>
  );
}
