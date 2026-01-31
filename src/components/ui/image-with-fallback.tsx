"use client";

import Image, { ImageProps } from "next/image";
import { useState, useEffect } from "react";

interface ImageWithFallbackProps extends ImageProps {
    fallbackSrc?: string;
}

export function ImageWithFallback({
    src,
    fallbackSrc = "/images/placeholder.svg",
    alt,
    ...props
}: ImageWithFallbackProps) {
    const [imgSrc, setImgSrc] = useState(src);

    useEffect(() => {
        setImgSrc(src);
    }, [src]);

    return (
        <Image
            {...props}
            src={imgSrc}
            alt={alt}
            onError={() => {
                setImgSrc(fallbackSrc);
            }}
        />
    );
}
