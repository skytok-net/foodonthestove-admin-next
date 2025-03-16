'use client';

import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserAvatarProps {
  className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ className }) => {
  const { profile, user } = useAuth();
  
  // Get initials from display name or handle
  const getInitials = () => {
    if (profile?.displayName) {
      return profile.displayName
        .split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
    }
    
    if (user?.handle) {
      return user.handle.substring(0, 2).toUpperCase();
    }
    
    return 'U';
  };

  return (
    <Avatar className={className}>
      <AvatarImage 
        src={profile?.avatar || ''} 
        alt={profile?.displayName || user?.handle || 'User'} 
      />
      <AvatarFallback>{getInitials()}</AvatarFallback>
    </Avatar>
  );
};
