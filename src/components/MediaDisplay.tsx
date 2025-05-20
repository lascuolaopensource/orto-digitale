'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

type MediaDisplayProps = {
  media?: string | null | undefined
  alt: string
}

export function MediaDisplay({ media, alt }: MediaDisplayProps) {
  const t = useTranslations()

  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative w-full" style={{ position: 'relative', width: '100%' }}>
        {media !== null && media !== undefined && media !== '' ? (
          <Image
            src={media}
            alt={alt}
            width={0}
            height={0}
            sizes="100vw"
            className="rounded-lg"
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        ) : (
          <div className="pt-7">
            <div
              className="flex items-center justify-center rounded-lg bg-gray-100"
              style={{
                width: '100%',
                aspectRatio: '16/9',
              }}
            >
              <span className="flex flex-col items-center text-muted-foreground">
                {t('media.noImageAvailable')}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
