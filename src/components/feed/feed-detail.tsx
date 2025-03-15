'use client';

import React from 'react';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { AppBskyFeedDefs } from '@atproto/api';
import { formatFeedPost } from '@/hooks/use-feed';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Repeat2, ArrowLeft, Share2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

type FeedDetailProps = {
  post: AppBskyFeedDefs.FeedViewPost;
  onLike?: (uri: string, cid: string) => void;
  onRepost?: (uri: string, cid: string) => void;
  onReply?: (uri: string, cid: string) => void;
  onBack?: () => void;
  onShare?: (uri: string) => void;
};

export function FeedDetail({ 
  post, 
  onLike, 
  onRepost, 
  onReply, 
  onBack,
  onShare 
}: FeedDetailProps) {
  const formattedPost = formatFeedPost(post);
  const { 
    author, 
    record, 
    indexedAt, 
    likeCount, 
    repostCount, 
    replyCount, 
    isRepost, 
    isReasonRepost, 
    reason, 
    embed,
    uri,
    cid
  } = formattedPost;
  
  // Get the text content from the record
  const text = typeof record?.text === 'string' ? record.text : '';
  
  // Format the date with more detail for the detailed view
  const formattedDate = indexedAt 
    ? new Date(indexedAt).toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      })
    : '';
  
  // Get the first initial for avatar fallback
  const firstInitial = author.displayName 
    ? author.displayName[0].toUpperCase() 
    : author.handle[0].toUpperCase();
  
  // Handle embed content (images, etc.)
  const hasEmbed = !!embed && typeof embed === 'object';
  const embedImages = hasEmbed && 
    'images' in embed && 
    Array.isArray(embed.images) 
      ? embed.images 
      : [];

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Back button */}
      <div className="mb-4">
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to feed</span>
        </Button>
      </div>
      
      <Card className="w-full overflow-hidden">
        {/* Repost indicator */}
        {isRepost && (
          <div className="bg-muted px-6 py-2 text-sm text-muted-foreground flex items-center">
            <Repeat2 className="h-4 w-4 mr-2" />
            <span>
              {isReasonRepost && reason && 'by' in reason 
                ? reason.by.displayName || reason.by.handle 
                : 'Someone'} reposted
            </span>
          </div>
        )}
        
        {/* Author information */}
        <CardHeader className="flex flex-row items-start gap-4 pt-6">
          <Avatar className="h-12 w-12">
            <AvatarImage src={author.avatar} alt={author.displayName || author.handle} />
            <AvatarFallback>{firstInitial}</AvatarFallback>
          </Avatar>
          
          <div className="flex flex-col">
            <p className="text-xl font-semibold">{author.displayName || author.handle}</p>
            <p className="text-muted-foreground">@{author.handle}</p>
          </div>
        </CardHeader>
        
        {/* Post content */}
        <CardContent className="pt-2 pb-6">
          <p className="text-lg whitespace-pre-wrap mb-4">{text}</p>
          
          {/* Embedded images */}
          {hasEmbed && embedImages.length > 0 && (
            <div className={`grid gap-4 mt-6 ${embedImages.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {embedImages.map((img, i) => (
                <div key={i} className="relative rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  {img.fullsize && (
                    <Image
                      src={img.fullsize}
                      alt={img.alt || 'Post image'}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
          
          {/* Timestamp */}
          <p className="text-sm text-muted-foreground mt-6">{formattedDate}</p>
          
          {/* Stats */}
          <div className="flex items-center gap-6 mt-4 pt-4 border-t">
            <div className="flex items-center gap-1">
              <span className="font-medium">{replyCount}</span>
              <span className="text-muted-foreground">Replies</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium">{repostCount}</span>
              <span className="text-muted-foreground">Reposts</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium">{likeCount}</span>
              <span className="text-muted-foreground">Likes</span>
            </div>
          </div>
        </CardContent>
        
        <Separator />
        
        {/* Action buttons */}
        <CardFooter className="px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={() => onReply && onReply(uri, cid)}
            >
              <MessageCircle className="h-5 w-5" />
              <span>Reply</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={() => onRepost && onRepost(uri, cid)}
            >
              <Repeat2 className="h-5 w-5" />
              <span>Repost</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={() => onLike && onLike(uri, cid)}
            >
              <Heart className="h-5 w-5" />
              <span>Like</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={() => onShare && onShare(uri)}
            >
              <Share2 className="h-5 w-5" />
              <span>Share</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}