import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useQuery } from "@apollo/client";
import { DotIndicator } from "react-native-indicators";

import { useAppContext } from "app/context/AppContext";
import { QUERY_ORDER_DETAILS } from "app/graphQL/Queries/ordersQueries";
import Notify from "app/utils/Notify";
import colors from "app/utils/colors";

const CloseIcon = require("app/assets/cross.png");

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  isOpen,
  onClose,
  orderId,
}) => {
  const { loading, error, data } = useQuery(QUERY_ORDER_DETAILS, {
    variables: { id: orderId },
  });
  const { state } = useAppContext();

  useEffect(() => {
    if (error) {
      Notify.error(error.message);
    }
  }, [error]);

  if (loading) {
    return (
      <Modal transparent visible={isOpen} onRequestClose={onClose}>
        <View style={styles.modalOverlay}>
          <DotIndicator count={3} size={12} color={colors.yellow} />
        </View>
      </Modal>
    );
  }

  if (!isOpen) return null;

  const getSubtotal = (quantity: number, price: number) =>
    (quantity * price).toFixed(2);

  return (
    <Modal transparent visible={isOpen} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {state?.user?.role === "admin" && (
            <Text style={styles.userIdText}>
              USER ID: {data.orders_by_pk.user_id}
            </Text>
          )}
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.tableContainer}>
              <View style={styles.headerRow}>
                <Text style={[styles.headerCell, styles.productHeader]}>
                  PRODUCT
                </Text>
                <Text style={[styles.headerCell, styles.priceHeader]}>
                  PRICE
                </Text>
                <Text style={[styles.headerCell, styles.qtyHeader]}>QTY</Text>
                <Text style={[styles.headerCell, styles.subtotalHeader]}>
                  SUBTOTAL
                </Text>
                <View style={styles.closeButtonWrapper}>
                  <TouchableOpacity onPress={onClose}>
                    <Image source={CloseIcon} style={styles.closeIcon} />
                  </TouchableOpacity>
                </View>
              </View>
              {data.orders_by_pk.orderitems.map((item: any) => (
                <View key={item.tea_id} style={styles.row}>
                  <Text style={styles.productName}>{item.tea.name}</Text>
                  <Text style={styles.priceText}>
                    ${item.price_per_unit.toFixed(2)}
                  </Text>
                  <Text style={styles.qtyText}>{item.quantity}</Text>
                  <Text style={styles.subtotalText}>
                    ${getSubtotal(item.quantity, item.price_per_unit)}
                  </Text>
                  <View style={styles.emptyCell} />
                </View>
              ))}
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total Price:</Text>
                <Text style={styles.totalValue}>
                  ${data.orders_by_pk.total_price}
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    maxWidth: 600,
    backgroundColor: colors.lightBeige,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 5,
  },
  userIdText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#808080",
    textAlign: "center",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  tableContainer: {
    // borderBottomWidth: 1,
    // borderBottomColor: "#ddd",
  },
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#ededed",
    paddingVertical: 8,
  },
  headerCell: {
    // flex: 1,
    textAlign: "center",
    fontWeight: "500",
    color: "#808080",
    fontSize: 14,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  productHeader: {
    width: "35%",
    textAlign: "center",
  },
  priceHeader: {
    width: "20%",
    textAlign: "center",
  },
  qtyHeader: {
    width: "15%",
    textAlign: "center",
  },
  subtotalHeader: {
    width: "20%",
    textAlign: "center",
  },
  closeButtonWrapper: {
    width: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ededed",
    paddingVertical: 8,
  },
  productRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  productImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  productName: {
    width: "35%",
    fontSize: 14,
    textAlign: "center",
  },
  priceText: {
    width: "20%",
    textAlign: "center",
    fontSize: 14,
  },
  qtyText: {
    width: "15%",
    textAlign: "center",
    fontSize: 14,
  },
  subtotalText: {
    width: "20%",
    textAlign: "center",
    fontSize: 14,
  },
  emptyCell: {
    width: "10%",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    paddingVertical: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#808080",
  },
  totalValue: {
    fontSize: 16,
    // fontWeight: "500",
  },
});

export default OrderDetailsModal;
