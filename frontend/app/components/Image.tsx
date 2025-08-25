import { FC } from 'react'

interface ImageProps {
    src: string;
    height: string | number;
    width: string | number;
    className?: string;
    alt: string;
}

const Image: FC<ImageProps> = ({ src, height, width, className, alt }) => {
    return <img
        src={src}
        height={height}
        width={width}
        className={className}
        alt={alt}
    />
}

export default Image