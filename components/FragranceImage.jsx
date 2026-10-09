import Image from "next/image"

const FragranceImage = ({ src, alt, className = "", sizes = "(min-width: 1024px) 33vw, 100vw", priority = false }) => {
  return (
    <div className={`relative overflow-hidden bg-black/[0.03] ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-contain p-4"
        />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center text-xs text-black/30">
          تصویر بطری
        </span>
      )}
    </div>
  )
}

export default FragranceImage