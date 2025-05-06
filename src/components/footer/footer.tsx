import { Separator } from '@/components/ui/separator'
import {
  DribbbleIcon,
  GithubIcon,
  TwitchIcon,
  TwitterIcon,
  InstagramIcon,
  FacebookIcon,
} from 'lucide-react'
import { Link } from '@/i18n/routing'

const footerLinks = [
  {
    title: 'Fondazione Cascina Cotica',
    href: 'https://www.cascinacotica.com/la-fondazione/',
  },
]

export default function Footer() {
  return (
    <footer className="">
      <div className="mx-auto max-w-screen-xl px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          {/* Left side: Links */}
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {footerLinks.map(({ title, href }) => (
              <li key={title}>
                <Link href={href} className="text-sm text-muted-foreground hover:text-foreground">
                  {title}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side: Social & copyright */}
          <div className="mt-4 flex flex-col items-start sm:mt-0 sm:items-end">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Link href="https://www.instagram.com/cascinacotica/?hl=it" target="_blank">
                <InstagramIcon className="h-4 w-4" />
              </Link>

              <Link href="https://www.facebook.com/cascinacoticacooperativa" target="_blank">
                <FacebookIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
