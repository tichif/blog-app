'use client';

import { FormEvent, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  let toastPostId: string;
  const queryClient = useQueryClient();

  // create post
  const { mutate } = useMutation(
    async (title: string) => await axios.post('/api/posts/addPost', { title }),
    {
      onError: (error: any) => {
        toast.error(error?.response?.data?.message, { id: toastPostId });
        setIsDisabled(false);
      },
      onSuccess: (data) => {
        toast.success('Toast has been made', { id: toastPostId });
        queryClient.invalidateQueries(['posts']);
        setTitle('');
        setIsDisabled(false);
        console.log(data);
      },
    }
  );

  async function submitHandler(e: FormEvent) {
    e.preventDefault();
    toastPostId = toast.loading('Creating your post', { id: toastPostId });
    setIsDisabled(true);
    mutate(title);
  }

  return (
    <form className='bg-white my-8 p-8 rounded-md' onSubmit={submitHandler}>
      <div className='flex flex-col my-4'>
        <textarea
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What's on your mind?"
          className='p-4 text-lg rounded-dm my-2 bg-gray-200'
        />
      </div>

      <div className='flex items-center justify-between gap-2'>
        <p
          className={`font-bold text-sm ${
            title.length > 300 ? 'text-red-700' : 'text-gray-700'
          } `}
        >{`${title.length}/300`}</p>
        <button
          disabled={isDisabled}
          className='text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25'
          type='submit'
        >
          Create Post
        </button>
      </div>
    </form>
  );
};

export default AddPost;
