import React from 'react'
import { Link } from 'react-router-dom'

// Buttons respond with a fill that wipes up from the bottom edge while the label
// rolls to a second copy set in the inverse colour. Transform-only, so it stays
// on the compositor. `primary` wipes to the signal colour; `secondary` to ink.
// Class names stay literal so Tailwind keeps them in the build.
const VARIANT_CLASS = { primary: 'btn--primary', secondary: 'btn--secondary' }

const Button = React.forwardRef(function Button(
  { variant = 'primary', to, href, icon: Icon, children, className = '', ...rest },
  ref
) {
  const Component = to ? Link : href ? 'a' : 'button'
  const target = to ? { to } : href ? { href } : { type: 'button' }
  const glyph = Icon ? <Icon size={16} weight="regular" aria-hidden="true" className="btn__icon" /> : null

  return (
    <Component ref={ref} {...target} {...rest} className={`btn ${VARIANT_CLASS[variant]} ${className}`}>
      <span aria-hidden="true" className="btn__fill" />
      <span className="btn__label">
        <span className="btn__row">
          {children}
          {glyph}
        </span>
        <span aria-hidden="true" className="btn__row btn__row--alt">
          {children}
          {glyph}
        </span>
      </span>
    </Component>
  )
})

export default Button
