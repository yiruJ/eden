import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

function extractParams(url: string): Record<string, string> {
  const params: Record<string, string> = {};
  const parts = url.split(/[?#]/);
  for (let i = 1; i < parts.length; i++) {
    new URLSearchParams(parts[i]).forEach((value, key) => {
      params[key] = value;
    });
  }
  return params;
}

export function ResetPasswordPage() {
  const [verifying, setVerifying] = useState(true);
  const [linkError, setLinkError] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const params = extractParams(window.location.href);

    if (params.error_description) {
      setLinkError(params.error_description);
      setVerifying(false);
      return;
    }

    if (!params.access_token || !params.refresh_token) {
      setLinkError('This link is invalid or has expired.');
      setVerifying(false);
      return;
    }

    supabase.auth
      .setSession({ access_token: params.access_token, refresh_token: params.refresh_token })
      .then(({ error }) => {
        setLinkError(error?.message ?? null);
        setVerifying(false);
      });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) { setFormError('Password must be at least 8 characters.'); return; }
    if (password !== confirmPassword) { setFormError('Passwords do not match.'); return; }

    setFormError(null);
    setSubmitting(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setSubmitting(false);
      setFormError(error.message);
      return;
    }

    await supabase.auth.signOut();
    setSubmitting(false);
    setSuccess(true);
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAF8F4', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 360, padding: 40, backgroundColor: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
        {verifying ? (
          <p style={{ color: '#6b7280', fontSize: 14, textAlign: 'center' }}>Verifying link...</p>
        ) : linkError ? (
          <>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, color: '#1a1a1a', marginBottom: 8 }}>Link invalid</h1>
            <p style={{ color: '#6b7280', fontSize: 14 }}>{linkError} Request a new password reset email and try again.</p>
          </>
        ) : success ? (
          <>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, color: '#1a1a1a', marginBottom: 8 }}>Password updated</h1>
            <p style={{ color: '#6b7280', fontSize: 14 }}>
              Your password has been successfully reset. You can close this browser tab and sign in to the Eden app with your new password.
            </p>
          </>
        ) : (
          <>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, color: '#1a1a1a', marginBottom: 8 }}>Reset your password</h1>
            <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 32 }}>Choose a new password for your Eden account.</p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', display: 'block', marginBottom: 6 }}>New password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', display: 'block', marginBottom: 6 }}>Confirm password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              {formError && <p style={{ color: '#ec2f44', fontSize: 13 }}>{formError}</p>}

              <button
                type="submit"
                disabled={submitting}
                style={{ backgroundColor: '#4aaf81', color: '#fff', border: 'none', borderRadius: 8, padding: '12px', fontSize: 15, fontWeight: 600, cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1 }}
              >
                {submitting ? 'Saving...' : 'Save password'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
