import { Dimensions, ColorSchemeName } from 'react-native';

export const SIZE = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

export const COLORS = {
  transparent: 'rgba(0,0,0,0)',
  placeholder: '#cccccc',
};

export const STYLES = {
  boxShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
};
