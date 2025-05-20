import { Link } from '@/i18n/routing'

type BackLinkProps = {
  href: string
  label: string
}

export function BackLink({ href, label }: BackLinkProps) {
  return (
    <div className="mb-8">
      <Link
        href={href}
        className="group inline-flex items-center text-sm font-medium text-primary transition-colors hover:text-primary/80"
      >
        <svg
          className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-0.5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
            clipRule="evenodd"
          />
        </svg>
        {label}
      </Link>
    </div>
  )
}
