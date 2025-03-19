import { getPublicContents } from "@/api/authApi";
import { ApiMultiResponse, IContent } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./ui/spiner";
import ContentItem from "./ContentItem";

const PublicContentList = () => {
  const { data, error, isPending } = useQuery<ApiMultiResponse<IContent[]>>({
    queryKey: ["content"],
    queryFn: getPublicContents,
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
  const contents = data?.data || [];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {contents.map((item) => (
        <ContentItem key={item.id} content={item} />
      ))}
    </div>
  );
};

export default PublicContentList;
