import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { DotIndicator } from "react-native-indicators";

import Notify from "app/utils/Notify"; // Ensure Notify is compatible with React Native
import { createTea, updateTea } from "app/services/TeasService";
import { TeaType } from "app/types/types";
import colors from "app/utils/colors";

interface Props {
  tea?: TeaType | null;
  onSuccess: (tea: TeaType) => void;
  onClose: () => void;
}

const CreateUpdateTeaComponent: React.FC<Props> = ({
  tea,
  onSuccess,
  onClose,
}) => {
  const [formData, setFormData] = useState<TeaType>({
    id: tea?.id || "",
    name: tea?.name || "",
    description: tea?.description || "",
    price_per_unit: tea?.price_per_unit || 0,
    quantity: tea?.quantity || 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input changes
  const handleInputChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]:
        name === "quantity"
          ? value === ""
            ? ""
            : Number(value)
          : // : name === "price_per_unit"
            // ? value === ""
            //   ? ""
            //   : parseFloat(value)
            value,
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);

    if (!formData.name || !formData.description) {
      Notify.error("All fields are required.");
      setIsSubmitting(false);
      return;
    }

    if (formData.price_per_unit <= 0) {
      Notify.error("Price must be greater than 0.");
      setIsSubmitting(false);
      return;
    }

    if (formData.quantity < 0) {
      Notify.error("Quantity must be greater than or equal to 0.");
      setIsSubmitting(false);
      return;
    }

    const updatedTea: TeaType = {
      ...formData,
      price_per_unit: formData.price_per_unit,
      quantity: Number(formData.quantity),
    };

    try {
      if (tea?.id) {
        await updateTea(tea.id, formData);
        Notify.success("Tea updated successfully!");
        onSuccess(updatedTea);
      } else {
        const newTea = await createTea(formData);
        Notify.success("Tea created successfully!");
        onSuccess(newTea);
      }
    } catch (error: any) {
      error?.errors
        ? Notify.error(error.errors[0].msg)
        : Notify.error(error.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal visible={true} transparent={true} animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <Text style={styles.header}>
                {tea ? "Update Tea" : "Create Tea"}
              </Text>
              <View style={styles.form}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Name</Text>
                  <TextInput
                    value={formData.name}
                    onChangeText={(text) => handleInputChange("name", text)}
                    style={styles.input}
                    placeholder="Enter tea name"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Description</Text>
                  <TextInput
                    value={formData.description}
                    onChangeText={(text) =>
                      handleInputChange("description", text)
                    }
                    style={[styles.input, styles.textArea]}
                    placeholder="Enter tea description"
                    multiline
                    numberOfLines={4}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Price per Unit</Text>
                  <TextInput
                    value={formData.price_per_unit.toString()}
                    onChangeText={(text) =>
                      handleInputChange("price_per_unit", text)
                    }
                    style={styles.input}
                    keyboardType="decimal-pad"
                    placeholder="Enter price per unit"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Quantity</Text>
                  <TextInput
                    value={formData.quantity.toString()}
                    onChangeText={(text) => handleInputChange("quantity", text)}
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Enter quantity"
                  />
                </View>

                <View style={styles.buttonGroup}>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={[styles.button, styles.submitButton]}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <DotIndicator
                        count={3}
                        size={6}
                        color={colors.lightBeige}
                        // style={styles.indecator}
                      />
                    ) : (
                      <Text style={styles.buttonText}>
                        {tea ? "Update Tea" : "Create Tea"}
                      </Text>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={onClose}
                    style={[styles.button, styles.cancelButton]}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  form: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.lightGreen,
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  submitButton: {
    backgroundColor: colors.darkGreen,
  },
  cancelButton: {
    backgroundColor: "#d41717",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CreateUpdateTeaComponent;
