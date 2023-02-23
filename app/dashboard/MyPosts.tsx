'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

import { IAuthPost } from '../types/posts';
import EditPost from './EditPost';

const getPosts = async () => {
  const { data } = await axios.get<IAuthPost>('/api/posts/myPosts');
  return data;
};

const MyPosts = () => {
  const { data, isLoading, error } = useQuery({
    queryFn: getPosts,
    queryKey: ['authPosts'],
  });

  if (error) {
    toast.error('Error');
    return null;
  }

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  return (
    <div>
      {data &&
        data.Post.map((post) => (
          <EditPost
            key={post.id}
            avatar={data.image}
            name={data.name}
            postTitle={post.title}
            comments={post.Comment}
            id={post.id}
          />
        ))}
    </div>
  );
};

export default MyPosts;
