import React from 'react';
import {
  Gamepad2,
  Layers,
  Rocket,
  Bird,
  Activity,
  Grid,
  Hash,
  Footprints,
  CircleDot,
  Bomb,
  Crosshair,
  ExternalLink,
  Flame,
  Trophy,
  Play
} from 'lucide-react';

export const GameIcon = ({ name, className = "w-6 h-6" }) => {
  switch (name) {
    case 'Gamepad2':
      return <Gamepad2 className={className} />;
    case 'Layers':
      return <Layers className={className} />;
    case 'Rocket':
      return <Rocket className={className} />;
    case 'Bird':
      return <Bird className={className} />;
    case 'Activity':
      return <Activity className={className} />;
    case 'Grid':
      return <Grid className={className} />;
    case 'Hash':
      return <Hash className={className} />;
    case 'Footprints':
      return <Footprints className={className} />;
    case 'CircleDot':
      return <CircleDot className={className} />;
    case 'Bomb':
      return <Bomb className={className} />;
    case 'Crosshair':
      return <Crosshair className={className} />;
    case 'ExternalLink':
      return <ExternalLink className={className} />;
    case 'Flame':
      return <Flame className={className} />;
    case 'Trophy':
      return <Trophy className={className} />;
    default:
      return <Play className={className} />;
  }
};
