import { isEmpty, isPlainObject, omit } from 'lodash';
import React, { useState } from 'react';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import {
  VStack,
  HStack,
  Modal,
  FormControl,
  Button,
  Input,
  Center,
  Text,
  Divider,
  Icon,
  KeyboardAvoidingView,
  IconButton,
} from 'native-base';
import { MedicineList } from './MedicineList';

export const PrescriptionModal = (props) => {
  const { onSendPrescriptionHandler, isPrescriptionModalVisible, setIsPrescriptionModalVisible } =
    props;

  const [isMedicineModalVisible, setIsMedicineModalVisible] = useState(false);
  const [editingMedicineIndex, setEditingMedicineIndex] = useState(null);
  const [isFocusSearchInput, setIsFocusSearchInput] = useState(false);

  const [prescriptionData, setPrescriptionData] = useState({
    diagnose: '',
    medicines: [
      {
        name: '',
        dosage: '',
      },
    ],
  });
  const [errors, setErrors] = useState({});

  const onFormChangeHandler = (type, value) => {
    if (type === 'diagnose') {
      setPrescriptionData({
        ...prescriptionData,
        [type]: value,
      });
    }

    if (isPlainObject(type) && type.name === 'medicine') {
      const { index } = type;
      prescriptionData.medicines[index] = value;
    }

    setErrors(omit(errors, [type.name]));
  };

  const validateFormHandler = () => {
    const { diagnose: diagnoseInput, medicines } = prescriptionData;

    const diagnoseContent = diagnoseInput && diagnoseInput.trim();
    const isMedicinesInValid = medicines.some((med) => isEmpty(med.name) || isEmpty(med.dosage));

    let isFormValid = true;

    if (isEmpty(diagnoseContent)) {
      setErrors({
        ...errors,
        diagnose: 'Bệnh nhân bị bệnh gì bác sĩ nhỉ 🤔?',
      });
      isFormValid = false;
    }

    if (isMedicinesInValid) {
      setErrors({
        ...errors,
        medicine: 'Nhập thông tin đơn thuốc nha 📝?',
      });

      isFormValid = false;
    }

    return isFormValid;
  };

  const onSubmitHandler = async () => {
    const isFormValid = validateFormHandler();

    if (isFormValid) {
      onSendPrescriptionHandler(prescriptionData);

      setErrors({});
      setPrescriptionData({
        diagnose: '',
        medicines: [
          {
            name: '',
            dosage: '',
          },
        ],
      });

      setIsPrescriptionModalVisible(false);
    }
  };

  const onSelectEditMedicine = (index) => {
    setIsMedicineModalVisible(true);
    setEditingMedicineIndex(index);
  };

  const onAddMedicine = () => {
    const isFormValid = validateFormHandler();

    if (!isFormValid) return;

    const medicines = [...prescriptionData.medicines];
    setPrescriptionData({
      ...prescriptionData,
      medicines: medicines.concat({
        name: '',
        dosage: '',
      }),
    });
  };

  const updateMedicineByIndex = (index, name) => {
    prescriptionData.medicines[index] = {
      ...prescriptionData.medicines[index],
      name,
    };
  };

  const listMedicine = prescriptionData.medicines.map((medicine, index) => (
    <VStack space={2}>
      <Divider
        my="2"
        _light={{
          bg: 'muted.800',
        }}
      />
      {medicine.name ? (
        <HStack w="100%" justifyContent="flex-between" alignItems="center">
          <Text fontSize="lg" color="orange.600" bold>
            {index + 1} - {medicine.name}
          </Text>
          <IconButton
            icon={<Icon as={FontAwesome5} name="pen-square" />}
            onPress={() => onSelectEditMedicine(index)}
            _icon={{
              color: 'blue.600',
              size: 'md',
            }}
            _pressed={{
              bg: 'blue.200:alpha.20',
              _ios: {
                _icon: {
                  size: 'md',
                },
              },
            }}
          />
        </HStack>
      ) : (
        <Button variant="outline" colorScheme="success" onPress={() => onSelectEditMedicine(index)}>
          Chọn thuốc
        </Button>
      )}
      <FormControl isRequired>
        <Input
          _light={{
            bg: 'muted.50',
          }}
          _dark={{
            bg: 'coolGray.800',
          }}
          _focus={{
            bg: 'cyan.50',
          }}
          value={medicine.dosage}
          borderRadius="md"
          placeholder="Nhập liều lượng"
          onChangeText={(value) =>
            onFormChangeHandler(
              {
                index,
                name: 'medicine',
              },
              {
                name: medicine.name,
                dosage: value,
              }
            )
          }
        />
        {errors && errors.medicine && (
          <FormControl.HelperText
            ml="1"
            _text={{
              fontSize: 'xs',
              color: 'red.500',
            }}
          >
            {errors && errors.medicine}
          </FormControl.HelperText>
        )}
      </FormControl>
    </VStack>
  ));

  return (
    <Center>
      <Modal
        isOpen={isPrescriptionModalVisible}
        onClose={() => setIsPrescriptionModalVisible(false)}
        avoidKeyboard
        justifyContent="flex-end"
        bottom="4"
        size="full"
      >
        <KeyboardAvoidingView behavior="padding">
          <Modal.Content minW="95%">
            <Modal.CloseButton />
            <Modal.Header>Tạo đơn thuốc mới</Modal.Header>
            <Modal.Body>
              <VStack space={3}>
                <FormControl isRequired>
                  <Input
                    _light={{
                      bg: 'muted.50',
                    }}
                    _dark={{
                      bg: 'coolGray.800',
                    }}
                    _focus={{
                      bg: 'cyan.50',
                    }}
                    borderRadius="md"
                    placeholder="Chẩn đoán"
                    onChangeText={(value) => onFormChangeHandler('diagnose', value)}
                  />
                  {errors && errors.diagnose && (
                    <FormControl.HelperText
                      ml="1"
                      _text={{
                        fontSize: 'xs',
                        color: 'red.500',
                      }}
                    >
                      {errors && errors.diagnose}
                    </FormControl.HelperText>
                  )}
                </FormControl>
                {listMedicine}
                <Button
                  onPress={onAddMedicine}
                  leftIcon={
                    <Icon ml="2" size="4" color="pink.400" as={<Ionicons name="add-circle" />} />
                  }
                  colorScheme="light"
                >
                  Thêm thuốc
                </Button>
              </VStack>
            </Modal.Body>
            <Modal.Footer>
              <Button flex="1" onPress={onSubmitHandler}>
                Tạo
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </KeyboardAvoidingView>
      </Modal>
      <Modal
        isOpen={isMedicineModalVisible}
        onClose={() => setIsMedicineModalVisible(false)}
        avoidKeyboard
        size="full"
      >
        <Modal.Content minW="100%" maxH={`${isFocusSearchInput ? 50 : 85}%`}>
          <Modal.CloseButton />
          <Modal.Header>Tìm kiếm thuốc</Modal.Header>
          <Modal.Body>
            <MedicineList
              setIsMedicineModalVisible={setIsMedicineModalVisible}
              editingMedicineIndex={editingMedicineIndex}
              updateMedicineByIndex={updateMedicineByIndex}
              setIsFocusSearchInput={setIsFocusSearchInput}
            />
          </Modal.Body>
          <Modal.Footer justifyContent="flex-start">
            <Text italic fontSize="sm" color="info.500">
              Nhấn vào thẻ để xem chi tiết
            </Text>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
};
