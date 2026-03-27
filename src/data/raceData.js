// Sample race data derived from the GPS Races dataset
// Featured Race: Aqueduct Race 1 - Dec 26, 2025 - 6.5F Dirt MSW $85,000

export const HORSE_COLORS = [
  '#C2653A', '#4ECDC4', '#5B8DEF', '#E8B86D', '#9B72CF',
  '#5BEF8D', '#EF5B5B', '#F09070', '#D4A574', '#8B4226',
  '#FF6B9D', '#45B7D1'
];

export const featuredRace = {
  track: 'AQU',
  trackName: 'Aqueduct',
  date: '2025-12-26',
  raceNumber: 1,
  distance: '6 1/2F',
  surface: 'Dirt',
  type: 'MSW',
  purse: '$85,000',
  fieldSize: 6,
  horses: [
    { name: 'Interstatelovesong', post: 1, odds: '6/5', finalPos: 1, color: '#5BEF8D' },
    { name: 'Call Me Jal', post: 2, odds: '15/1', finalPos: 4, color: '#5B8DEF' },
    { name: 'Carolannie', post: 3, odds: '6/1', finalPos: 6, color: '#EF5B5B' },
    { name: "Dolly's Jolene", post: 4, odds: '8/1', finalPos: 5, color: '#9B72CF' },
    { name: 'Lady Chatterley', post: 5, odds: '5/2', finalPos: 2, color: '#E8B86D' },
    { name: 'Some Ride', post: 6, odds: '7/2', finalPos: 3, color: '#4ECDC4' },
  ],
};

// Gate-by-gate GPS data for the featured race (position at each gate)
export const gpsRaceData = [
  { gate: 6.0, label: 'Start', positions: { 'Interstatelovesong': 1, 'Call Me Jal': 2, 'Carolannie': 5, "Dolly's Jolene": 6, 'Lady Chatterley': 3, 'Some Ride': 4 } },
  { gate: 5.5, label: '0.5F', positions: { 'Interstatelovesong': 1, 'Call Me Jal': 2, 'Carolannie': 5, "Dolly's Jolene": 6, 'Lady Chatterley': 3, 'Some Ride': 4 } },
  { gate: 5.0, label: '1.0F', positions: { 'Interstatelovesong': 1, 'Call Me Jal': 2, 'Carolannie': 5, "Dolly's Jolene": 6, 'Lady Chatterley': 4, 'Some Ride': 3 } },
  { gate: 4.5, label: '1.5F', positions: { 'Interstatelovesong': 1, 'Call Me Jal': 2, 'Carolannie': 5, "Dolly's Jolene": 6, 'Lady Chatterley': 4, 'Some Ride': 3 } },
  { gate: 4.0, label: '2.0F', positions: { 'Interstatelovesong': 1, 'Call Me Jal': 3, 'Carolannie': 5, "Dolly's Jolene": 6, 'Lady Chatterley': 4, 'Some Ride': 2 } },
  { gate: 3.5, label: '2.5F', positions: { 'Interstatelovesong': 1, 'Call Me Jal': 3, 'Carolannie': 5, "Dolly's Jolene": 6, 'Lady Chatterley': 4, 'Some Ride': 2 } },
  { gate: 3.0, label: '3.0F', positions: { 'Interstatelovesong': 1, 'Call Me Jal': 3, 'Carolannie': 6, "Dolly's Jolene": 5, 'Lady Chatterley': 4, 'Some Ride': 2 } },
  { gate: 2.5, label: '3.5F', positions: { 'Interstatelovesong': 1, 'Call Me Jal': 3, 'Carolannie': 6, "Dolly's Jolene": 5, 'Lady Chatterley': 2, 'Some Ride': 4 } },
  { gate: 2.0, label: '4.0F', positions: { 'Interstatelovesong': 1, 'Call Me Jal': 3, 'Carolannie': 6, "Dolly's Jolene": 5, 'Lady Chatterley': 2, 'Some Ride': 4 } },
  { gate: 1.5, label: '4.5F', positions: { 'Interstatelovesong': 1, 'Call Me Jal': 4, 'Carolannie': 6, "Dolly's Jolene": 5, 'Lady Chatterley': 2, 'Some Ride': 3 } },
  { gate: 1.0, label: '5.0F', positions: { 'Interstatelovesong': 1, 'Call Me Jal': 4, 'Carolannie': 6, "Dolly's Jolene": 5, 'Lady Chatterley': 2, 'Some Ride': 3 } },
  { gate: 0.5, label: '5.5F', positions: { 'Interstatelovesong': 1, 'Call Me Jal': 4, 'Carolannie': 6, "Dolly's Jolene": 5, 'Lady Chatterley': 2, 'Some Ride': 3 } },
  { gate: 0.0, label: 'Finish', positions: { 'Interstatelovesong': 1, 'Call Me Jal': 4, 'Carolannie': 6, "Dolly's Jolene": 5, 'Lady Chatterley': 2, 'Some Ride': 3 } },
];

