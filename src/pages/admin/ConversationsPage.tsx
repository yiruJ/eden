import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

type Conversation = {
  id: string;
  family: { id: string; full_name: string } | null;
  teacher: { id: string; full_name: string } | null;
  last_message: string | null;
  last_message_at: string | null;
};

function formatTime(iso: string | null): string {
  if (!iso) return '';
  const date = new Date(iso);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / 86400000);
  if (diffDays === 0) return date.toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit', hour12: true });
  if (diffDays === 1) return 'Yesterday';
  return date.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' });
}

export function ConversationsPage() {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from('conversations')
        .select(`
            id,
            family:profiles!conversations_family_id_fkey(id, full_name),
            teacher:profiles!conversations_teacher_id_fkey(id, full_name),
            messages(content, created_at)
        `);

      if (data) {
        console.log(data);
        setConversations(data.map((c: any) => {
            const sorted = (c.messages ?? []).sort((a: any, b: any) =>
                new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            );
            return {
                id: c.id,
                family: c.family,
                teacher: c.teacher,
                last_message: sorted[0]?.content ?? null,
                last_message_at: sorted[0]?.created_at ?? null,
            };
        }));
      }
      setLoading(false);
    }
    fetch();
  }, []);

  if (loading) return <p style={{ color: '#6b7280' }}>Loading...</p>;

  return (
    <div>
      <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, color: '#1a1a1a', marginBottom: 8 }}>Conversations</h1>
      <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 32 }}>{conversations.length} total</p>

      {conversations.length === 0 ? (
        <p style={{ color: '#6b7280' }}>No conversations yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {conversations.map(conv => (
            <div
              key={conv.id}
              onClick={() => navigate(`/admin/conversations/${conv.id}`)}
              style={{ backgroundColor: '#fff', borderRadius: 12, padding: '16px 20px', cursor: 'pointer', border: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <div>
                <p style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a', marginBottom: 4 }}>
                  {conv.family?.full_name ?? '?'} · {conv.teacher?.full_name ?? '?'}
                </p>
                <p style={{ fontSize: 13, color: '#6b7280' }}>
                  {conv.last_message ?? 'No messages yet'}
                </p>
              </div>
              <span style={{ fontSize: 12, color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: 16 }}>
                {formatTime(conv.last_message_at)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}