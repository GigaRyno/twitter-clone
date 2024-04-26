import useUsers from '@/hooks/useUsers';
import React, { use, useEffect, useState } from 'react'
import Sticky from 'react-stickynode';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useRouter } from 'next/router';
import FollowUserItem from './FollowUserItem';

const FollowBar = () => {
  const { data: currentUser } = useCurrentUser();  
  const { data: users = [] } = useUsers();
  const router = useRouter();

  if (users.length === 0)
    return null;

  let filteredUsers = [];
  
  if (currentUser) {
    filteredUsers = users.filter((user: Record<string, any>) => 
        user.id !== currentUser.id &&
        !currentUser.following.includes(user.id)
    ).slice(0, 3);
  }

  const handleShowMore = () => {
    router.push({
      pathname: '/connect',
    })
  }

  return (
    <Sticky className='w-96 p-3'>
      <div className="px-6 py-4 lg:block hidden w-80">
        <div className="bg-neutral-800 rounded-xl w-80">
          <h2 className="text-white text-xl font-semibold px-4 py-3">Who to follow</h2>
            {filteredUsers.map((user: Record<string, any>) => {
              return <FollowUserItem user={user}/>
            })}
          <p className='text-blue-500 cursor-pointer hover:bg-neutral-700 hover:opacity-90 p-3 rounded-b-xl'
            onClick={handleShowMore}
            >Show More</p>
        </div>
      </div>
    </Sticky>
  )
}

export default FollowBar;