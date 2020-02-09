import React from 'react';
import config from '../client-config';

const API_ROOT = `http://${config.api.url}:${config.api.port}`;

export interface YImageProps {
  src: string,
  alt: string,
  style?: object
}

const YImage: React.SFC<YImageProps> = ({ src, alt, ...props }) => (
  <img
    src={
      src.substr(0, 4) === 'http' || src.substr(0, 11) === 'data:image/' || src.substr(0, 14) === '/static/media/'
        ? src
        : `${API_ROOT}/${src}`
    }
    alt={alt}
    {...props}
  />
);

export default YImage;
