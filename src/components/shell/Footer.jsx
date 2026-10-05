import React from 'react'
import { ArrowUp } from '@phosphor-icons/react'
import { footer, identity, links } from '../../content'
import { useSmoothScroll } from '../../motion/SmoothScroll'

const SOCIAL = [links.github, links.linkedin, links.medium]

// Quiet sign-off: identity on the left, destinations in the middle, authorship
// and a way back to the top on the right. The pipeline rail ends here.
export default function Footer() {
  const { scrollTo } = useSmoothScroll()

  const backToTop = () => {
    scrollTo(0, {
      onComplete: () => document.getElementById('hero-name')?.focus({ preventScroll: true })
    })
  }

  return (
    <footer className="relative border-t border-rule">
      <div className="shell grid gap-10 py-12 md:grid-cols-12 md:items-end md:gap-x-[clamp(2rem,4vw,4rem)] md:py-14">
        <div className="md:col-span-4">
          <p className="flex items-center gap-3">
            <span aria-hidden="true" className="h-3.5 w-[7px] bg-signal" />
            <span className="text-[0.9375rem] font-[560] tracking-[-0.02em]">{identity.name}</span>
          </p>
          <p className="meta mt-2">{identity.titles.nav}</p>
        </div>

        <nav aria-label="Elsewhere" className="md:col-span-4">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {SOCIAL.map((item) => (
              <li key={item.label}>
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="navlink">
                  <span className="navlink__text">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-end justify-between gap-6 md:col-span-4 md:flex-col md:items-end">
          <button
            type="button"
            onClick={backToTop}
            className="group flex h-10 shrink-0 items-center gap-2 whitespace-nowrap text-small opacity-70 transition-opacity duration-fast ease-out hover:opacity-100 focus-visible:opacity-100"
          >
            Back to top
            <ArrowUp
              size={15}
              aria-hidden="true"
              className="transition-transform duration-base ease-out group-hover:-translate-y-1 group-focus-visible:-translate-y-1"
            />
          </button>
          <p className="meta">{footer.authorship}</p>
        </div>
      </div>
    </footer>
  )
}
