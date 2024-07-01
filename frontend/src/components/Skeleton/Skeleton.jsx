import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const Skeleton = ({ count = 1, baseColor = '#303030', highlightColor = '#505050' }) => {
    return (
        <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
            <Skeleton count={count} />
        </SkeletonTheme>
    );
};

export default Skeleton;
