import { useEffect, useRef, useState } from 'react';
import { supabase } from '../../lib/supabase';

type Event = {
  id: string;
  title: string;
  date: string;
  time: string | null;
  location: string | null;
  description: string | null;
  image_url: string | null;
};

export function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchEvents(); }, []);

  async function fetchEvents() {
    const { data } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });
    if (data) setEvents(data);
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    let image_url: string | null = null;

    if (imageFile) {
      const ext = imageFile.name.split('.').pop();
      const path = `events/${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from('event-images').upload(path, imageFile);
      if (!error) {
        const { data: urlData } = supabase.storage.from('event-images').getPublicUrl(path);
        image_url = urlData.publicUrl;
      }
    }

    await supabase.from('events').insert({
        title: form.title,
        date: form.date || null,
        time: form.time || null,
        location: form.location || null,
        description: form.description || null,
        image_url,
    });

    const { error } = await supabase.from('events').insert({
        title: form.title,
        date: form.date || null,
        time: form.time || null,
        location: form.location || null,
        description: form.description || null,
        image_url,
    });

    if (error) {
        console.error('Insert error:', error);
        alert('Failed to create event: ' + error.message);
        setSubmitting(false);
        return;
    }

    setForm({ title: '', date: '', time: '', location: '', description: '' });
    setImageFile(null);
    setShowForm(false);
    setSubmitting(false);
    fetchEvents();
  }

  async function handleDelete(id: string) {
    await supabase.from('events').delete().eq('id', id);
    setEvents(prev => prev.filter(e => e.id !== id));
  }

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    border: '1px solid #e5e7eb',
    borderRadius: 8,
    fontSize: 14,
    outline: 'none',
    boxSizing: 'border-box' as const,
    backgroundColor: '#fff',
  };

  if (loading) return <p style={{ color: '#6b7280' }}>Loading...</p>;

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, color: '#1a1a1a', marginBottom: 4 }}>Events</h1>
          <p style={{ fontSize: 14, color: '#6b7280' }}>{events.length} upcoming</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{ backgroundColor: '#4aaf81', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
        >
          {showForm ? 'Cancel' : '+ New Event'}
        </button>
      </div>

      {/* Create form */}
      {showForm && (
        <form onSubmit={handleSubmit} style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, border: '1px solid #e5e7eb', marginBottom: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a1a', margin: 0 }}>New Event</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', display: 'block', marginBottom: 6 }}>Title *</label>
              <input style={inputStyle} value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} required />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', display: 'block', marginBottom: 6 }}>Date</label>
              <input type="date" style={inputStyle} value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', display: 'block', marginBottom: 6 }}>Time</label>
              <input type="time" style={inputStyle} value={form.time} onChange={e => setForm(p => ({ ...p, time: e.target.value }))} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', display: 'block', marginBottom: 6 }}>Location</label>
              <input style={inputStyle} value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} />
            </div>
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', display: 'block', marginBottom: 6 }}>Description</label>
            <textarea style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} />
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', display: 'block', marginBottom: 6 }}>Poster Image</label>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] ?? null)} style={{ fontSize: 14, color: '#6b7280' }} />
          </div>

          <button
            type="submit"
            disabled={submitting}
            style={{ backgroundColor: '#4aaf81', color: '#fff', border: 'none', borderRadius: 8, padding: '12px', fontSize: 14, fontWeight: 600, cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1, alignSelf: 'flex-start', paddingLeft: 24, paddingRight: 24 }}
          >
            {submitting ? 'Creating...' : 'Create Event'}
          </button>
        </form>
      )}

      {/* Events list */}
      {events.length === 0 ? (
        <p style={{ color: '#6b7280' }}>No events yet. Create one above.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {events.map(event => (
            <div key={event.id} style={{ backgroundColor: '#fff', borderRadius: 12, padding: '16px 20px', border: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                {event.image_url && (
                  <img src={event.image_url} alt={event.title} style={{ width: 56, height: 56, borderRadius: 8, objectFit: 'cover' }} />
                )}
                <div>
                  <p style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a', marginBottom: 4 }}>{event.title}</p>
                  <p style={{ fontSize: 13, color: '#6b7280' }}>
                    {new Date(event.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}
                    {event.time ? ` · ${event.time.slice(0, 5)}` : ''}
                    {event.location ? ` · ${event.location}` : ''}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(event.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '#ec2f44', fontWeight: 500 }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}