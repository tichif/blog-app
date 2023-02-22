'use client';

import Image from 'next/image';
import Link from 'next/link';

interface Props {
  avatar: string;
  name: string;
  postTitle: string;
}

const Posts = ({ avatar, name, postTitle }: Props) => {
  return (
    <div className='bg-white my-8 p-8 rounded-lg'>
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
    </div>
  );
};

export default Posts;
