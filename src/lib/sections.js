// The page is one continuous document. Each section keeps its old route so
// existing links and bookmarks (/projects, /contact, ...) land in the right place.
export const SECTIONS = [
  { id: 'top', path: '/', label: 'Home' },
  { id: 'about', path: '/about', label: 'About' },
  { id: 'projects', path: '/projects', label: 'Projects' },
  { id: 'experience', path: '/experience', label: 'Experience' },
  { id: 'skills', path: '/skills', label: 'Skills' },
  { id: 'contact', path: '/contact', label: 'Contact' }
]

export const sectionForPath = (pathname) => {
  const normalized = pathname.replace(/\/+$/, '') || '/'
  return SECTIONS.find((section) => section.path === normalized) ?? null
}
