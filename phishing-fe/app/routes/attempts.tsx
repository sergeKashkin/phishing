import { useEffect, useState } from "react";

export default function Attempts() {
  const [attempts, setAttempts] = useState<{ email: string; status: string; _id: string }[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:3001/all', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setAttempts);

    const eventSource = new EventSource('http://localhost:3001/events');

    eventSource.onmessage = (event) => {
      const updated = JSON.parse(event.data);
        console.log(updated);
      setAttempts((prev) =>
        prev.map((a) => (a._id === updated._id ? updated : a))
      );
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const handleSendAttempt = async () => {
    const email = prompt('Enter email to send phishing attempt:');
  
    if (!email) return;
  
    const token = localStorage.getItem('token');
  
    const res = await fetch('http://localhost:3001/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email }),
    });
  
    if (res.ok) {
      alert('✅ Phishing email sent!');
      const answer = await res.json();
      setAttempts([answer, ...attempts]);
    } else {
      alert('❌ Failed to send phishing attempt.');
    }
  };

  return (
    <div>
      <h2>Phishing Attempts</h2>
      <button onClick={handleSendAttempt}>Send Phishing Attempt</button>
      <ul>
        {attempts?.map((a) => (
          <li key={a._id}>{a.email} — {a.status}</li>
        ))}
      </ul>
    </div>
  );
}
