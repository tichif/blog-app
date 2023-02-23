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
    message: string;
    createdAt: string;
    id: string;
    postId: string;
    userId: string;
    user?: {
      name: string;
      email: string;
      image: string;
    };
  }[];
}

interface Post {
  title: string;
  id: string;
  createAt: string;
  Comment?: {
    createdAt: string;
    id: string;
    postId: string;
    userId: string;
    message: string;
    user?: {
      name: string;
      email: string;
      image: string;
    };
  }[];
}

export interface IAuthPost {
  name: string;
  email: string;
  image: string;
  id: string;
  Post: Post[];
}
