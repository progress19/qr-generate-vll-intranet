// app/page.js

'use client';

import { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [qrCode, setQrCode] = useState('');

  const generateQRCode = async () => {
    try {
      const response = await fetch(`/api/generate-qr?text=${encodeURIComponent(text)}`);
      const data = await response.json();
      setQrCode(data.qrCodeDataURL);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  return (
    <div>
      <h1>QR Code Generator</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to generate QR code"
      />
      <button onClick={generateQRCode}>Generate QR Code</button>
      {qrCode && <img src={qrCode} alt="Generated QR Code" />}
    </div>
  );
}
