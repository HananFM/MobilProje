import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput, Alert, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const { width, height } = Dimensions.get('window');

export default function Timer() {
  const [time, setTime] = useState(25 * 60); // Default 25 minutes in seconds
  const [categories, setCategories] = useState(['Studying', 'Coding', 'Project', 'Reading']);
  const [selectedCategory, setSelectedCategory] = useState('Studying');
  const [newCategory, setNewCategory] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Format time to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    // Timer functionality will be implemented in Phase 4
    console.log('Start button pressed');
  };

  const handlePause = () => {
    // Timer functionality will be implemented in Phase 4
    console.log('Pause button pressed');
  };

  const handleReset = () => {
    // Timer functionality will be implemented in Phase 4
    setTime(25 * 60);
    console.log('Reset button pressed');
  };

  const handleAddCategory = () => {
    const trimmedCategory = newCategory.trim();

    if (!trimmedCategory) {
      Alert.alert('Error', 'Please enter a category name');
      return;
    }

    // Case-insensitive duplicate check
    if (categories.some(cat => cat.toLowerCase() === trimmedCategory.toLowerCase())) {
      Alert.alert('Error', 'This category already exists');
      return;
    }

    setCategories([...categories, trimmedCategory]);
    setSelectedCategory(trimmedCategory);
    setNewCategory('');
    setShowAddModal(false);
    Alert.alert('Success', `Category "${trimmedCategory}" added successfully!`);
  };

  const handleCategoryChange = (value) => {
    if (value === '__ADD_NEW__') {
      setShowAddModal(true);
    } else {
      setSelectedCategory(value);
    }
  };

  return (
    <View style={styles.container}>
      {/* Timer Display */}
      <View style={styles.timerCircle}>
        <Text style={styles.timerText}>{formatTime(time)}</Text>
      </View>

      {/* Category Selector */}
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryLabel}>Category:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={handleCategoryChange}
            style={styles.picker}
          >
            {categories.map((category) => (
              <Picker.Item key={category} label={category} value={category} />
            ))}
            <Picker.Item label="➕ Add New Category..." value="__ADD_NEW__" color="#2196F3" />
          </Picker>
        </View>
      </View>

      {/* Add Category Modal */}
      <Modal
        visible={showAddModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Category</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter category name"
              value={newCategory}
              onChangeText={setNewCategory}
              placeholderTextColor="#999"
              autoFocus
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowAddModal(false);
                  setNewCategory('');
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleAddCategory}
              >
                <Text style={styles.confirmButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Control Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.startButton]} onPress={handleStart}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.pauseButton]} onPress={handlePause}>
          <Text style={styles.buttonText}>Pause</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: width * 0.05, // 5% of screen width
  },
  timerCircle: {
    width: Math.min(width * 0.65, 280), // 65% of screen width, max 280
    height: Math.min(width * 0.65, 280),
    borderRadius: Math.min(width * 0.65, 280) / 2,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 8,
    borderColor: '#2196F3',
    marginBottom: height * 0.05, // 5% of screen height
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  timerText: {
    fontSize: Math.min(width * 0.15, 56), // Responsive font size
    fontWeight: 'bold',
    color: '#333',
  },
  categoryContainer: {
    width: '100%',
    marginBottom: height * 0.03,
    alignItems: 'center',
  },
  categoryLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  pickerContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: 50,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  modalInput: {
    height: 50,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  confirmButton: {
    backgroundColor: '#2196F3',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 500,
    marginTop: height * 0.02,
    flexWrap: 'wrap',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: width * 0.05,
    borderRadius: 10,
    minWidth: width * 0.25, // 25% of screen width
    alignItems: 'center',
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  pauseButton: {
    backgroundColor: '#FF9800',
  },
  resetButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
