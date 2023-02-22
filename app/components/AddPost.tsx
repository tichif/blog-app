'use client';

import { FormEvent, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  // create post
  const { mutate } = useMutation(
    async (title: string) => await axios.post('/api/posts/addPost', { title }),
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (data) => {
        setTitle('');
        setIsDisabled(false);
        console.log(data);
      },
    }
  );

  async function submitHandler(e: FormEvent) {
    e.preventDefault();
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
