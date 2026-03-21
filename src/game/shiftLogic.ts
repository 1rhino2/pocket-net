import type { ShiftMission, ShiftMissionKind } from '../data/contentEngine';
import { playHour, playHourBucket } from '../lib/seed';
import type { GameSnapshot, GameStats } from './gameTypes';
import { chronicleSignalsSinceBaseline } from './chronicleLogic';

/** Kept for save compatibility; net index no longer surfaces contract UI. */
export function statBaselines(stats: GameStats): Record<ShiftMissionKind, number> {
  return {
    navs: stats.navs,
    searches: stats.searches,
    mailsRead: stats.mailsRead,
    wikiReads: stats.wikiReads,
    commands: stats.commands,
    hackWins: stats.hackWins,
    arcadeWins: stats.arcadeWins,
    stamps: 0,
    nodes: 0,
    discover: 0,
    chronicleSignals: 0,
  };
}

export function missionProgress(m: ShiftMission, s: GameSnapshot): number {
  switch (m.kind) {
    case 'navs':
      return s.stats.navs - m.baseline;
    case 'searches':
      return s.stats.searches - m.baseline;
    case 'mailsRead':
      return s.stats.mailsRead - m.baseline;
    case 'wikiReads':
      return s.stats.wikiReads - m.baseline;
    case 'commands':
      return s.stats.commands - m.baseline;
    case 'hackWins':
      return s.stats.hackWins - m.baseline;
    case 'arcadeWins':
      return s.stats.arcadeWins - m.baseline;
    case 'stamps':
      return Math.max(0, s.stamps.length - m.baseline);
    case 'discover':
      return s.discovered.length - m.baseline;
    case 'nodes':
      return m.targetNode && s.visitedNodes.includes(m.targetNode) ? 1 : 0;
    case 'chronicleSignals':
      return chronicleSignalsSinceBaseline(s, m.baseline);
    default:
      return 0;
  }
}

export function missionReady(_m: ShiftMission, _s: GameSnapshot) {
  return false;
}

export function refreshShiftMissions(s: GameSnapshot): GameSnapshot {
  const ph = playHour(s.playMs);
  const bucket = playHourBucket(s.playMs);
  if (s.shiftPlayHour === ph && s.activeMissions.length === 0) return s;
  return {
    ...s,
    shiftHourKey: bucket,
    shiftPlayHour: ph,
    activeMissions: [],
  };
}
