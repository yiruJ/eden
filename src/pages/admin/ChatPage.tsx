import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

type Message = {
  id: string;
  content: string;
  created_at: string;
  sender_id: string;
  sender: { full_name: string } | null;
};

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function formatDateLabel(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / 86400000);
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  return date.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function ChatPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [participants, setParticipants] = useState<{ family: string; teacher: string }>({ family: '', teacher: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMessages() {
      const { data: conv } = await supabase
        .from('conversations')
        .select(`
          family:profiles!conversations_family_id_fkey(full_name),
          teacher:profiles!conversations_teacher_id_fkey(full_name)
        `)
        .eq('id', id)
        .single();

      if (conv) {
        setParticipants({
          family: (conv.family as any)?.full_name ?? '?',
          teacher: (conv.teacher as any)?.full_name ?? '?',
        });
      }

      const { data: msgs } = await supabase
        .from('messages')
        .select('id, content, created_at, sender_id, sender:profiles!messages_sender_id_fkey(full_name)')
        .eq('conversation_id', id)
        .order('created_at', { ascending: true });

      if (msgs) setMessages(msgs as any);
      setLoading(false);
    }

    fetchMessages();
  }, [id]);

  // Group messages by date
  const grouped: { date: string; messages: Message[] }[] = [];
  messages.forEach(msg => {
    const dateStr = new Date(msg.created_at).toDateString();
    const existing = grouped.find(g => g.date === dateStr);
    if (existing) existing.messages.push(msg);
    else grouped.push({ date: dateStr, messages: [msg] });
  });

  if (loading) return <p style={{ color: '#6b7280' }}>Loading...</p>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
        <button
          onClick={() => navigate('/admin/conversations')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#6b7280' }}
        >
          ←
        </button>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, color: '#1a1a1a' }}>
            {participants.family} · {participants.teacher}
          </h1>
          <p style={{ fontSize: 13, color: '#6b7280' }}>{messages.length} messages</p>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {grouped.map(group => (
          <div key={group.date}>

            {/* Date divider */}
            <div style={{ textAlign: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 11, color: '#9ca3af', backgroundColor: '#FAF8F4', padding: '2px 12px', borderRadius: 20 }}>
                {formatDateLabel(group.messages[0].created_at)}
              </span>
            </div>

            {/* Bubbles */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {group.messages.map(msg => (
                <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontSize: 11, color: '#9ca3af', paddingLeft: 4 }}>
                    {(msg.sender as any)?.full_name ?? '?'}
                  </span>
                  <div style={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: 12,
                    padding: '10px 14px',
                    maxWidth: 480,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    gap: 16,
                  }}>
                    <p style={{ fontSize: 14, color: '#1a1a1a', margin: 0 }}>{msg.content}</p>
                    <span style={{ fontSize: 11, color: '#9ca3af', whiteSpace: 'nowrap' }}>{formatTime(msg.created_at)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}