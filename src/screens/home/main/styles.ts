import {HDP} from '@helpers';
import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

const style = StyleSheet.create({
  pageWrap: {
    height,
    backgroundColor: '#fff',
    paddingHorizontal: HDP(24),
  },
  modeBox: {
    paddingHorizontal: HDP(10),
    paddingVertical: HDP(14),
    borderRadius: HDP(8),
  },
  whenBox: {
    paddingVertical: HDP(6),
    paddingHorizontal: HDP(10),
    borderRadius: HDP(4),
  },
  dateInput: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: HDP(14),
    paddingVertical: HDP(14),
  },
  timeBox: {
    borderRadius: HDP(8),
    paddingHorizontal: HDP(10),
    paddingVertical: HDP(14),
    marginBottom: HDP(10),
  },
});

export default style;
