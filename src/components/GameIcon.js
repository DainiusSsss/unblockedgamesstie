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
  Play,
  Car,
  Box,
  Video,
  Smartphone,
  Compass,
  Coffee,
  Globe,
  Music,
  Camera,
  Bot,
  Shield,
  Tv,
  Film,
  Volume2,
  Target
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
    case 'Target':
      return <Target className={className} />;
    case 'ExternalLink':
      return <ExternalLink className={className} />;
    case 'Flame':
      return <Flame className={className} />;
    case 'Trophy':
      return <Trophy className={className} />;
    case 'Car':
      return <Car className={className} />;
    case 'Box':
      return <Box className={className} />;
    case 'Video':
      return <Video className={className} />;
    case 'Music':
      return <Music className={className} />;
    case 'Camera':
      return <Camera className={className} />;
    case 'Bot':
      return <Bot className={className} />;
    case 'Shield':
      return <Shield className={className} />;
    case 'Tv':
      return <Tv className={className} />;
    case 'Film':
      return <Film className={className} />;
    case 'Volume2':
      return <Volume2 className={className} />;
    case 'Smartphone':
      return <Smartphone className={className} />;
    case 'Compass':
      return <Compass className={className} />;
    case 'Coffee':
      return <Coffee className={className} />;
    case 'Globe':
      return <Globe className={className} />;
    default:
      return <Play className={className} />;
  }
};
