import {SvgIcon} from '@components/svg-icon';
import {Text} from '@components/text';
import {HDP} from '@helpers';
import {palette} from '@theme';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Keyboard,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import styles from './styles';

interface IButton extends TouchableOpacityProps {
  color?: ViewStyle['backgroundColor'];
  outlined?: boolean;
  radius?: ViewStyle['borderRadius'];
  flex?: ViewStyle['flex'];
  row?: boolean;
  justify?: ViewStyle['justifyContent'];
  justifyContent?: ViewStyle['justifyContent'];
  align?: ViewStyle['alignItems'];
  alignItems?: ViewStyle['alignItems'];
  shadow?: {
    color?: ViewStyle['shadowColor'];
    offset?: ViewStyle['shadowOffset'];
    opacity?: ViewStyle['shadowOpacity'];
    radius?: ViewStyle['shadowRadius'];
  };
  width?: ViewStyle['width'];
  height?: ViewStyle['height'];
  position?: ViewStyle['position'];
  top?: ViewStyle['top'];
  right?: ViewStyle['right'];
  bottom?: ViewStyle['bottom'];
  left?: ViewStyle['left'];
  textStyle?: TextStyle;
  disabled?: boolean;
  style?: any;
  onPress?: () => void;
  loading?: boolean;
  iconName?: string;
  iconSize?: number;
  iconName2?: string;
  iconSize2?: number;
  title;
  iconContainerStyle?: ViewStyle;
  maxHeight?: number;
  loadText?: string;
  hapticType?: 'light' | 'medium' | 'heavy';
}

const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const generateTestID = (title: string) => {
  return title.replace(/\s+/g, '');
};

export const Button = ({
  color = palette.purple,
  outlined,
  radius,
  flex,
  row,
  justify,
  justifyContent,
  align,
  alignItems,
  shadow,
  height,
  width,
  position,
  style,
  top,
  right,
  bottom,
  left,
  disabled,
  onPress,
  iconName,
  iconSize,
  iconName2,
  iconSize2,
  activeOpacity = 0.8,
  loading,
  title,
  textStyle,
  iconContainerStyle,
  maxHeight,
  loadText,
  hapticType = 'medium',
  ...props
}: IButton) => {
  const buttonStyle = StyleSheet.flatten([
    color !== undefined && {backgroundColor: color},
    outlined && {
      borderWidth: 1,
      borderColor: color,
      backgroundColor: 'transparent',
    },
    radius !== undefined && {borderRadius: radius},
    flex !== undefined && {flex},
    row && {flexDirection: 'row'},
    justify !== undefined && {justifyContent: justify},
    justifyContent !== undefined && {justifyContent},
    align !== undefined && {alignItems: align},
    alignItems !== undefined && {alignItems},
    shadow !== undefined && {...shadow},
    {minHeight: height || 48},
    {maxHeight: height || 60},
    {minWidth: width || 48},
    position !== undefined && {position},
    top !== undefined && {top},
    right !== undefined && {right},
    bottom !== undefined && {bottom},
    left !== undefined && {left},
    disabled && {opacity: 0.5},
  ]);

  const [loadingDots, setLoadingDots] = useState<string>('');

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingDots(prevDots => {
          if (prevDots.length === 3) {
            return '';
          }
          return prevDots + '.';
        });
      }, 500);

      return () => clearInterval(interval);
    } else {
      setLoadingDots('');
    }
  }, [loading]);

  const handlePress = useCallback(
    event => {
      if (onPress) {
        onPress();
        Keyboard.dismiss();
      }
    },
    [onPress, hapticType],
  );

  const testID = generateTestID(title);

  return (
    <TouchableOpacity
      style={[
        buttonStyle,
        {
          borderRadius: HDP(8),
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: HDP(19),
          opacity: loading || disabled ? 0.5 : 1,
        },
        style,
      ]}
      disabled={disabled || loading}
      activeOpacity={activeOpacity}
      onPress={handlePress}
      testID={testID}
      {...props}>
      {loading ? (
        <View />
      ) : (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: HDP(8),
            justifyContent: 'center',
          }}>
          {iconName && (
            <View style={[styles.iconContainer, iconContainerStyle]}>
              <SvgIcon name={iconName} size={iconSize || 20} />
            </View>
          )}
          <Text center size={14} medium color="#fff" style={textStyle}>
            {loading ? loadText : title}
          </Text>
          {iconName2 && (
            <View style={[styles.iconContainer, iconContainerStyle]}>
              <SvgIcon name={iconName2} size={iconSize2 || 20} />
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};
