'use client';

import { useState } from 'react';
import Image from 'next/image';

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
  const [title, setTitle] = useState(postTitle);

  return (
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
    </div>
  );
};

export default EditPost;
