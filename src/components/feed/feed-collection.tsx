'use client';

import React from 'react';
import { AppBskyFeedDefs } from '@atproto/api';
import { FeedCard } from './feed-card';
import { FeedItem } from './feed-item';

type FeedCollectionProps = {
  posts: AppBskyFeedDefs.FeedViewPost[];
  displayMode: 'card' | 'item';
  onLike?: (uri: string, cid: string) => void;
  onRepost?: (uri: string, cid: string) => void;
  onReply?: (uri: string, cid: string) => void;
  onPostClick?: (post: AppBskyFeedDefs.FeedViewPost) => void;
};

export function FeedCollection({
  posts,
  displayMode,
  onLike,
  onRepost,
  onReply,
  onPostClick,
}: FeedCollectionProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        No posts to display
      </div>
    );
  }

  return (
    <div className={displayMode === 'card' ? 'space-y-4' : 'divide-y'}>
      {posts.map((post) => {
        // Use the post's CID as a unique key
        const key = post.post.cid;
        
        return displayMode === 'card' ? (
          <FeedCard
            key={key}
            post={post}
            onLike={onLike}
            onRepost={onRepost}
            onReply={onReply}
          />
        ) : (
          <FeedItem
            key={key}
            post={post}
            onLike={onLike}
            onRepost={onRepost}
            onReply={onReply}
            onClick={onPostClick}
          />
        );
      })}
    </div>
  );
}