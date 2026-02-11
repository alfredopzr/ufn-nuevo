import type { NewsArticle } from "@/types";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  const formattedDate = new Date(article.date).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image placeholder */}
      <div className="bg-muted h-48 flex items-center justify-center text-muted-foreground text-sm">
        Imagen
      </div>

      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary">{article.category}</Badge>
          <time className="text-xs text-muted-foreground" dateTime={article.date}>
            {formattedDate}
          </time>
        </div>
        <div className="font-semibold leading-tight tracking-tight text-lg">
          {article.title}
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {article.excerpt}
        </p>
      </CardContent>
    </Card>
  );
}