// Speed data per gate (mph approximated from sectional times)
export const speedData = [
  { gate: '0.5F', 'Interstatelovesong': 34.2, 'Call Me Jal': 33.8, 'Carolannie': 32.1, "Dolly's Jolene": 31.5, 'Lady Chatterley': 33.5, 'Some Ride': 33.0 },
  { gate: '1.0F', 'Interstatelovesong': 36.8, 'Call Me Jal': 36.2, 'Carolannie': 34.5, "Dolly's Jolene": 34.0, 'Lady Chatterley': 36.5, 'Some Ride': 36.0 },
  { gate: '1.5F', 'Interstatelovesong': 37.5, 'Call Me Jal': 36.8, 'Carolannie': 35.2, "Dolly's Jolene": 34.8, 'Lady Chatterley': 37.2, 'Some Ride': 36.5 },
  { gate: '2.0F', 'Interstatelovesong': 38.1, 'Call Me Jal': 37.2, 'Carolannie': 35.8, "Dolly's Jolene": 35.2, 'Lady Chatterley': 37.8, 'Some Ride': 37.0 },
  { gate: '2.5F', 'Interstatelovesong': 38.5, 'Call Me Jal': 37.5, 'Carolannie': 36.0, "Dolly's Jolene": 35.5, 'Lady Chatterley': 38.2, 'Some Ride': 37.2 },
  { gate: '3.0F', 'Interstatelovesong': 38.8, 'Call Me Jal': 37.8, 'Carolannie': 36.2, "Dolly's Jolene": 35.8, 'Lady Chatterley': 38.5, 'Some Ride': 37.5 },
  { gate: '3.5F', 'Interstatelovesong': 38.5, 'Call Me Jal': 37.5, 'Carolannie': 36.5, "Dolly's Jolene": 36.0, 'Lady Chatterley': 38.8, 'Some Ride': 37.0 },
  { gate: '4.0F', 'Interstatelovesong': 38.0, 'Call Me Jal': 37.0, 'Carolannie': 36.0, "Dolly's Jolene": 35.5, 'Lady Chatterley': 38.5, 'Some Ride': 36.5 },
  { gate: '4.5F', 'Interstatelovesong': 37.5, 'Call Me Jal': 36.5, 'Carolannie': 35.5, "Dolly's Jolene": 35.0, 'Lady Chatterley': 38.0, 'Some Ride': 36.0 },
  { gate: '5.0F', 'Interstatelovesong': 37.0, 'Call Me Jal': 36.0, 'Carolannie': 35.0, "Dolly's Jolene": 34.5, 'Lady Chatterley': 37.8, 'Some Ride': 35.8 },
  { gate: '5.5F', 'Interstatelovesong': 36.5, 'Call Me Jal': 35.5, 'Carolannie': 34.5, "Dolly's Jolene": 34.0, 'Lady Chatterley': 37.5, 'Some Ride': 35.5 },
  { gate: 'Finish', 'Interstatelovesong': 36.0, 'Call Me Jal': 35.0, 'Carolannie': 34.0, "Dolly's Jolene": 33.5, 'Lady Chatterley': 37.2, 'Some Ride': 35.2 },
];

