import React, { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  Heading,
  HStack,
  Image,
  Input,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import MedicineService from '../../../../redux/medicine/medicine.service';
import { MedicineDefaultImage } from '../../../../api/common';

export const MedicineList = ({
  setIsMedicineModalVisible,
  editingMedicineIndex,
  updateMedicineByIndex,
  setIsFocusSearchInput,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [medicines, setMedicines] = useState([]);
  const [currentMedicinePage, setCurrentMedicinePage] = useState(null);

  const [searchKey, setSearchKey] = useState('');
  const [isModalMedicineDetailVisible, setIsModalMedicineDetailVisible] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState({});

  useEffect(() => {
    const getMedicines = async () => {
      setIsLoading(true);
      const initMedicines = await MedicineService.getMedicines({
        sortOption: 'ASC',
        page: 1,
        limit: 10,
        search: '',
      });

      setMedicines(
        initMedicines.map((med) => ({
          name: med.name,
          subject: med.subject,
          imgUrl: med?.images?.length > 0 ? med.images[0].url : MedicineDefaultImage.thumbnail,
        }))
      );
      setCurrentMedicinePage(1);
      setIsLoading(false);
    };
    getMedicines();

    return () => {
      setMedicines([]);
    };
  }, []);

  const onLoadMoreHandler = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const result = await MedicineService.getMedicines({
      search: searchKey,
      sortOption: 'ASC',
      page: currentMedicinePage + 1,
      limit: 10,
    });

    const loadedMedicines = result.map((med) => ({
      name: med.name,
      subject: med.subject,
      imgUrl: med?.images?.length > 0 ? med.images[0].url : MedicineDefaultImage.thumbnail,
    }));
    if (loadedMedicines.length > 0) {
      setMedicines((prevNews) => [...prevNews, ...loadedMedicines]);
      setCurrentMedicinePage(currentMedicinePage + 1);
    } else {
      setCurrentMedicinePage(-1);
    }
    setIsLoading(false);
  };

  const onViewMedicineDetail = (index) => {
    setSelectedMedicine(medicines[index]);
    setIsModalMedicineDetailVisible(true);
  };

  const onSelectMedicine = () => {
    updateMedicineByIndex(editingMedicineIndex, selectedMedicine.name);
    setIsModalMedicineDetailVisible(false);
    setIsMedicineModalVisible(false);
  };

  const onSearchMedicineHandler = async (value) => {
    setSearchKey(value);

    const getMedicines = async () => {
      setIsLoading(true);
      const initMedicines = await MedicineService.getMedicines({
        search: value,
        page: 1,
        limit: 10,
        sortOption: 'ASC',
      });

      setMedicines(
        initMedicines.map((med) => ({
          name: med.name,
          subject: med.subject,
          imgUrl: med?.images?.length > 0 ? med.images[0].url : MedicineDefaultImage.thumbnail,
        }))
      );
      setCurrentMedicinePage(1);
      setIsLoading(false);
    };
    getMedicines();
  };

  return (
    <>
      <VStack h="100%">
        <Input
          _light={{
            bg: 'muted.50',
          }}
          _focus={{
            bg: 'cyan.50',
          }}
          borderRadius="md"
          placeholder="Nhập tên thuốc"
          onFocus={() => setIsFocusSearchInput && setIsFocusSearchInput(true)}
          onBlur={() => setIsFocusSearchInput && setIsFocusSearchInput(false)}
          onChangeText={(value) => onSearchMedicineHandler(value)}
        />
        {isLoading && (
          <HStack space={2} mt={5} justifyContent="center">
            <Spinner accessibilityLabel="Loading posts" />
            <Heading color="blue.600" fontSize="md">
              Đang tải thêm thuốc
            </Heading>
          </HStack>
        )}
        <FlatList
          mb={5}
          data={medicines}
          keyExtractor={(item, index) => index + 1}
          renderItem={({ item, index }) => (
            <VStack>
              <Pressable
                onPress={() => onViewMedicineDetail(index)}
                bg="muted.50"
                _pressed={{
                  transform: [{ scale: 0.96 }],
                }}
                shadow="1"
              >
                <VStack mx="4" mt="2" bgColor="#fff" borderRadius="12" flexDirection="row">
                  <Image
                    w="20%"
                    h="20%"
                    m="2"
                    borderRadius="12"
                    source={{
                      uri: item.imgUrl,
                    }}
                    alt="Medicine Image"
                    size="xl"
                  />
                  <VStack mt="2" mb="4" flexShrink="1">
                    <Text bold fontSize="sm" numberOfLines={2}>
                      {item.name}
                    </Text>
                    <Text color="muted.500" flex="1" numberOfLines={3}>
                      {item.subject}
                    </Text>
                  </VStack>
                </VStack>
              </Pressable>
              {index === medicines.length - 1 && currentMedicinePage >= 0 && (
                <Pressable
                  py={2}
                  borderRadius="3xl"
                  colorScheme="blue"
                  alignSelf="center"
                  onPress={onLoadMoreHandler}
                >
                  {isLoading && (
                    <HStack space={2} justifyContent="center">
                      <Spinner accessibilityLabel="Loading posts" />
                      <Heading color="blue.600" fontSize="md">
                        Đang tải thêm thuốc
                      </Heading>
                    </HStack>
                  )}
                  {!isLoading && (
                    <Text bold fontSize="md">
                      Xem thêm
                    </Text>
                  )}
                </Pressable>
              )}
            </VStack>
          )}
        />
      </VStack>
      <Modal
        isOpen={isModalMedicineDetailVisible}
        onClose={() => setIsModalMedicineDetailVisible(false)}
        avoidKeyboard
        size="full"
      >
        <KeyboardAvoidingView behavior="padding">
          <Modal.Content minW="100%">
            <Modal.CloseButton />
            <Modal.Header>Chi tiết</Modal.Header>
            <Modal.Body>
              <VStack space={3}>
                <Image
                  w="85%"
                  h="20%"
                  m="2"
                  borderRadius="12"
                  source={{
                    uri: selectedMedicine.imgUrl,
                  }}
                  alt="Medicine Image"
                  size="xl"
                />
                <Text bold fontSize="sm" numberOfLines={3}>
                  {selectedMedicine.name}
                </Text>
                <Text color="muted.500" flex="1" numberOfLines={10}>
                  {selectedMedicine.subject}
                </Text>
              </VStack>
            </Modal.Body>
            <Modal.Footer justifyContent="flex-start">
              <Button
                flex="1"
                m={2}
                colorScheme="rose"
                onPress={() => setIsModalMedicineDetailVisible(false)}
              >
                Đóng
              </Button>
              <Button flex="1" m={2} colorScheme="tertiary" onPress={() => onSelectMedicine()}>
                Chọn
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};
