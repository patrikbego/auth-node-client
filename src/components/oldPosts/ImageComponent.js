import Image from 'next/image';
import React from 'react';

const imageMeta = {
  src: 'undefined',
  alt: 'Image does not exist',
  width: 240,
  height: 750,
  loading: 'lazy',
  layout: 'fill',
  quality: 100,
};

const ImageComponent = ({ imageMeta = imageMeta }) => (

  <div style={{ position: 'relative', width: '50vw', height: '50vh' }}>
    {/* <Image */}
    {/*    src={imageMeta.src} */}
    {/*    objectFit="contain" */}
    {/*    alt={imageMeta.alt} */}
    {/*    layout={imageMeta.layout} */}
    {/*    quality={imageMeta.quality} */}
    {/*    loading={imageMeta.loading} */}
    {/* /> */}
    <Image
      alt="Mountains"
      src={imageMeta.src}
      layout="fill"
      objectFit="contain"
    />
  </div>
);

export default ImageComponent;
