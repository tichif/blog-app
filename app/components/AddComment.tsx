'use client';

import { FormEvent, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddComment = ({ id }: { id: string }) => {
  const [message, setMessage] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  let toastPostId: string;

  // create post
  const { mutate } = useMutation(
    async (message: string) =>
      await axios.post(`/api/posts/addComment/${id}`, { message }),
    {
      onError: (error: any) => {
        toast.error(error?.response?.data?.message, { id: toastPostId });
        setIsDisabled(false);
      },
      onSuccess: (data) => {
        toast.success('Comment added', { id: toastPostId });
        queryClient.invalidateQueries(['post']);
        setMessage('');
        setIsDisabled(false);
        console.log(data);
      },
    }
  );

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    toastPostId = toast.loading('Adding your comment', { id: toastPostId });
    setIsDisabled(true);
    mutate(message);
  };

  return (
    <form className='my-8 ' onSubmit={submitHandler}>
      <h3>Add Comment</h3>
      <div className='flex flex-col my-2'>
        <input
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='p-4 text-lg rounded-lg my-2'
          name='message'
          placeholder='Add comment'
        />
      </div>
      <div className='flex items-center  gap-2'>
        <button
          disabled={isDisabled}
          className='text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25'
          type='submit'
        >
          Add Comment
        </button>
        <p
          className={`font-bold text-sm ${
            message.length > 300 ? 'text-red-700' : 'text-gray-700'
          } `}
        >{`${message.length}/300`}</p>
      </div>
    </form>
  );
};

export default AddComment;
