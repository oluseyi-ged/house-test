import {HDP, RF} from '@helpers';
import {family, palette} from '@theme';
import {Dimensions, StyleSheet} from 'react-native';

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: HDP(24),
    maxHeight: height * 0.8,
    backgroundColor: '#fafafa',
    overflow: 'hidden',
  },
  innerBox: {
    paddingHorizontal: HDP(20),
    paddingVertical: HDP(24),
    borderRadius: HDP(12),
    height: height * 0.7,
  },
  inputWrap: {
    borderRadius: HDP(12),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#F5F5F5',
    // paddingVertical: HDP(22),
    height: HDP(60),
    paddingHorizontal: HDP(14),
    justifyContent: 'space-between',
  },
  label: {
    alignSelf: 'flex-start',
  },
  error: {
    fontSize: RF(6),
    color: '#800000',
    fontFamily: family.Regular,
    alignSelf: 'flex-start',
    marginTop: HDP(5),
  },
  input: {
    fontFamily: family.Regular,
    color: palette.dark,
  },
  placeholder: {
    fontFamily: family.Regular,
    color: '#887f94',
  },
  title: {
    fontSize: RF(14),
    fontFamily: family.Medium,
    color: palette.dark,
    textAlign: 'center',
  },
  name: {
    color: palette.dark,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: HDP(25),
    borderBottomWidth: HDP(0.5),
    borderColor: '#e3e3e3',
    paddingBottom: HDP(25),
  },
  image: {
    width: HDP(56),
    borderRadius: HDP(50),
    height: HDP(56),
  },
  empty: {
    textAlign: 'center',
    marginBottom: HDP(50),
    color: '#313131',
    fontSize: RF(12),
    fontFamily: family.Medium,
  },
  gif: {
    height: HDP(150),
    width: HDP(150),
  },
});

export default styles;
