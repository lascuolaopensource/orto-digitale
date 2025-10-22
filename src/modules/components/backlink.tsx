import { cn } from "$/lib/utils"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

type BackLinkProps = {
  href: string
  children: React.ReactNode
	className?: string
}

export function BackLink({ href, children, className }: BackLinkProps) {
  return (
      <Link
        href={href}
        className={cn(
					"flex gap-1 items-center",
					"text-sm font-medium text-primary transition-colors hover:text-primary/80 hover:underline",
					className
				)}
      >
        <ArrowLeft size={16} />
        {children}
      </Link>
  )
}
