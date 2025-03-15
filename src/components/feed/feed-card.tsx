'use client';

import React from 'react';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { AppBskyFeedDefs } from '@atproto/api';
import { formatFeedPost } from '@/hooks/use-feed';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Repeat2 } from 'lucide-react';

type FeedCardProps = {
  post: AppBskyFeedDefs.FeedViewPost;
  onLike?: (uri: string, cid: string) => void;
  onRepost?: (uri: string, cid: string) => void;
  onReply?: (uri: string, cid: string) => void;
};

export function FeedCard({ post, onLike, onRepost, onReply }: FeedCardProps) {
  const formattedPost = formatFeedPost(post);
  const { author, record, indexedAt, likeCount, repostCount, replyCount, isRepost, isReasonRepost, reason, embed } = formattedPost;
  
  // Get the text content from the record
  const text = typeof record?.text === 'string' ? record.text : '';
  
  // Format the date
  const formattedDate = indexedAt ? formatDistanceToNow(new Date(indexedAt), { addSuffix: true }) : '';
  
  // Get the first initial for avatar fallback
  const firstInitial = author.displayName ? author.displayName[0].toUpperCase() : author.handle[0].toUpperCase();
  
  // Handle embed content (images, etc.)
  const hasEmbed = !!embed && typeof embed === 'object';
  const embedImages = hasEmbed && 
    'images' in embed && 
    Array.isArray(embed.images) 
      ? embed.images 
      : [];
  
  return (
    <Card className="w-full mb-4 overflow-hidden bg-gray-50 dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
      {isRepost && (
        <div className="bg-gray-100 dark:bg-gray-700 px-6 py-1 text-xs text-gray-600 dark:text-gray-300 flex items-center">
          <Repeat2 className="h-3 w-3 mr-1" />
          <span>
            {isReasonRepost && reason && 'by' in reason 
              ? reason.by.displayName || reason.by.handle 
              : 'Someone'} reposted
          </span>
        </div>
      )}
      
      <CardHeader className="flex flex-row items-start gap-3 pt-4 border-none">
        <Avatar className="h-10 w-10">
          <AvatarImage src={author.avatar} alt={author.displayName || author.handle} />
          <AvatarFallback>{firstInitial}</AvatarFallback>
        </Avatar>
        
        <div className="flex flex-col">
          <p className="font-semibold text-gray-900 dark:text-gray-100">{author.displayName || author.handle}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">@{author.handle}</p>
        </div>
        
        <p className="ml-auto text-xs text-gray-500 dark:text-gray-400">{formattedDate}</p>
      </CardHeader>
      
      <CardContent className="text-gray-700 dark:text-gray-300">
        <p className="whitespace-pre-wrap">{text}</p>
        
        {hasEmbed && embedImages.length > 0 && (
          <div className={`grid gap-2 mt-3 ${embedImages.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {embedImages.map((img, i) => (
              <div key={i} className="relative aspect-video rounded-md overflow-hidden">
                {img.fullsize && (
                  <Image
                    src={img.fullsize}
                    alt={img.alt || 'Post image'}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="px-6 py-3 bg-gray-100 dark:bg-gray-700 border-none">
        <div className="flex items-center gap-6 text-gray-500 dark:text-gray-400">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1 p-0 h-auto hover:text-gray-700 dark:hover:text-gray-200"
            onClick={() => onReply && onReply(formattedPost.uri, formattedPost.cid)}
          >
            <MessageCircle className="h-4 w-4" />
            <span className="text-xs">{replyCount > 0 ? replyCount : null}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1 p-0 h-auto hover:text-gray-700 dark:hover:text-gray-200"
            onClick={() => onRepost && onRepost(formattedPost.uri, formattedPost.cid)}
          >
            <Repeat2 className="h-4 w-4" />
            <span className="text-xs">{repostCount > 0 ? repostCount : null}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1 p-0 h-auto hover:text-gray-700 dark:hover:text-gray-200"
            onClick={() => onLike && onLike(formattedPost.uri, formattedPost.cid)}
          >
            <Heart className="h-4 w-4" />
            <span className="text-xs">{likeCount > 0 ? likeCount : null}</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}