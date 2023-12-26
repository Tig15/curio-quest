import React, {useState} from 'react';
import {
  Modal,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {translate} from '../../translation';
import {COLORS} from '../../asset/color/color';

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
    reward: '',
    timeLimit: '',
    hints: '',
  });

  const handleSave = () => {
    onSave(questDetails);
    setQuestDetails({
      quest: '',
      level: '',
      type: '',
      description: '',
      reward: '',
      timeLimit: '',
      hints: '',
    });
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{translate('enter_quest')}</Text>
          <TextInput
            placeholder="Quest Name"
            onChangeText={text =>
              setQuestDetails({...questDetails, quest: text})
            }
            style={styles.input}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <TextInput
              placeholder="Level"
              onChangeText={text =>
                setQuestDetails({...questDetails, level: text})
              }
              style={styles.numInput}
            />
            <TextInput
              placeholder="Type"
              onChangeText={text =>
                setQuestDetails({...questDetails, type: text})
              }
              style={styles.numInput}
            />
          </View>

          <TextInput
            placeholder="Description"
            onChangeText={text =>
              setQuestDetails({...questDetails, description: text})
            }
            multiline={true}
            style={[styles.input, styles.descriptionInput]}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <TextInput
              placeholder="Reward"
              onChangeText={text =>
                setQuestDetails({...questDetails, reward: text})
              }
              style={styles.numInput}
              keyboardType="number-pad"
            />
            <TextInput
              placeholder="Time Limit"
              onChangeText={text =>
                setQuestDetails({...questDetails, timeLimit: text})
              }
              style={styles.numInput}
            />
          </View>
          <TextInput
            placeholder="Hints"
            onChangeText={text =>
              setQuestDetails({...questDetails, hints: text})
            }
            multiline={true}
            style={[styles.input, styles.hintInput]}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.buttonText}>{translate('save_quest')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>{translate('cancel_quest')}</Text>
            </TouchableOpacity>
          </View>
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
    borderColor: COLORS.light_border,
    borderRadius: 5,
    padding: 8,
    marginVertical: 5,
    width: '100%',
  },
  numInput: {
    borderWidth: 1,
    borderColor: COLORS.light_border,
    borderRadius: 5,
    padding: 8,
    marginVertical: 5,
    width: '45%',
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  hintInput: {
    height: 40,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: COLORS.light_myst,
    padding: 4,
    marginVertical: 10,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: COLORS.light_primary,
    padding: 4,
    marginVertical: 10,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.dark_border,
  },
});

export default QuestModal;
