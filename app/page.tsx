'use client';

import { useEffect, useState } from 'react';
import { supabase } from './supabase';

type RequestItem = {
  id?: number;
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
    const { data, error } = await supabase
      .from('requests')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setRequests(data || []);
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
      console.log(error);
      return;
    }

    setName('');
    setPhone('');
    setService('');

    await loadRequests();
    alert('Gespeichert!');
  }

  function getWhatsAppLink(request: RequestItem) {
    const text = `Hallo ${request.name}, danke für deine Anfrage zu ${request.service}.`;
    return `https://wa.me/${request.phone}?text=${encodeURIComponent(text)}`;
  }

  async function deleteRequest(id?: number) {
    if (!id) return;

    const { error } = await supabase
      .from('requests')
      .delete()
      .eq('id', id);

    if (error) {
      alert('Fehler beim Löschen');
      console.log(error);
      return;
    }

    await loadRequests();
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '40px',
        background: '#f5f5f5',
        minHeight: '100vh',
        fontFamily: 'Arial',
      }}
    >
      <div
        style={{
          background: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          width: '420px',
        }}
      >
        <h1 style={{ textAlign: 'center', marginBottom: '25px' }}>QuoteFast</h1>

        <h3>Neue Anfrage</h3>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            boxSizing: 'border-box',
          }}
        />

        <input
          placeholder="Telefon"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            boxSizing: 'border-box',
          }}
        />

        <input
          placeholder="Service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            boxSizing: 'border-box',
          }}
        />

        <button
          onClick={saveRequest}
          style={{
            width: '100%',
            padding: '12px',
            background: 'black',
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

        {requests.length === 0 ? (
          <p>Noch keine Anfragen</p>
        ) : (
          requests.map((request) => (
            <div
              key={request.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '10px',
                background: '#fafafa',
              }}
            >
              <strong>{request.name}</strong>
              <p style={{ margin: '6px 0' }}>Telefon: {request.phone}</p>
              <p style={{ margin: '6px 0' }}>Service: {request.service}</p>

              <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                <a
                  href={getWhatsAppLink(request)}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-block',
                    padding: '8px 12px',
                    background: 'green',
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
                    background: '#c62828',
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
          ))
        )}
      </div>
    </div>
  );
}