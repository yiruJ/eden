import { useState } from 'react';
import { supabase } from '../../lib/supabase';

type Role = 'family' | 'teacher' | 'admin';

export function InviteUserPage() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<Role>('family');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    const { data: sessionData } = await supabase.auth.getSession();
    const accessToken = sessionData.session?.access_token;

    if (!accessToken) {
      setError('Your session has expired. Please sign in again.');
      setSubmitting(false);
      return;
    }

    const { data, error: invokeError } = await supabase.functions.invoke('invite-user', {
      body: { email, role, fullName },
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    setSubmitting(false);

    if (invokeError || data?.error) {
      setError(data?.error ?? invokeError?.message ?? 'Something went wrong.');
      return;
    }

    setSuccess(`Invited ${email} as ${role}.`);
    setEmail('');
    setFullName('');
    setRole('family');
  }

  return (
    <div>
      <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, color: '#1a1a1a', marginBottom: 8 }}>
        Invite User
      </h1>
      <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 32 }}>
        Sends an email invite so the person can set their own password in the Eden app.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400, backgroundColor: '#fff', padding: 32, borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
      >
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', display: 'block', marginBottom: 6 }}>Full name</label>
          <input
            type="text"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            required
            style={{ width: '100%', padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', display: 'block', marginBottom: 6 }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', display: 'block', marginBottom: 6 }}>Role</label>
          <select
            value={role}
            onChange={e => setRole(e.target.value as Role)}
            style={{ width: '100%', padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box', backgroundColor: '#fff' }}
          >
            <option value="family">Family</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {error && <p style={{ color: '#ec2f44', fontSize: 13 }}>{error}</p>}
        {success && <p style={{ color: '#4aaf81', fontSize: 13 }}>{success}</p>}

        <button
          type="submit"
          disabled={submitting}
          style={{ backgroundColor: '#4aaf81', color: '#fff', border: 'none', borderRadius: 8, padding: '12px', fontSize: 15, fontWeight: 600, cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1 }}
        >
          {submitting ? 'Sending invite...' : 'Send invite'}
        </button>
      </form>
    </div>
  );
}
