'use client';

import { useState } from 'react';
import Image from 'next/image';
import Toggle from './Toggle';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface Props {
  avatar: string;
  name: string;
  postTitle: string;
  id: string;
  comments?: {
    createdAt: string;
    id: string;
    postId: string;
    userId: string;
  }[];
}

const EditPost = ({ avatar, name, postTitle, id, comments }: Props) => {
  const [toggle, setToggle] = useState(false);
  const queryClient = useQueryClient();
  let toastPostId: string;

  // Delete post
  const { mutate } = useMutation(
    async (id: string) => await axios.delete(`/api/posts/deletePost/${id}`),
    {
      onError: (error: any) => {
        console.log(error, { id: toastPostId });
        toast.error(error?.response?.data?.message);
      },
      onSuccess: (response) => {
        toast.success('Post delete', { id: toastPostId });
        queryClient.invalidateQueries(['authPosts']);
      },
    }
  );

  const deletePost = () => {
    toastPostId = toast.loading('Deleting your post', { id: toastPostId });
    mutate(id);
  };

  return (
    <>
      <div className='bg-white my-8 p-8 rounded-flg'>
        <div className='flex items-center gap-2'>
          <Image
            className='rounded-full'
            width={32}
            height={32}
            alt='avatar'
            src={avatar}
          />
          <h3 className='font-bold text-gray-700'>{name}</h3>
        </div>
        <div className='my-8'>
          <p className='break-all'>{postTitle}</p>
        </div>
        <div className='flex items-center gap-4'>
          <p className='text-sm font-bold text-gray-700'>
            {comments?.length} Comments
          </p>
          <button
            className='text-sm font-bold text-red-500'
            onClick={() => setToggle(true)}
          >
            Delete
          </button>
        </div>
      </div>
      {toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}
    </>
  );
};

export default EditPost;
