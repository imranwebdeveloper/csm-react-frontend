import { Card, CardContent } from "@/components/ui/card";
import ContentItem from "@/components/ContentItem";
import { IContent } from "@/types";

interface ContentListProps {
  contents: IContent[];
}

export default function ContentList({ contents }: ContentListProps) {
  if (!contents || contents.length === 0) {
    return (
      <Card>
        <CardContent className="p-4 text-center">
          <p className="text-muted-foreground">
            This user hasn't added any content yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {contents.map((item) => (
        <ContentItem key={item.id} content={item} />
      ))}
    </div>
  );
}
