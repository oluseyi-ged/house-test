import {Block, TextInput} from '@components';
import {BottomSheet} from '@components/bottom-sheet';
import {SizedBox} from '@components/sized-box';
import {SvgIcon} from '@components/svg-icon';
import {Text} from '@components/text';
import {HDP} from '@helpers';
import {FlashList} from '@shopify/flash-list';
import {palette} from '@theme';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Keyboard,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';

interface BottomSelectProps {
  data?: any;
  title?: any;
  onSelect?: any;
  selected?: string;
  placeholder?: string;
  emptyText?: string;
  error?: string;
  label?: string;
  labelStyle?: any;
  icon?: string;
  iconSize?: number;
  loading?: boolean;
}

const BottomSelect: React.FC<BottomSelectProps> = ({
  data = [],
  title,
  onSelect = () => {},
  selected = '',
  placeholder = 'Select an option',
  emptyText = 'No data available',
  error = '',
  label = '',
  labelStyle,
  icon,
  iconSize,
  loading,
}) => {
  const [show, setShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const {width, height} = Dimensions.get('window');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // Keyboard is open
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // Keyboard is closed
      },
    );

    // Cleanup the event listeners
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const filteredData = data.filter(
    (item: any) =>
      item?.value?.toLowerCase()?.includes(searchQuery.toLowerCase()), // Filter items based on search query
  );

  const renderItem = ({item}: {item: any}) => (
    <TouchableOpacity
      onPress={() => {
        Keyboard.dismiss();
        onSelect(item.key);
        setShow(false);
      }}
      style={styles.flex}>
      <Block gap={5} row alignItems="center">
        <Text regular style={styles.name}>
          {item.value}
        </Text>
      </Block>
      <SvgIcon name="caret-right" size={24} />
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1}}>
      {label ? (
        <>
          <Text p light color="#16032E" style={[styles.label, labelStyle]}>
            {label}
          </Text>
          <SizedBox height={15} />
        </>
      ) : null}
      <TouchableOpacity
        onPress={() => {
          setShow(true);
        }}
        style={styles.inputWrap}>
        <Block row gap={6} alignItems="center">
          {selected?.length ? (
            <Text p style={styles.input}>
              {selected}
            </Text>
          ) : (
            <Text p style={styles.placeholder}>
              {placeholder}
            </Text>
          )}
        </Block>
        <SvgIcon name="dropdown" size={24} />
      </TouchableOpacity>
      {error?.length ? (
        <>
          <Text style={[styles.error]}>{error}</Text>
          <SizedBox height={10} />
        </>
      ) : null}

      <BottomSheet
        show={show}
        afterHide={() => {
          setShow(false);
          setSearchQuery('');
        }}
        dropPress={() => {
          setShow(false);
          setSearchQuery('');
        }}
        avoidKeyboard={false}
        modalStyle={[
          {backgroundColor: '#fafafa'},
          // isKeyboardVisible && {height: height * 0.4},
        ]}
        content={
          <View style={[styles.container]}>
            {title ? title : null}
            <SizedBox height={10} />
            <Block bg="white" style={styles.innerBox}>
              {data?.length ? (
                <TextInput
                  placeholder="Search for LGAs..."
                  value={searchQuery}
                  onChangeText={text => setSearchQuery(text)}
                  placeholderTextColor="#887f94"
                  autoCorrect={false}
                  autoComplete={false}
                  inputStyle={{
                    height: HDP(50),
                    paddingTop: Platform.OS === 'android' ? HDP(5) : 0,
                  }}
                />
              ) : null}
              <SizedBox height={20} />
              {loading ? (
                <Block alignSelf="center">
                  <ActivityIndicator size={'large'} color={palette.purple} />
                </Block>
              ) : (
                <FlashList
                  data={filteredData}
                  renderItem={renderItem}
                  showsVerticalScrollIndicator={false}
                  estimatedItemSize={100}
                  ListEmptyComponent={
                    <>
                      <Text style={styles.empty}>
                        {data?.length && searchQuery?.length
                          ? 'No LGA found for this search'
                          : !data?.length
                          ? emptyText
                          : ''}
                      </Text>
                    </>
                  }
                />
              )}
            </Block>
          </View>
        }
      />
    </View>
  );
};

export default BottomSelect;
