export type RadioStationId = 'lofi' | 'storm' | 'dialup';

export type RadioStation = {
  id: RadioStationId;
  name: string;
  desc: string;
  streamUrl: string;
};

export const RADIO_STATIONS: RadioStation[] = [
  {
    id: 'lofi',
    name: 'Lo-Fi Rhino',
    desc: 'Late-night grooves for long sessions.',
    streamUrl: 'https://ice1.somafm.com/groovesalad-128-mp3',
  },
  {
    id: 'storm',
    name: 'Packet Storm',
    desc: 'Deep ambient and spy jazz.',
    streamUrl: 'https://ice1.somafm.com/secretagent-128-mp3',
  },
  {
    id: 'dialup',
    name: 'Dial-Up Dreams',
    desc: 'Retro beats and warm static.',
    streamUrl: 'https://ice1.somafm.com/beatblender-128-mp3',
  },
];

export function stationById(id: RadioStationId) {
  return RADIO_STATIONS.find((s) => s.id === id);
}
