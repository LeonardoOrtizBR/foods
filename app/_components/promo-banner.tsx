import Image, { ImageProps } from "next/image";

const PromoBanner = (props: ImageProps) => {
    return (
        <Image {...props} width={0} height={0} className="w-full h-auto max-h-[200px]" sizes="100vw" />
    );
}

export default PromoBanner;