// app/api/generate-qr/route.js

import { NextResponse } from 'next/server';
import QRCode from 'qrcode';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text');

  if (!text) {
    return NextResponse.json({ error: 'Text query parameter is required' }, { status: 400 });
  }

  try {
    const qrCodeDataURL = await QRCode.toDataURL(text, { margin: 1 });
    return NextResponse.json({ qrCodeDataURL });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate QR code' }, { status: 500 });
  }
}
