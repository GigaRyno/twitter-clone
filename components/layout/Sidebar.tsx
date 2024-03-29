import { BsHouseFill, BsBellFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { signOut } from 'next-auth/react';
import Sticky from 'react-stickynode';

import SidebarLogo from './SidebarLogo';
import SidebarItem from './SidebarItem';
import SidebarTweetButton from './SidebarTweetButton';
import SidebarAccountButton from './SidebarAccountButton';
import useCurrentUser from '@/hooks/useCurrentUser';

const SideAccouuntButton = () => {};

const Sidebar = () => {
        const { data: currentUser } = useCurrentUser();  
        const items = [
        {
            label: 'Home',
            href: '/',
            icon: BsHouseFill
        },
        {
            label: 'Notifications',
            href: '/notifications',
            icon: BsBellFill,
            auth: true
        },
        {
            label: 'Profile',
            href: `/users/${currentUser?.id}`,
            icon: FaUser,
            auth: true
        },
    ];
    
    return (
    <Sticky>
        <div className="col-auto h-screen pr-4 md:pr-6">
            <div className="flex flex-col items-end">
                <div className="space-y-2 lg:w-[230px]">
                    <SidebarLogo/>
                    {items.map((item) => (
                        <SidebarItem
                            key={item.href}
                            href={item.href}
                            label={item.label}
                            icon={item.icon}
                            auth={item.auth}
                        />
                    ))}
                    <SidebarTweetButton/>
                </div>
            </div>
            <div className='lg:h-3/4 md:h-2/5 flex flex-end items-end'>
                {/* <div className='flex flex-col'> */}
                    {/* move the button down to the bottom */}
                    {currentUser && (
                        <SidebarAccountButton label={currentUser?.name}/>
                        
                    )}
                {/* </div> */}
            </div>
        </div>
    </Sticky>
    );
}

export default Sidebar;