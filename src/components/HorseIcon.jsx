// Reusable horse SVG icons in different poses

export function HorseRunning({ className = "w-6 h-6", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M52 14c-2-3-5-4-8-4-2 0-4 1-6 3l-4 5-8-2c-3-1-6 0-8 2l-4 5-6 1c-2 0-3 2-3 4s1 4 3 4h2l-2 8c-1 2 0 4 2 5s4 0 5-2l3-7 6 2-1 7c0 2 1 4 3 5 2 0 4-1 5-3l2-9 5-1 4 8c1 2 3 3 5 2s3-3 2-5l-5-11 3-4c3-3 5-7 4-11z"
        fill={color} fillOpacity="0.9"/>
      <circle cx="46" cy="13" r="2" fill={color}/>
    </svg>
  );
}

export function HorseHead({ className = "w-6 h-6", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M44 8c-3-2-7-2-10 0l-6 5-4 8-2 10c0 3 1 5 3 7l8 6 4 8c1 2 3 3 5 2l2-1c2-1 2-3 1-5l-3-7 2-3 8 2c2 1 4 0 5-2s0-4-2-5l-8-3 1-6 4-4c2-2 2-6 0-8l-2-2-6-2z"
        fill={color} fillOpacity="0.9"/>
      <circle cx="38" cy="16" r="2" fill="#0A0F0D"/>
      <path d="M28 34l-4 2" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function HorseGalloping({ className = "w-6 h-6", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 80 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M65 10c-1-2-3-4-6-4-2 0-4 1-5 2l-3 3-12-1c-3 0-6 1-8 3L22 22l-8-2c-2-1-4 0-5 2l-1 3c0 2 1 3 3 3l7 1-3 6c-1 2 0 4 2 4h1c2 0 3-1 4-3l3-6h5l-1 8c0 2 1 4 3 4h1c2 0 3-2 3-4l1-10 8-5 6 10c1 2 3 3 5 2 2 0 3-2 3-4l-5-12 2-2c3-2 5-5 5-8z"
        fill={color} fillOpacity="0.85"/>
      <circle cx="61" cy="9" r="1.5" fill={color}/>
      <path d="M64 7l4-2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function HorseSilhouette({ className = "w-6 h-6", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 100 80" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M85 18c-2-5-7-8-12-8-3 0-5 1-7 3l-5 6-15-2c-4-1-8 1-11 4L24 33l-10-3c-3-1-6 1-7 4v2c0 3 2 5 5 5l9 1-4 10c-1 3 1 6 4 7h2c3 0 5-2 6-4l4-10 8 2-1 12c0 3 2 6 5 6h2c3 0 5-2 5-5l2-14 8-3 8 14c1 3 4 4 7 3 3-2 4-5 3-7L68 36l3-4c4-4 6-8 5-14z"
        fill={color} fillOpacity="0.15" stroke={color} strokeOpacity="0.3" strokeWidth="1"/>
    </svg>
  );
}

export function TripleHorses({ className = "w-24 h-12", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 200 60" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Back horse (faded) */}
      <g opacity="0.2" transform="translate(0, 8) scale(0.6)">
        <path d="M65 10c-1-2-3-4-6-4-2 0-4 1-5 2l-3 3-12-1c-3 0-6 1-8 3L22 22l-8-2c-2-1-4 0-5 2l-1 3c0 2 1 3 3 3l7 1-3 6c-1 2 0 4 2 4h1c2 0 3-1 4-3l3-6h5l-1 8c0 2 1 4 3 4h1c2 0 3-2 3-4l1-10 8-5 6 10c1 2 3 3 5 2 2 0 3-2 3-4l-5-12 2-2c3-2 5-5 5-8z" fill={color}/>
      </g>
      {/* Mid horse */}
      <g opacity="0.45" transform="translate(55, 4) scale(0.7)">
        <path d="M65 10c-1-2-3-4-6-4-2 0-4 1-5 2l-3 3-12-1c-3 0-6 1-8 3L22 22l-8-2c-2-1-4 0-5 2l-1 3c0 2 1 3 3 3l7 1-3 6c-1 2 0 4 2 4h1c2 0 3-1 4-3l3-6h5l-1 8c0 2 1 4 3 4h1c2 0 3-2 3-4l1-10 8-5 6 10c1 2 3 3 5 2 2 0 3-2 3-4l-5-12 2-2c3-2 5-5 5-8z" fill={color}/>
      </g>
      {/* Front horse (full) */}
      <g opacity="0.85" transform="translate(115, 0) scale(0.8)">
        <path d="M65 10c-1-2-3-4-6-4-2 0-4 1-5 2l-3 3-12-1c-3 0-6 1-8 3L22 22l-8-2c-2-1-4 0-5 2l-1 3c0 2 1 3 3 3l7 1-3 6c-1 2 0 4 2 4h1c2 0 3-1 4-3l3-6h5l-1 8c0 2 1 4 3 4h1c2 0 3-2 3-4l1-10 8-5 6 10c1 2 3 3 5 2 2 0 3-2 3-4l-5-12 2-2c3-2 5-5 5-8z" fill={color}/>
      </g>
    </svg>
  );
}

export default HorseRunning;
