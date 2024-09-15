import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  // ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@apollo/client";
import { DotIndicator } from "react-native-indicators";

import { useAppContext } from "../context/AppContext";
import { setRefetchOrders } from "../context/AppActions";
import { LoginScreenNavigationProp } from "app/types/navigation";
import { QUERY_ORDERS } from "app/graphQL/Queries/ordersQueries";
import OrderDetailsModal from "app/components/OrderDetailsModal";
import Notify from "app/utils/Notify";
import colors from "app/utils/colors";

const OrdersScreen: React.FC = () => {
  const { loading, error, data, refetch } = useQuery(QUERY_ORDERS);
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { dispatch, state } = useAppContext();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedOrderID, setSelectedOrderID] = useState<string>("");

  const handleOpenModal = (orderId: string) => {
    setSelectedOrderID(orderId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrderID("");
  };

  useEffect(() => {
    state.refetchOrders && refetch();
    dispatch(setRefetchOrders(false));
  }, []);

  if (error) {
    Notify.error(error.message);
  }

  return (
    <View style={styles.container}>
      {loading && (
        <DotIndicator
          count={3}
          size={12}
          color={colors.yellow}
          style={styles.spinner}
        />
      )}

      {!loading && (
        <FlatList
          data={data?.orders}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={[styles.headerCell, styles.headerID]}>Order ID</Text>
              <Text style={[styles.headerCell, styles.headerTotalItems]}>
                Total Items
              </Text>
              <Text style={[styles.headerCell, styles.headerTotalPrice]}>
                Total Price
              </Text>
              <Text style={[styles.headerCell, styles.headerTime]}>Time</Text>
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.orderRow}
              onPress={() => handleOpenModal(item.id)}
            >
              <Text
                style={styles.orderId}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.id}
              </Text>
              <Text style={styles.orderTotalItems}>
                {item.orderitems_aggregate.aggregate.sum.quantity}
              </Text>
              <Text style={styles.orderTotalPrice}>
                ${item.total_price.toFixed(2)}
              </Text>
              <Text style={styles.orderTime}>
                {new Date(item.createdAt).toLocaleDateString() ===
                new Date().toLocaleDateString()
                  ? "Today"
                  : new Date(item.createdAt).toLocaleDateString() ===
                    new Date(
                      new Date().setDate(new Date().getDate() - 1)
                    ).toLocaleDateString()
                  ? "Yesterday"
                  : new Date(item.createdAt).toLocaleDateString()}
              </Text>
            </TouchableOpacity>
          )}
          ListFooterComponent={
            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Teas")}
              >
                <Text style={styles.buttonText}>Return to Shop</Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}

      {isModalOpen && (
        <OrderDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          orderId={selectedOrderID}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 48,
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#ddd",
    padding: 8,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  headerCell: {
    textAlign: "center",
    fontWeight: "600",
    color: "#808080",
    fontSize: 16,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  headerID: { width: "30%", textAlign: "center" },
  headerTotalItems: { width: "20%", textAlign: "center" },
  headerTotalPrice: { width: "20%", textAlign: "center" },
  headerTime: { width: "30%", textAlign: "center" },
  spinner: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  orderRow: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  orderId: {
    width: "30%",
    fontSize: 14,
    textAlign: "center",
    color: "#909090",
    fontWeight: "500",
  },
  orderTotalItems: {
    width: "20%",
    fontSize: 14,
    textAlign: "center",
    color: "#909090",
    fontWeight: "500",
  },
  orderTotalPrice: {
    width: "20%",
    fontSize: 14,
    textAlign: "center",
    color: "#909090",
    fontWeight: "500",
  },
  orderTime: {
    width: "30%",
    fontSize: 14,
    textAlign: "center",
    color: "#909090",
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#FFF",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  button: {
    backgroundColor: "#f0e8d4",
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 25,
  },
  buttonText: {
    color: "#505050",
    fontSize: 16,
    fontWeight: "medium",
  },
});

export default OrdersScreen;
