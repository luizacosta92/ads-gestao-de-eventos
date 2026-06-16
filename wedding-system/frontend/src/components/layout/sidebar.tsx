'use client';
// src/components/layout/sidebar.tsx — barra lateral do Enlace
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutGrid, Heart, Store, Plus, Bell,
} from 'lucide-react';

const NAV = [
  { href: '/', label: 'Painel', icon: LayoutGrid, match: (p: string) => p === '/' },
  { href: '/casamentos', label: 'Casamentos', icon: Heart, match: (p: string) => p.startsWith('/casamentos') },
  { href: '/fornecedores', label: 'Fornecedores', icon: Store, match: (p: string) => p.startsWith('/fornecedores') },
];

export function Sidebar() {
  const pathname = usePathname() || '/';

  return (
    <aside className="sidebar">
      <Link href="/" className="brand">
        <div className="brand-mark">
          <Heart size={21} />
        </div>
        <div>
          <div className="brand-name">Enlace</div>
          <div className="brand-sub">Gestão de Eventos</div>
        </div>
      </Link>

      <div className="nav-label">Menu</div>
      <nav className="nav">
        {NAV.map((n) => {
          const Icon = n.icon;
          const active = n.match(pathname);
          return (
            <Link key={n.href} href={n.href} className={'nav-item' + (active ? ' active' : '')}>
              <Icon size={18} />
              <span>{n.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="nav-label" style={{ marginTop: 22 }}>
        Atalhos
      </div>
      <nav className="nav">
        <Link href="/casamentos/novo" className="nav-item">
          <Plus size={18} />
          <span>Novo casamento</span>
        </Link>
        <button className="nav-item" type="button">
          <Bell size={18} />
          <span>Lembretes</span>
          <span className="nav-count">3</span>
        </button>
      </nav>

      <div className="sidebar-foot">
        <div className="avatar">JV</div>
        <div>
          <div className="foot-name">Jani do Vale</div>
          <div className="foot-role">Cerimonialista</div>
        </div>
      </div>
    </aside>
  );
}
