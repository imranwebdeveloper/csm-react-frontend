import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IContent } from "@/types";

interface ContentItemProps {
  content: IContent;
}

export default function ContentItem({ content }: ContentItemProps) {
  const getYoutubeEmbedUrl = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  const embedUrl = getYoutubeEmbedUrl(content.youtubeUrl);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{content.title}</CardTitle>
          <CardDescription>
            Added on {new Date(content.createdAt || "").toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {embedUrl ? (
            <div className="aspect-video mb-4">
              <iframe
                src={embedUrl}
                className="w-full h-full"
                allowFullScreen
                title={content.title}
              ></iframe>
            </div>
          ) : (
            <div className="bg-muted aspect-video flex items-center justify-center mb-4">
              <p className="text-muted-foreground">Invalid YouTube URL</p>
            </div>
          )}
          <p className="text-sm">{content.description}</p>
        </CardContent>
      </Card>
    </>
  );
}