// Stride length data per section
export const strideData = [
  { gate: '1.0F', 'Interstatelovesong': 23.5, 'Call Me Jal': 23.1, 'Carolannie': 22.8, "Dolly's Jolene": 22.5, 'Lady Chatterley': 23.3, 'Some Ride': 22.9 },
  { gate: '2.0F', 'Interstatelovesong': 24.2, 'Call Me Jal': 23.8, 'Carolannie': 23.2, "Dolly's Jolene": 23.0, 'Lady Chatterley': 24.0, 'Some Ride': 23.5 },
  { gate: '3.0F', 'Interstatelovesong': 24.5, 'Call Me Jal': 24.0, 'Carolannie': 23.5, "Dolly's Jolene": 23.2, 'Lady Chatterley': 24.3, 'Some Ride': 23.8 },
  { gate: '4.0F', 'Interstatelovesong': 24.0, 'Call Me Jal': 23.5, 'Carolannie': 23.0, "Dolly's Jolene": 22.8, 'Lady Chatterley': 24.5, 'Some Ride': 23.2 },
  { gate: '5.0F', 'Interstatelovesong': 23.5, 'Call Me Jal': 23.0, 'Carolannie': 22.5, "Dolly's Jolene": 22.2, 'Lady Chatterley': 24.2, 'Some Ride': 22.8 },
  { gate: 'Finish', 'Interstatelovesong': 23.0, 'Call Me Jal': 22.5, 'Carolannie': 22.0, "Dolly's Jolene": 21.8, 'Lady Chatterley': 23.8, 'Some Ride': 22.5 },
];

// Ground loss data (extra meters run vs rail path)
export const groundLossData = [
  { name: 'Interstatelovesong', totalDistance: 1310, railDistance: 1306, groundLoss: 4, adjustedRank: 1 },
  { name: 'Lady Chatterley', totalDistance: 1325, railDistance: 1306, groundLoss: 19, adjustedRank: 1 },
  { name: 'Some Ride', totalDistance: 1318, railDistance: 1306, groundLoss: 12, adjustedRank: 3 },
  { name: 'Call Me Jal', totalDistance: 1315, railDistance: 1306, groundLoss: 9, adjustedRank: 4 },
  { name: "Dolly's Jolene", totalDistance: 1320, railDistance: 1306, groundLoss: 14, adjustedRank: 5 },
  { name: 'Carolannie', totalDistance: 1318, railDistance: 1306, groundLoss: 12, adjustedRank: 6 },
];

