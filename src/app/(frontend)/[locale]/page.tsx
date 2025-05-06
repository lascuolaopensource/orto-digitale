import { Link } from '@/i18n/routing'
import { useTranslations, useLocale } from 'next-intl'
import Giardino from '@/components/giardino/giardino'
export default function HomePage() {
  return (
    <div className="w-full">
      <div className="">
        <div className="mx-auto flex w-full flex-col gap-12 px-12 sm:flex-row">
          <Giardino />
        </div>
      </div>
    </div>
  )
}
