'use client';

import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import AddPost from './components/AddPost';
import Posts from './components/Posts';

const allPosts = async () => {
  const { data } = await axios.get('/api/posts/getPosts');
  return data;
};

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryFn: allPosts,
    queryKey: ['posts'],
  });

  if (error) {
    return error;
  }

  if (isLoading) {
    return 'Loading...';
  }

  return (
    <main>
      <AddPost />
      {data &&
        data.map((post) => (
          <Posts
            key={post.id}
            avatar={post.user.image}
            name={post.user.name}
            postTitle={post.title}
            id={post.id}
          />
        ))}
    </main>
  );
}
