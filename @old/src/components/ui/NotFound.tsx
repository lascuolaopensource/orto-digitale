import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'
import { BackLink } from './BackLink'

type NotFoundProps = {
  title: string
  backLink: {
    href: string
    label: string
  }
}

export async function NotFound({ title, backLink }: NotFoundProps) {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">{title}</h2>
      <BackLink href={backLink.href} label={backLink.label} />
    </div>
  )
}
