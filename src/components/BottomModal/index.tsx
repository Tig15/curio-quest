import {View, Text, Modal} from 'react-native';
import React from 'react';

interface BottomModalProps {
  children: any;
  modalVisible: any;
}

const BottomModal: React.FC<BottomModalProps> = ({
  children,
  modalVisible,
}: any) => {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      {children}
    </Modal>
  );
};

export default BottomModal;
