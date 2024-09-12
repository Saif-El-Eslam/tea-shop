import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { DotIndicator } from "react-native-indicators";
import colors from "app/utils/colors";

interface ConfirmationModalProps {
  isModalOpen: boolean;
  itemToDelete: string | null;
  isSubmitting: boolean;
  onClose: () => void;
  onConfirmDelete: () => Promise<void>;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isModalOpen,
  itemToDelete,
  isSubmitting,
  onClose,
  onConfirmDelete,
}) => {
  return (
    <Modal
      visible={isModalOpen}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            Are you sure you want to delete "{itemToDelete}" tea?
          </Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              onPress={onConfirmDelete}
              style={styles.modalButton}
            >
              {isSubmitting ? (
                <DotIndicator count={3} size={6} color={colors.lightBeige} />
              ) : (
                <Text style={styles.modalButtonText}>Confirm</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.modalButton, styles.cancelButton]}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    width: 300,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    backgroundColor: colors.darkGreen,
    padding: 12,
    borderRadius: 4,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 4,
  },
  cancelButton: {
    backgroundColor: "#d41717",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ConfirmationModal;
