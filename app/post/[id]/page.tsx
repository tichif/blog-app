'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';

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
          {data.Comment?.map((comment) => (
            <div key={comment.id}>
              <div className='my-6 bg-white p-8 rounded-md'>
                <div className='flex items-center gap-2'>
                  <Image
                    width={24}
                    height={24}
                    alt='avatar'
                    src={comment?.user?.image as string}
                    className='rounded-full'
                  />
                  <h3 className='font-bold'>{comment?.user?.name}</h3>
                  <h2 className='text-sm'>
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </h2>
                </div>
                <div className='py-4'>{comment.message}</div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default PostDetail;
