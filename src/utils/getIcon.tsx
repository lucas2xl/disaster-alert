import { Image, IImageProps } from 'native-base';

import winds from '../assets/winds.png';
import flood from '../assets/flood.png';
import storm from '../assets/storm.png';
import tornado from '../assets/tornado.png';
import fire from '../assets/fire.png';
import eruption from '../assets/eruption.png';
import earthquake from '../assets/earthquake.png';
import caveIn from '../assets/cave-in.png';
import treeFall from '../assets/tree-fall.png';

interface getIconProps extends IImageProps {
  category: string;
}
export function getIcon({ category, ...rest }: getIconProps) {
  let icon;

  switch (category) {
    case 'winds':
      icon = winds;
      break;
    case 'storm':
      icon = storm;
      break;
    case 'tornado':
      icon = tornado;
      break;
    case 'fire':
      icon = fire;
      break;
    case 'eruption':
      icon = eruption;
      break;
    case 'earthquake':
      icon = earthquake;
      break;
    case 'cave-in':
      icon = caveIn;
      break;
    case 'tree-fall':
      icon = treeFall;
      break;
    case 'flood':
      icon = flood;
      break;

    default:
      break;
  }

  return (
    <Image
      source={icon}
      h="10"
      w="10"
      resizeMode="contain"
      alt="icon"
      {...rest}
    />
  );
}
