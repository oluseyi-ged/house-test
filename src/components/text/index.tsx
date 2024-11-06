import {RF} from '@helpers';
import {family} from '@theme';
import React, {FC} from 'react';
import {Text as RNText, StyleSheet, TextStyle} from 'react-native';

interface Props {
  children?: React.ReactNode;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;
  p?: boolean;
  s?: boolean;
  size?: TextStyle['fontSize'];
  fontSize?: TextStyle['fontSize'];
  bold?: boolean;
  semibold?: boolean;
  medium?: boolean;
  italic?: boolean;
  weight?: TextStyle['fontWeight'];
  fontWeight?: TextStyle['fontWeight'];
  center?: boolean;
  color?: TextStyle['color'];
  opacity?: TextStyle['opacity'];
  font?: TextStyle['fontFamily'];
  fontFamily?: TextStyle['fontFamily'];
  align?: TextStyle['textAlign'];
  textAlign?: TextStyle['textAlign'];
  transform?: TextStyle['textTransform'];
  textTransform?: TextStyle['textTransform'];
  lineHeight?: TextStyle['lineHeight'];
  position?: TextStyle['position'];
  top?: TextStyle['top'];
  right?: TextStyle['right'];
  bottom?: TextStyle['bottom'];
  left?: TextStyle['left'];
  style?: any;
  regular?: boolean;
  light?: boolean;
  thin?: boolean;
  disabled?: boolean;
  onPress?: any;
  numberOfLines?: number;
}

export const Text: FC<Props> = ({
  children,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  s,
  size,
  fontSize,
  italic,
  bold,
  semibold,
  weight,
  fontWeight,
  center,
  color = '#0C2039',
  opacity,
  font,
  fontFamily,
  align,
  textAlign,
  transform,
  textTransform,
  lineHeight,
  position,
  top,
  right,
  bottom,
  left,
  style,
  medium,
  light,
  regular,
  thin,
  onPress,
  disabled,
  numberOfLines,
  ...props
}) => {
  const textStyle = StyleSheet.flatten([
    h1 && {fontSize: RF(36)},
    h2 && {fontSize: RF(30)},
    h3 && {fontSize: RF(26)},
    h4 && {fontSize: RF(22)},
    h5 && {fontSize: RF(16)},
    h6 && {fontSize: RF(14)},
    p && {fontSize: RF(14)},
    s && {fontSize: RF(10)},
    center && {textAlign: 'center'},
    (align || textAlign) && {textAlign: textAlign || align},
    (weight || fontWeight) && {fontWeight: fontWeight || weight},
    (transform || textTransform) && {textTransform: textTransform || transform},
    // @ts-ignore
    (size || fontSize) && {fontSize: RF(fontSize) || RF(size)},
    {
      fontFamily: bold
        ? family.Bold
        : medium
        ? family.Medium
        : regular
        ? family.Regular
        : light
        ? family.Light
        : fontFamily || font || family.Regular,
    },
    color && {color},
    opacity && {opacity},
    lineHeight && {lineHeight},
    position && {position},
    right !== undefined && {right},
    left !== undefined && {left},
    top !== undefined && {top},
    bottom !== undefined && {bottom},
    style,
  ]);

  return (
    <RNText
      allowFontScaling={true}
      adjustsFontSizeToFit={false}
      maxFontSizeMultiplier={1.2}
      onPress={onPress}
      disabled={disabled}
      style={[textStyle]}
      numberOfLines={numberOfLines}
      {...props}>
      {children}
    </RNText>
  );
};
