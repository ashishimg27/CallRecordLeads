import {View, Text, Pressable, Modal, TextInput, Linking} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/commonComponents/Header/Header';
import styles from './style';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Color} from '../../styles/Colors';
import SelectOptons from '../../components/commonComponents/SelectOptions/SelectOptons';
import PrimaryButton from '../../components/commonComponents/PrimaryButton/PrimaryButton';

const callData = [
  {
    name: 'Abdul',
    number: '7007153446',
    type: 'Important',
    label: '',
  },
  {
    name: 'Suhas Redd',
    number: '9652036899',
    type: 'Important',
    label: '',
  },
  {
    name: 'Riya A',
    number: '123456789',
    type: 'Important',
    label: 'High Priority',
  },
  {
    name: 'Pawan Mend',
    number: '987654321',
    type: 'Important',
    label: '',
  },
  {
    name: 'Abhinav th',
    number: '8765434567',
    type: 'Important',
    label: 'Label two',
  },
  {
    name: 'Krish M',
    number: '676545678',
    type: 'Important',
    label: 'Intrested',
  },
];

const LeadsOptionData = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];
const LabalOptionData = [
  {label: 'Value 1', value: '1'},
  {label: 'Value 2', value: '2'},
  {label: 'Value 3', value: '3'},
  {label: 'Value 4', value: '4'},
  {label: 'Value 5', value: '5'},
  {label: 'Value 6', value: '6'},
  {label: 'Value 7', value: '7'},
  {label: 'Value 8', value: '8'},
];
const LeadsData = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [remark, onChangeRemark] = React.useState('');

  const [selectedLeads, setSelectedLeads] = useState(null);
  const [selectedLabal, setSelectedLabal] = useState(null);

  const handleCanel = () => {
    setModalVisible(!modalVisible);
    setSelectedLeads(null);
    setSelectedLabal(null);
  };

  const applyHandle = () => {
    console.log('hello');
    setModalVisible(!modalVisible);
    setSelectedLeads(null);
    setSelectedLabal(null);
  };

  const goToDial = number => {
    const dialerURL = `tel:${number}`;
    Linking.openURL(dialerURL).catch(err =>
      console.error('An error occurred', err),
    );
  };
  return (
    <>
      <Header title="All Follow-ups" />

      <View style={styles.mainContainer}>
        <View style={styles.topHeading__container}>
          <Text style={styles.topHeading}>Showing all 6 actions</Text>
          <Text style={styles.topHeading}>Actions</Text>
        </View>
        <View style={styles.date__container}>
          <Text style={styles.smallText}>03 Aug 2023, 12:50:35 pm</Text>
        </View>
        <View style={styles.callLogs__container}>
          {callData?.map((caller, index) => (
            <View style={styles.callDetail__container} key={index}>
              <View style={styles.callerDetail__container}>
                <View onTouchEnd={() => goToDial(caller.number)}>
                  <Ionicons name="call" color={Color.green} size={30} />
                </View>
                <View style={styles.callerName_phone}>
                  <Text>{caller.name}</Text>
                  <Text>{caller.number}</Text>
                </View>
              </View>
              <View style={styles.typeLabel}>
                <Text style={styles.smallText}>{caller.type}</Text>
                <Text style={styles.smallText}>
                  {caller.label ? caller.label : 'No Label'}
                </Text>
              </View>
              <Pressable onPress={() => setModalVisible(true)}>
                <Entypo
                  name="dots-three-horizontal"
                  color={'lightblue'}
                  size={30}
                />
              </Pressable>
            </View>
          ))}
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalHeading}>Take an action</Text>
            <SelectOptons
              label={'Leads'}
              optionData={LeadsOptionData}
              selectedOption={selectedLeads}
              setSelectedOption={setSelectedLeads}
            />
            <SelectOptons
              label={'Labal'}
              optionData={LabalOptionData}
              selectedOption={selectedLabal}
              setSelectedOption={setSelectedLabal}
            />
            <TextInput
              style={styles.input}
              onChangeText={onChangeRemark}
              value={remark}
              placeholder="REMARKS"
            />
            <View style={styles.modalBottom__container}>
              <PrimaryButton btnLabel={'Cancel'} btnHandle={handleCanel} />
              <PrimaryButton btnLabel={'Apply'} btnHandle={applyHandle} />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default LeadsData;
