'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'

// Updated Media type based on payload-types.ts
type Media = {
  id?: string | null
  alt?: string | null
  url?: string | null
  thumbnailURL?: string | null // Direct thumbnail URL
  sizes?: {
    thumbnail?: {
      url?: string | null
      width?: number | null
      height?: number | null
    }
    // We can add other sizes here if needed in the future
  }
  // Other fields like filename, mimeType, etc., can be added if necessary for this component
}

type RecipeImageGalleryProps = {
  immagine: string | Media | (string | Media)[] | undefined | null
  altText: string
  priority?: boolean
}

export function RecipeImageGallery({
  immagine,
  altText,
  priority = false,
}: RecipeImageGalleryProps) {
  const [imagesToDisplay, setImagesToDisplay] = useState<
    { src: string; alt: string; thumbnailUrl: string }[]
  >([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [noImageMessage, setNoImageMessage] = useState('No image available')
  const t = useTranslations()

  useEffect(() => {
    const prepareStrings = () => {
      // Removed async as t is now sync from useTranslations
      try {
        setNoImageMessage(t('media.noImageAvailable'))
      } catch (e) {
        console.error('Failed to load translations for RecipeImageGallery', e)
      }
    }
    prepareStrings()

    const processedImages: { src: string; alt: string; thumbnailUrl: string }[] = []
    if (Array.isArray(immagine)) {
      immagine.forEach((img) => {
        if (typeof img === 'string') {
          // Defensive check: if img is a string, ensure it looks like a URL
          if (img.startsWith('http') || img.startsWith('/')) {
            processedImages.push({ src: img, alt: altText, thumbnailUrl: img })
          }
        } else if (img && typeof img === 'object' && img.url) {
          const mainSrc = img.url
          const thumbSrc = img.sizes?.thumbnail?.url || img.thumbnailURL || mainSrc // Fallback chain
          processedImages.push({ src: mainSrc, alt: img.alt || altText, thumbnailUrl: thumbSrc })
        }
      })
    } else if (typeof immagine === 'string') {
      // Defensive check for single string image
      if (immagine.startsWith('http') || immagine.startsWith('/')) {
        processedImages.push({ src: immagine, alt: altText, thumbnailUrl: immagine })
      }
    } else if (immagine && typeof immagine === 'object' && immagine.url) {
      const mainSrc = immagine.url
      const thumbSrc = immagine.sizes?.thumbnail?.url || immagine.thumbnailURL || mainSrc
      processedImages.push({ src: mainSrc, alt: immagine.alt || altText, thumbnailUrl: thumbSrc })
    }
    setImagesToDisplay(processedImages)
    setCurrentIndex(0)
  }, [immagine, altText, t]) // Added t to dependency array as it's used in effect

  if (imagesToDisplay.length === 0) {
    return (
      <div className="flex aspect-[16/9] w-full items-center justify-center rounded-lg bg-gray-100">
        <span className="text-muted-foreground">{noImageMessage}</span>
      </div>
    )
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? imagesToDisplay.length - 1 : prevIndex - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === imagesToDisplay.length - 1 ? 0 : prevIndex + 1))
  }

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index)
  }

  const currentImage = imagesToDisplay[currentIndex]

  const ArrowLeftIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
  )

  const ArrowRightIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  )

  return (
    <div className="group relative w-full overflow-hidden rounded-lg">
      <div className="relative mb-2 aspect-[16/9] w-full overflow-hidden rounded-lg">
        {currentImage && (
          <Image
            key={currentImage.src}
            src={currentImage.src} // Main image uses full src
            alt={currentImage.alt}
            fill
            className="object-cover"
            priority={priority && currentIndex === 0}
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
        )}
        {imagesToDisplay.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-black/30 p-2 text-white opacity-0 transition-opacity hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-white group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ArrowLeftIcon />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-black/30 p-2 text-white opacity-0 transition-opacity hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-white group-hover:opacity-100"
              aria-label="Next image"
            >
              <ArrowRightIcon />
            </button>
          </>
        )}
      </div>

      {imagesToDisplay.length > 1 && (
        <div className="flex justify-center space-x-2 overflow-x-auto p-1">
          {imagesToDisplay.map((img, index) => (
            <button
              key={index + '-thumb'}
              onClick={() => handleThumbnailClick(index)}
              className={`relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md transition-all hover:opacity-80 focus:outline-none ${currentIndex === index ? 'ring-2 ring-primary' : 'opacity-50 hover:opacity-100'}`}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={img.thumbnailUrl} // Thumbnail uses thumbnailUrl
                alt={img.alt} // Alt text for thumbnails should still be descriptive
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
