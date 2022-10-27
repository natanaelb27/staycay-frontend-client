import React from 'react';
import {
  SkeletonContainer, Text,
} from './style';

function SkeletonText({ classes }) {
  return (
    <SkeletonContainer role="status" className={classes}>
      <Text className="title" />
      <Text className="content w-4" />
      <Text className="content w-5" />
      <Text className="content w-3" />
      <Text className="content w-4" />
      <Text className="content w-2" />
      <Text className="content w-3" />
      <Text className="content w-4" />
      <Text className="content w-2" />
      <Text className="content w-5" />
      <Text className="content w-3" />
      <Text className="content w-4" />
    </SkeletonContainer>

  );
}

export default SkeletonText;
