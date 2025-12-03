import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function SessionSummary({ visible, onClose, sessionData }) {
  const { duration, category, distractions } = sessionData;

  // Format duration from seconds to readable format
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins > 0 && secs > 0) {
      return `${mins} min ${secs} sec`;
    } else if (mins > 0) {
      return `${mins} min`;
    } else {
      return `${secs} sec`;
    }
  };

  // Get distraction feedback
  const getDistractionFeedback = (count) => {
    if (count === 0) {
      return { text: 'Perfect Focus!', emoji: '🎯', color: '#4CAF50' };
    } else if (count === 1) {
      return { text: 'Good Job!', emoji: '👍', color: '#FF9800' };
    } else if (count <= 3) {
      return { text: 'Keep Improving', emoji: '💪', color: '#FF9800' };
    } else {
      return { text: 'Try Again', emoji: '🔄', color: '#f44336' };
    }
  };

  const feedback = getDistractionFeedback(distractions);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerEmoji}>✅</Text>
            <Text style={styles.headerText}>Session Complete!</Text>
          </View>

          {/* Session Details */}
          <View style={styles.detailsContainer}>
            {/* Duration */}
            <View style={styles.detailRow}>
              <View style={styles.detailIconContainer}>
                <Text style={styles.detailIcon}>⏱️</Text>
              </View>
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Focus Time</Text>
                <Text style={styles.detailValue}>{formatDuration(duration)}</Text>
              </View>
            </View>

            {/* Category */}
            <View style={styles.detailRow}>
              <View style={styles.detailIconContainer}>
                <Text style={styles.detailIcon}>📚</Text>
              </View>
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Category</Text>
                <Text style={styles.detailValue}>{category}</Text>
              </View>
            </View>

            {/* Distractions */}
            <View style={styles.detailRow}>
              <View style={styles.detailIconContainer}>
                <Text style={styles.detailIcon}>📱</Text>
              </View>
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Distractions</Text>
                <Text style={[styles.detailValue, { color: feedback.color }]}>
                  {distractions}
                </Text>
              </View>
            </View>
          </View>

          {/* Feedback Section */}
          <View style={[styles.feedbackContainer, { backgroundColor: feedback.color + '20' }]}>
            <Text style={styles.feedbackEmoji}>{feedback.emoji}</Text>
            <Text style={[styles.feedbackText, { color: feedback.color }]}>
              {feedback.text}
            </Text>
          </View>

          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    maxWidth: 450,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 25,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerEmoji: {
    fontSize: 50,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  detailIconContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  detailIcon: {
    fontSize: 24,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  feedbackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    gap: 10,
  },
  feedbackEmoji: {
    fontSize: 28,
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#2196F3',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
