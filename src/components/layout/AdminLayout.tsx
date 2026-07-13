import { Link, Outlet, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'Conversations', path: '/admin/conversations' },
  { label: 'Events', path: '/admin/events' },
  { label: 'Invite User', path: '/admin/invite' },
];

export function AdminLayout() {
  const navigate = useNavigate();

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate('/admin');
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FAF8F4' }}>
      
      {/* Sidebar */}
      <div style={{ width: 220, backgroundColor: '#fff', borderRight: '1px solid #e5e7eb', padding: '32px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, color: '#1a1a1a', marginBottom: 24, paddingLeft: 12 }}>Eden Admin</h2>
        
        {NAV_ITEMS.map(item => (
          <Link
            key={item.path}
            to={item.path}
            style={{ padding: '10px 12px', borderRadius: 8, fontSize: 14, fontWeight: 500, color: '#1a1a1a', textDecoration: 'none' }}
          >
            {item.label}
          </Link>
        ))}

        <div style={{ marginTop: 'auto' }}>
          <button
            onClick={handleSignOut}
            style={{ width: '100%', padding: '10px 12px', borderRadius: 8, fontSize: 14, color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: 40 }}>
        <Outlet />
      </div>
    </div>
  );
}