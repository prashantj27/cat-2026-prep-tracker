import { NAV_ITEMS } from './Sidebar.jsx'

export function MobileNav({ tab, setTab, onNav }) {
  return (
    <nav className="mobile-nav" aria-label="Quick navigation">
      {NAV_ITEMS.map((n) => (
        <button
          key={n.id}
          className={`nav-item ${tab === n.id ? 'active' : ''}`}
          onClick={() => {
            setTab(n.id)
            onNav && onNav(n.id)
          }}
          aria-label={n.label}
        >
          <span className="nav-ico">{n.icon}</span>
          {n.label}
        </button>
      ))}
    </nav>
  )
}