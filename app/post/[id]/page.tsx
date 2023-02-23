'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import Post from '@/app/components/PostDetail';
import { IPost } from '@/app/types/posts';
import AddComment from '@/app/components/AddComment';

const getPost = async (id: string) => {
  const { data } = await axios.get<IPost>(`/api/posts/getPost/${id}`);
  return data;
};

const PostDetail = ({ params }: { params: { id: string } }) => {
  const { data, error, isLoading } = useQuery({
    queryFn: () => getPost(params.id),
    queryKey: ['post'],
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {data && (
        <>
          <Post
            id={data.id}
            avatar={data.user.image}
            name={data.user.name}
            comments={data.Comment}
            postTitle={data.title}
          />
          <AddComment id={data.id} />
        </>
      )}
    </div>
  );
};

export default PostDetail;
