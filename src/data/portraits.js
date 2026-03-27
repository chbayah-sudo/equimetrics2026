const TOTAL_PORTRAITS = 29;

// Deterministic hash so same horse always gets same portrait
function hashName(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = ((h << 5) - h + name.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function getPortrait(horseName) {
  const idx = (hashName(horseName) % TOTAL_PORTRAITS) + 1;
  return `/portraits/horse-${idx}.jpg`;
}
