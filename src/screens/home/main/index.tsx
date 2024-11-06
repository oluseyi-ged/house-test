/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Block,
  BottomSheet,
  Button,
  SizedBox,
  SvgIcon,
  Text,
  TextInput,
} from '@components';
import BottomSelect from '@components/bottom-select';
import {HDP, localGovernments} from '@helpers';
import {palette} from '@theme';
import {Formik} from 'formik';
import moment from 'moment';
import React, {FC, useRef, useState} from 'react';
import {Dimensions} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {showMessage} from 'react-native-flash-message';
import * as yup from 'yup';
import {default as styles} from './styles';

interface ServiceOption {
  name: string;
  description: string;
  mode: string;
}

interface WhenOption {
  value: string;
  label: string;
}

export const Home: FC = ({navigation}: any) => {
  const {width, height} = Dimensions.get('window');
  const formRef = useRef<any>();

  const [mode, setMode] = useState<any>('');
  const [lga, setLga] = useState<any>('');
  const [address, setAddress] = useState<any>('');
  const [busStop, setBusStop] = useState<any>('');
  const [landmark, setLandmark] = useState<any>('');
  const [when, setWhen] = useState<any>('');
  const [showPicker, setShowPicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());
  const [date, setDate] = useState<any>(null);
  const [need, setNeed] = useState(false);
  const [rangeId, setRangeId] = useState(0);

  const allFieldsFilled = () => {
    if (when === 'date' && date === null) {
      return false;
    }

    const fields = [mode, lga, address, busStop, landmark, when];

    return fields.every(field => field !== null && field !== '');
  };

  const initialValues = {
    mode: '',
    lga: '',
    address: '',
    bus_stop: '',
    landmark: '',
    when: '',
  };

  const valueSchema = yup.object().shape({
    mode: yup.string().required('Please field is required'),
    lga: yup.string().required('Please field is required'),
    address: yup.string().required('Please field is required'),
    bus_stop: yup.string().required('Please field is required'),
    landmark: yup.string().required('Please field is required'),
    when: yup.string().required('Please field is required'),
  });

  const serviceOptions: ServiceOption[] = [
    {
      name: 'Residential Service',
      description:
        'Select this if you need the task done at a particular location of your choice',
      mode: 'resident',
    },
    {
      name: 'On-Site Service',
      description:
        'Select this if you are more happy to go to the registered business address',
      mode: 'on-site',
    },
  ];

  const WhenOptions: WhenOption[] = [
    {value: 'date', label: 'On date'},
    {value: 'flexible', label: "I'm flexible"},
  ];

  const timeOptions = [
    {
      id: 1,
      name: 'Morning',
      icon: 'morning',
      desc: 'The time range is 7:00am to 11:59am',
    },
    {
      id: 2,
      name: 'Afternoon',
      icon: 'afternoon',
      desc: 'The time range is 12:00pm to 4:59pm',
    },
    {
      id: 3,
      name: 'Evening',
      icon: 'evening',
      desc: 'The time range is 5:00pm to 9:59pm',
    },
    {
      id: 4,
      name: 'All day',
      icon: 'all-day',
      desc: 'The time range is 7:00am to 9:59pm',
    },
  ];

  const ServiceOptionComponent = ({
    option,
    mode,
  }: {
    option: ServiceOption;
    mode: string;
  }) => (
    <Block
      style={styles.modeBox}
      flex={0.5}
      onPress={() => {
        setMode(option?.mode);
      }}
      bg={mode === option.mode ? '#00763E' : '#F5F5F5'}>
      <SvgIcon
        name={mode === option.mode ? 'radio-on' : 'radio-off'}
        size={20}
        containerStyle={{alignSelf: 'flex-start'}}
      />
      <SizedBox height={22} />
      <Text
        size={12.5}
        medium
        color={mode === option.mode ? '#fff' : '#0C2039'}>
        {option.name}
      </Text>
      <SizedBox height={22} />
      <Text color={mode === option.mode ? '#fff' : '#0C2039'}>
        {option.description}
      </Text>
    </Block>
  );

  return (
    <Block flex={1}>
      <Block
        scroll
        style={styles.pageWrap}
        bg="#fff"
        bounce
        showScrollbar={false}
        flex={1}>
        <SizedBox height={22} />
        <Text size={20} bold>
          Location & Date
        </Text>
        <Text size={12}>Select the category that best fits your needs.</Text>

        <Formik
          initialValues={initialValues}
          innerRef={formRef}
          onSubmit={values => {
            console.log(values);
          }}
          validateOnChange
          validateOnBlur
          validationSchema={valueSchema}>
          {({
            values,
            errors,
            touched,
            setFieldValue,
            handleBlur,
            handleSubmit,
          }) => {
            return (
              <>
                <SizedBox height={60} />
                <Block row gap={10}>
                  {serviceOptions.map((option, index) => (
                    <ServiceOptionComponent
                      key={index}
                      option={option}
                      mode={mode}
                    />
                  ))}
                </Block>
                <SizedBox height={20} />
                {mode?.length ? (
                  <>
                    <Text size={14}>Where do you want the task done?</Text>
                    <SizedBox height={10} />
                    <BottomSelect
                      data={localGovernments}
                      onSelect={(value: any) => {
                        setFieldValue('lga', value);
                        setLga(value);
                      }}
                      icon="building"
                      iconSize={24}
                      selected={values.lga}
                      placeholder={'Local government'}
                      title={
                        <Block
                          row
                          gap={5}
                          alignSelf="center"
                          alignItems="center">
                          <Text h5 color={palette.dark} medium>
                            Select LGA
                          </Text>
                        </Block>
                      }
                      label=""
                    />
                  </>
                ) : null}
                <SizedBox height={8} />
                {lga?.length ? (
                  <TextInput
                    placeholder={'House Address'}
                    error={
                      touched.address && errors.address ? errors?.address : ''
                    }
                    value={values.address}
                    onChangeText={value => {
                      setAddress(value);
                      setFieldValue('address', value);
                    }}
                    // @ts-ignore
                    onBlur={() => handleBlur('address')}
                    dark
                    autoCorrect={false}
                  />
                ) : null}
                <SizedBox height={8} />
                {address?.length ? (
                  <TextInput
                    placeholder={'Closest bus stop'}
                    error={
                      touched.bus_stop && errors.bus_stop
                        ? errors?.bus_stop
                        : ''
                    }
                    value={values.bus_stop}
                    onChangeText={value => {
                      setBusStop(value);
                      setFieldValue('bus_stop', value);
                    }}
                    // @ts-ignore
                    onBlur={() => handleBlur('bus_stop')}
                    dark
                    autoCorrect={false}
                  />
                ) : null}
                <SizedBox height={8} />
                {busStop?.length ? (
                  <TextInput
                    placeholder={'Landmarks'}
                    error={
                      touched.landmark && errors.landmark
                        ? errors?.landmark
                        : ''
                    }
                    value={values.landmark}
                    onChangeText={value => {
                      setLandmark(value);
                      setFieldValue('landmark', value);
                    }}
                    // @ts-ignore
                    onBlur={() => handleBlur('landmark')}
                    dark
                    autoCorrect={false}
                  />
                ) : null}
                <SizedBox height={20} />
                {landmark?.length ? (
                  <Block>
                    <Text size={14}>When do you need this done?</Text>
                    <SizedBox height={10} />

                    <Block row gap={13}>
                      {WhenOptions.map(option => (
                        <Block
                          key={option.value}
                          onPress={() => {
                            setWhen(option.value);
                            setNeed(false);
                            setRangeId(0);
                            if (option.value === 'flexible') {
                              setDate(null);
                            }
                          }}
                          width={option.value === 'date' ? 132 : 150}
                          style={styles.whenBox}
                          bg="#f5f5f5"
                          row
                          gap={6}
                          alignItems="center">
                          <SvgIcon
                            name={
                              when === option.value ? 'checked' : 'unchecked'
                            }
                            size={24}
                          />
                          <Text color="#000" size={14}>
                            {option.label}
                          </Text>
                        </Block>
                      ))}
                    </Block>
                  </Block>
                ) : null}
                <SizedBox height={20} />
                {when?.length ? (
                  when === 'date' ? (
                    <Block
                      onPress={() => {
                        setMode('end');
                        {
                          if (date) {
                            setTempDate(date);
                          }
                        }
                        setShowPicker(true);
                      }}
                      style={styles.dateInput}
                      row
                      alignItems="center"
                      radius={12}
                      justify="space-between">
                      <Text
                        {...(date && {medium: true})}
                        color={date ? '#0C2039' : '#887f94'}
                        light>
                        {!date
                          ? 'Select date'
                          : moment(date).format('DD - MMM - YYYY')}
                      </Text>
                      <SvgIcon name="calendar" size={19} />
                    </Block>
                  ) : null
                ) : null}
                {date || when === 'flexible' ? (
                  <>
                    <SizedBox height={!date ? 0 : 20.5} />
                    <Block
                      onPress={() => {
                        setNeed(!need);
                      }}
                      row
                      alignItems="center"
                      gap={8}>
                      <SvgIcon
                        name={need ? 'checked' : 'unchecked'}
                        size={24}
                      />
                      <Text color="#000">I need a certain time of day</Text>
                    </Block>
                    <SizedBox height={20.5} />
                  </>
                ) : null}
                {need
                  ? timeOptions?.map(time => (
                      <Block
                        onPress={() => {
                          setRangeId(time?.id);
                        }}
                        bg={rangeId === time?.id ? '#00763E' : '#F5F5F5'}
                        row
                        justify="space-between"
                        alignItems="flex-end"
                        style={styles.timeBox}
                        key={time.icon}>
                        <Block>
                          <SvgIcon
                            name={time?.icon}
                            size={40}
                            containerStyle={{alignSelf: 'flex-start'}}
                          />
                          <SizedBox height={15} />
                          <Text
                            medium
                            size={12.5}
                            color={rangeId === time?.id ? '#fff' : '#0C2039'}>
                            {time?.name}
                          </Text>
                          <SizedBox height={5} />
                          <Text
                            color={rangeId === time?.id ? '#fff' : '#0C2039'}>
                            {time?.desc}
                          </Text>
                        </Block>
                        <SvgIcon
                          name={rangeId === time?.id ? 'radio-on' : 'radio-off'}
                          size={20}
                        />
                      </Block>
                    ))
                  : null}
                <SizedBox height={200} />
              </>
            );
          }}
        </Formik>

        <BottomSheet
          show={showPicker}
          dropPress={() => {
            setShowPicker(false);
          }}
          modalStyle={{backgroundColor: '#FAFAFA'}}
          content={
            <Block>
              <Text color="#16032E" size={14} center textTransform="capitalize">
                Select Date
              </Text>
              <SizedBox height={35.5} />

              <Block alignSelf="center">
                <DatePicker
                  date={tempDate}
                  onDateChange={setTempDate}
                  style={{height: HDP(150)}}
                  mode="date"
                  maximumDate={new Date()}
                  // minimumDate={mode === 'end' && origin ? origin : new Date()}
                  minimumDate={new Date(0)}
                  textColor="#000"
                />
              </Block>
              <SizedBox height={40} />
              <Button
                title={'Confirm'}
                color={'#00763E'}
                style={{
                  width: width * 0.9,
                  alignSelf: 'center',
                }}
                onPress={() => {
                  setDate(tempDate);
                  setShowPicker(false);
                }}
              />
              <SizedBox height={30} />
            </Block>
          }
        />
      </Block>

      <Button
        title={'Continue'}
        color={'#00763E'}
        disabled={!allFieldsFilled()}
        style={{
          width: width * 0.9,
          alignSelf: 'center',
          position: 'absolute',
          bottom: HDP(30),
        }}
        onPress={() => {
          showMessage({
            message: 'You clicked continue',
            type: 'success',
          });
        }}
      />
    </Block>
  );
};
