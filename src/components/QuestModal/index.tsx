import React, {useState} from 'react';
import {
  Modal,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface QuestModalProps {
  visible: boolean;
  onSave: (details: any) => void;
  onClose: () => void;
}

const QuestModal: React.FC<QuestModalProps> = ({visible, onSave, onClose}) => {
  const [questDetails, setQuestDetails] = useState<any>({
    quest: '',
    level: '',
    type: '',
    description: '',
  });

  const handleSave = () => {
    onSave(questDetails);
    setQuestDetails({quest: '', level: '', type: '', description: ''});
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Enter Quest Details:</Text>
          <TextInput
            placeholder="Quest Name"
            onChangeText={text =>
              setQuestDetails({...questDetails, quest: text})
            }
            style={styles.input}
          />
          <TextInput
            placeholder="Level"
            onChangeText={text =>
              setQuestDetails({...questDetails, level: text})
            }
            style={styles.input}
          />
          <TextInput
            placeholder="Type"
            onChangeText={text =>
              setQuestDetails({...questDetails, type: text})
            }
            style={styles.input}
          />
          <TextInput
            placeholder="Description"
            onChangeText={text =>
              setQuestDetails({...questDetails, description: text})
            }
            multiline={true}
            style={[styles.input, styles.descriptionInput]}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    padding: 8,
    marginVertical: 5,
    width: '100%',
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: 'lightblue',
    padding: 12,
    marginVertical: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'lightcoral',
    padding: 12,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default QuestModal;
