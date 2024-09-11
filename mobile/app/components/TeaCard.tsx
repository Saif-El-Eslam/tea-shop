import colors from "app/utils/colors";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { DotIndicator } from "react-native-indicators";

const deleteIcon = require("app/assets/delete.png");
const editIcon = require("app/assets/edit.png");
const buyIcon = require("app/assets/buy.png");
const teaIcon = require("app/assets/tea.png");

interface TeaCardProps {
  name: string;
  description?: string;
  pricePerUnit: number;
  quantityLeft: number;
  isAdmin: boolean;
  onBuy: () => void;
  onDelete: () => void;
  onUpdate: () => void;
}

const TeaCard: React.FC<TeaCardProps> = ({
  name,
  description,
  pricePerUnit,
  quantityLeft,
  isAdmin,
  onBuy,
  onDelete,
  onUpdate,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openModal = (itemName: string) => {
    setItemToDelete(itemName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setItemToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      setIsSubmitting(true);
      await onDelete();
      setIsSubmitting(false);
      closeModal();
    }
  };

  return (
    <View style={styles.card}>
      <Image source={teaIcon} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
      <View style={styles.footer}>
        <Text style={styles.price}>${pricePerUnit}</Text>
        {!isAdmin && (
          <TouchableOpacity
            onPress={onBuy}
            style={[quantityLeft > 0 && styles.button]}
            disabled={quantityLeft === 0}
          >
            {quantityLeft > 0 ? (
              <Image source={buyIcon} style={styles.icon} />
            ) : (
              <Text style={styles.outOfStock}>Out of stock</Text>
            )}
          </TouchableOpacity>
        )}

        {isAdmin && (
          <Text
            style={[
              styles.quantity,
              quantityLeft > 0 ? styles.inStock : styles.outOfStock,
            ]}
          >
            {quantityLeft > 0 ? `${quantityLeft} left` : "Out of stock"}
          </Text>
        )}
      </View>
      {isAdmin && (
        <View style={styles.adminActions}>
          <TouchableOpacity onPress={onUpdate} style={styles.adminButton}>
            <Image source={editIcon} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openModal(name)}
            style={[styles.adminButton, styles.deleteButton]}
          >
            <Image source={deleteIcon} style={styles.icon} />
          </TouchableOpacity>
        </View>
      )}
      <Modal
        visible={isModalOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              Are you sure you want to delete "{itemToDelete}" tea?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={handleConfirmDelete}
                style={styles.modalButton}
              >
                {isSubmitting ? (
                  <DotIndicator count={3} size={6} color={colors.lightBeige} />
                ) : (
                  <Text style={styles.modalButtonText}>Confirm</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={closeModal}
                style={[styles.modalButton, styles.cancelButton]}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: colors.lightGreen,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    padding: 16,
    marginHorizontal: "auto",
    marginVertical: 12,
    width: "80%",
    alignItems: "flex-start",
  },
  image: {
    width: 200,
    height: 200,
    marginHorizontal: "auto",
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.darkGreen,
  },
  description: {
    fontSize: 12,
    color: colors.darkGray,
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    borderWidth: 2,
    borderColor: colors.lightGreen,
    // backgroundColor: "#2E8B57",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  disabledButton: {
    // backgroundColor: "#D3D3D3",
    borderColor: colors.darkGray,
  },
  icon: {
    width: 16,
    height: 16,
  },
  quantity: {
    fontSize: 14,
    fontWeight: "bold",
  },
  inStock: {
    color: colors.darkGreen,
  },
  outOfStock: {
    color: colors.brown,
  },
  adminActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  adminButton: {
    borderWidth: 2,
    borderColor: colors.yellow,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 4,
  },
  deleteButton: {
    borderColor: "#FF6347",
    // backgroundColor: "#FF6347",
  },
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

export default TeaCard;
