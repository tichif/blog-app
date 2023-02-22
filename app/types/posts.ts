export interface IPost {
  title: string;
  id: string;
  createAt: string;
  user: {
    name: string;
    email: string;
    image: string;
  };
  Comment?: {
    createdAt: string;
    id: string;
    postId: string;
    userId: string;
  }[];
}
