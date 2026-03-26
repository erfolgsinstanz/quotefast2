'use client';

import { useEffect, useState } from 'react';
import { supabase } from './supabase';

type RequestItem = {
  id: number;
  name: string;
  phone: string;
  service: string;
};

export default function Home() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [requests, setRequests] = useState<RequestItem[]>([]);

  useEffect(() => {
    loadRequests();
  }, []);

  async function loadRequests() {
    const { data, error } = await supabase.from('requests').select('*');
    if (!error && data) setRequests(data);
  }

  async function saveRequest() {
    if (!name || !phone || !service) {
      alert('Bitte alles ausfüllen');
      return;
    }

    const { error } = await supabase
      .from('requests')
      .insert([{ name, phone, service }]);

    if (error) {
      alert('Fehler beim Speichern');
      return;
    }

    setName('');
    setPhone('');
    setService('');
    await loadRequests();
    alert('Gespeichert!');
  }

  function getWhatsAppLink(request: RequestItem) {
    return `https://wa.me/491708170957?text=${encodeURIComponent(
      `Hey :) neue Anfrage:\n\nName: ${request.name}\nTelefon: ${request.phone}\nService: ${request.service}`
    )}`;
  }

  async function deleteRequest(id: number) {
    await supabase.from('requests').delete().eq('id', id);
    await loadRequests();
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '40px',
        background: '#0f0f0f',
        minHeight: '100vh',
        fontFamily: 'Arial',
      }}
    >
      <div
        style={{
          background: '#1a1a1a',
          color: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 0 20px rgba(0,0,0,0.5)',
          width: '420px',
        }}
      >
        <h2 style={{ textAlign: 'center' }}>QuoteFast</h2>

        <h3>Neue Anfrage</h3>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '10px',
            borderRadius: '6px',
            border: '1px solid #444',
            background: '#2a2a2a',
            color: 'white',
          }}
        />

        <input
          placeholder="Telefon"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '10px',
            borderRadius: '6px',
            border: '1px solid #444',
            background: '#2a2a2a',
            color: 'white',
          }}
        />

        <input
          placeholder="Service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '10px',
            borderRadius: '6px',
            border: '1px solid #444',
            background: '#2a2a2a',
            color: 'white',
          }}
        />

        <button
          onClick={saveRequest}
          style={{
            width: '100%',
            padding: '12px',
            background: '#111',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            marginBottom: '25px',
          }}
        >
          Speichern
        </button>

        <h3>Anfragen</h3>

        {requests.map((request) => (
          <div
            key={request.id}
            style={{
              border: '1px solid #444',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '10px',
              background: '#2a2a2a',
            }}
          >
            <strong>{request.name}</strong>
            <p>Telefon: {request.phone}</p>
            <p>Service: {request.service}</p>

            <div style={{ display: 'flex', gap: '8px' }}>
              <a
                href={getWhatsAppLink(request)}
                target="_blank"
                style={{
                  padding: '8px 12px',
                  background: '#25D366',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '6px',
                }}
              >
                WhatsApp senden
              </a>

              <button
                onClick={() => deleteRequest(request.id)}
                style={{
                  padding: '8px 12px',
                  background: '#ff3b3b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                Löschen
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
