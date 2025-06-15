import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { dimensions: string[] } }
) {
  const [width, height] = params.dimensions;
  const w = parseInt(width) || 300;
  const h = parseInt(height) || 200;

  const svg = `
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="placeholderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#e5e7eb;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#d1d5db;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#placeholderGrad)"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" fill="#6b7280" text-anchor="middle" dominant-baseline="middle">${w} × ${h}</text>
    </svg>
  `;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
} 