// Upcoming races data
export const upcomingRaces = [
  {
    track: 'AQU',
    trackName: 'Aqueduct',
    date: '2026-03-27',
    raceNumber: 1,
    distance: '6F',
    surface: 'Dirt',
    purse: '$50,000',
    type: 'CLM',
    horses: [
      { name: 'Luna Moth', post: 4, odds: '9/5', jockey: 'L. Rivera Jr.', trainer: 'M. Friedman', style: 'Stalker', winProb: 28, valueScore: 82 },
      { name: 'Floge', post: 3, odds: '8/5', jockey: 'J. Lezcano', trainer: 'J. Romero', style: 'Front Runner', winProb: 31, valueScore: 65 },
      { name: 'Foxy Cara', post: 5, odds: '4/1', jockey: 'G. Kocakaya', trainer: 'C. Figueroa Jr.', style: 'Closer', winProb: 18, valueScore: 91 },
      { name: 'Hauntress', post: 1, odds: '6/1', jockey: 'D. Rivera', trainer: 'A. Arriaga', style: 'Stalker', winProb: 12, valueScore: 74 },
      { name: 'Troubled Luck', post: 6, odds: '10/1', jockey: 'J. Vargas Jr.', trainer: 'E. DeLauro', style: 'Closer', winProb: 8, valueScore: 88 },
    ],
  },
  {
    track: 'GP',
    trackName: 'Gulfstream Park',
    date: '2026-03-27',
    raceNumber: 3,
    distance: '1M',
    surface: 'Dirt',
    purse: '$75,000',
    type: 'ALW',
    horses: [
      { name: 'Storm Chaser', post: 2, odds: '3/1', jockey: 'T. Gaffalione', trainer: 'T. Pletcher', style: 'Front Runner', winProb: 24, valueScore: 70 },
      { name: 'Night Protocol', post: 5, odds: '5/2', jockey: 'L. Saez', trainer: 'C. McGaughey', style: 'Stalker', winProb: 27, valueScore: 76 },
      { name: 'Copper Ridge', post: 1, odds: '7/2', jockey: 'J. Castellano', trainer: 'B. Cox', style: 'Closer', winProb: 22, valueScore: 85 },
      { name: 'Echo Valley', post: 4, odds: '6/1', jockey: 'I. Ortiz Jr.', trainer: 'W. Mott', style: 'Stalker', winProb: 15, valueScore: 92 },
      { name: 'Bold Summit', post: 3, odds: '8/1', jockey: 'F. Prat', trainer: 'S. Asmussen', style: 'Front Runner', winProb: 12, valueScore: 60 },
    ],
  },
];

// Stats for the overview
export const overviewStats = {
  totalRaces: 2847,
  totalGPSDataPoints: 985000,
  tracksWithGPS: 32,
  latestGenTracks: 16,
  dateRange: 'Dec 24, 2025 - Mar 24, 2026',
  avgFieldSize: 8.2,
};

// Running style classifications
export const runningStyles = {
  'Front Runner': { color: '#5BEF8D', description: 'Leads from the start, sets the pace' },
  'Stalker': { color: '#E8B86D', description: 'Sits 2nd-3rd, strikes in the stretch' },
  'Closer': { color: '#9B72CF', description: 'Runs from behind, powerful late kick' },
  'Presser': { color: '#5B8DEF', description: 'Applies pressure to the leader mid-race' },
};

// Pace scenario projection for upcoming race
export const paceProjection = [
  { section: 'Break', 'Floge': 1, 'Luna Moth': 3, 'Foxy Cara': 5, 'Hauntress': 2, 'Troubled Luck': 4 },
  { section: '2F', 'Floge': 1, 'Luna Moth': 3, 'Foxy Cara': 5, 'Hauntress': 2, 'Troubled Luck': 4 },
  { section: '4F', 'Floge': 1, 'Luna Moth': 2, 'Foxy Cara': 4, 'Hauntress': 3, 'Troubled Luck': 5 },
  { section: 'Stretch', 'Floge': 3, 'Luna Moth': 1, 'Foxy Cara': 2, 'Hauntress': 4, 'Troubled Luck': 5 },
  { section: 'Finish', 'Floge': 4, 'Luna Moth': 1, 'Foxy Cara': 2, 'Hauntress': 3, 'Troubled Luck': 5 },
];

// Traditional vs GPS comparison data
export const comparisonData = {
  traditional: {
    dataPoints: 5,
    label: 'Points of Call',
    metrics: ['Position', 'Lengths Behind', 'Lengths Ahead'],
    precision: 'Estimated by chart caller',
    example: 'Horse A finished 3rd, 2 lengths behind'
  },
  gps: {
    dataPoints: 13,
    label: 'GPS Gates (per 1/16 mile)',
    metrics: ['Exact Position', 'Sectional Time', 'Running Time', 'Distance Behind (m)', 'Distance Ran (m)', 'Stride Count', 'Stride Length'],
    precision: '10Hz RTK GPS tracking',
    example: 'Horse A ran 1,325m total (19m ground loss), peak 38.8mph at gate 3, stride shortened 6% in final furlong'
  }
};
