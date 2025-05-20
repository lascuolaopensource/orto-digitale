import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'

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
      <Link href={backLink.href} className="text-primary hover:underline">
        {backLink.label}
      </Link>
    </div>
  )
}
