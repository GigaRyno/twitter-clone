import useUsers from '@/hooks/useUsers';
import React, { use } from 'react'
import Avatar from '../Avatar';
import Sticky from 'react-stickynode';
import useCurrentUser from '@/hooks/useCurrentUser';

const FollowBar = () => {
  const { data: users = [] } = useUsers();
  const { data: currentUser } = useCurrentUser();  

  if (users.length === 0)
    return null;

  // Added in randomizing the users
  let randomUsers = users.sort(() => Math.random() - Math.random())

  // Added in filtering out the current user
  // WIP: Added filtering ouit users that the current user is already following
  let filteredUsers = users.filter((user: Record<string, any>) => (user.id !== currentUser?.id) && (currentUser?.followingIds !== user.id)).slice(randomUsers.length - 4, randomUsers.length);
  
  return (
    <Sticky>
      <p className='text-white'></p>
      <div className="px-6 py-4 hidden lg:block">
        <div className="bg-neutral-800 rounded-xl p-4">
          <h2 className="text-white text-xl font-semibold">Who to follow</h2>
          <div className="flex flex-col gap-6 mt-4">
            {filteredUsers.map((user: Record<string, any>) => (
              <div key={user.id} className="flex flex-row gap-4">
                <Avatar userId={user.id} />
                <div className="flex flex-col">
                  <p className="text-white font-semibold text-sm">{user.name}</p>
                  <p className="text-neutral-400 text-sm">@{user.username}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Sticky>
  )
}

export default FollowBar;