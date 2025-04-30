'use client';
import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, note }),
    });
    

    if (res.ok) {
      setMessage('RSVP successfully submitted!');
      setName('');
      setEmail('');
      setNote('');
    } else {
      const data = await res.json();
      setMessage(`Error: ${data.error}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">Final Project Presentation RSVP</h1>
      <p className="mb-4">Thursday, May 1st — RSVP below!</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-4 py-2 rounded-md"
        />

        <input
          required
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-4 py-2 rounded-md"
        />

        <textarea
          placeholder="Leave a note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full border px-4 py-2 rounded-md h-24 resize-none"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          RSVP
        </button>
      </form>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
