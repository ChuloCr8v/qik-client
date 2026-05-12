const ANIME_ADJECTIVES = [
  'Swift', 'Silent', 'Mighty', 'Brave', 'Crimson', 'Azure', 'Golden', 'Shadow', 
  'Iron', 'Wind', 'Lightning', 'Frost', 'Mystic', 'Eternal', 'Radiant', 'Fierce'
];

const ANIME_NOUNS = [
  'Shinobi', 'Titan', 'Ronin', 'Spirit', 'Sage', 'Falcon', 'Wolf', 'Dragon', 
  'Knight', 'Hunter', 'Samurai', 'Legend', 'Wanderer', 'Paladin', 'Striker', 'Hero'
];

const ANIME_TITLES = [
  'Hokage', 'Captain', 'Sensei', 'Lord', 'King', 'Queen', 'Master', 'Elder'
];

export function generateAnimeName(seed?: string): string {
  const s = seed || Math.random().toString();
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = s.charCodeAt(i) + ((hash << 5) - hash);
  }

  const adj = ANIME_ADJECTIVES[Math.abs(hash) % ANIME_ADJECTIVES.length];
  const noun = ANIME_NOUNS[Math.abs(hash >> 2) % ANIME_NOUNS.length];
  
  // 30% chance of adding a title
  if (Math.abs(hash >> 4) % 10 < 3) {
    const title = ANIME_TITLES[Math.abs(hash >> 6) % ANIME_TITLES.length];
    return `${title} ${adj} ${noun}`;
  }

  return `${adj} ${noun}`;
}

export function getAnimeAvatar(seed: string): string {
  const normalizedSeed = seed.trim().toLowerCase();
  // Using DiceBear Lorelei for that hand-drawn anime/manga look
  return `https://api.dicebear.com/7.x/lorelei/svg?seed=${encodeURIComponent(normalizedSeed)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
}
