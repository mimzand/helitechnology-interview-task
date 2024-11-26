export interface PostCardProps {
  id: number;
  author: string;
  content: string;
  image: string;
  liked?: boolean;
  bookmarked?: boolean;
}
