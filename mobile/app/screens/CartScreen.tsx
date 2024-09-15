import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";

import { LoginScreenNavigationProp } from "app/types/navigation";
import {
  MUTATION_INSERT_ORDER,
  MUTATION_UPDATE_TEAS_BY_PK,
} from "app/graphQL/Mutations/ordersMutations";
import { useAppContext } from "app/context/AppContext";
import {
  removeCart,
  addCart,
  setCart,
  setRefetchOrders,
} from "app/context/AppActions";
import Notify from "app/utils/Notify";
import colors from "app/utils/colors";

// Replace with local image paths if necessary
const TeaLogo = require("app/assets/buy-white.png");
const TeaImage = require("app/assets/tea.png");
const CrossIcon = require("app/assets/cross.png");
const PlusIcon = require("app/assets/plus.png");
const MinusIcon = require("app/assets/minus.png");

const CartPage: React.FC = () => {
  const [insertOrder] = useMutation(MUTATION_INSERT_ORDER);
  const [updateTeaQuantity] = useMutation(MUTATION_UPDATE_TEAS_BY_PK);
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { state, dispatch } = useAppContext();

  const handleCheckout = async () => {
    const cartProducts = state.cart.map((item: any) => ({
      tea_id: item.productId,
      quantity: item.quantityInCart,
      price_per_unit: item.price_per_unit,
      total_price: item.subTotal,
    }));

    try {
      const operations = [
        insertOrder({
          variables: {
            totalPrice: state.cart.reduce(
              (acc, item) => acc + item.subTotal,
              0
            ),
            userId: state.user?.id,
            orderItems: cartProducts,
          },
        }),
        ...cartProducts.map((item) =>
          updateTeaQuantity({
            variables: {
              id: item.tea_id,
              quantity: -item.quantity,
            },
          })
        ),
      ];
      await Promise.all(operations);

      Notify.success("Order placed successfully");
      dispatch(setCart([]));
      dispatch(setRefetchOrders(true));
      navigation.navigate("Teas");
    } catch (err: any) {
      Alert.alert("Error", err?.errors ? err.errors[0].message : err.message);
    }
  };

  return (
    <View style={styles.container}>
      {state?.cart?.length <= 0 ? (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Your Cart is empty</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Teas")}>
            <Text style={styles.goToShopText}>Go to shop</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.header}>
            <Text style={styles.headerText}>My Shopping Cart</Text>
          </View>

          <View style={styles.scrollContainer}>
            <View style={styles.cartItemsContainer}>
              <View style={styles.cartHeaderContainer}>
                <Text style={[styles.cartHeaderItem, styles.titleProduct]}>
                  PRODUCT
                </Text>
                <Text style={[styles.cartHeaderItem, styles.titlePrice]}>
                  PRICE
                </Text>
                <Text style={[styles.cartHeaderItem, styles.titleQuantity]}>
                  {/* QUANTITY */}QTY
                </Text>
                <Text style={[styles.cartHeaderItem, styles.titleSubtotal]}>
                  SUB-TOTAL
                </Text>
                <Text style={[styles.cartHeaderItem, styles.titleClose]}>
                  {" "}
                </Text>
              </View>

              {state.cart.map((item) => {
                const product = state.teas.find((p) => p.id === item.productId);

                return (
                  <View key={item.productId} style={styles.cartItemContainer}>
                    <View style={styles.itemDetails}>
                      <Image source={TeaImage} style={styles.itemImage} />
                      <Text style={styles.itemName}>{product?.name}</Text>
                    </View>

                    <Text style={styles.itemPrice}>${item.price_per_unit}</Text>

                    <View style={styles.quantityControlsWrapper}>
                      <View style={styles.quantityControls}>
                        <TouchableOpacity
                          onPress={() =>
                            dispatch(
                              addCart({
                                productId: item.productId,
                                price_per_unit: item.price_per_unit,
                              })
                            )
                          }
                          style={styles.iconWrapper}
                        >
                          <Image source={PlusIcon} style={styles.icon} />
                        </TouchableOpacity>
                        <Text style={styles.quantity}>
                          {item.quantityInCart}
                        </Text>
                        <TouchableOpacity
                          onPress={() => dispatch(removeCart(item.productId))}
                          style={styles.iconWrapper}
                        >
                          <Image source={MinusIcon} style={styles.icon} />
                        </TouchableOpacity>
                      </View>
                    </View>

                    <Text style={styles.itemSubtotal}>${item.subTotal}</Text>

                    <TouchableOpacity
                      onPress={() =>
                        dispatch(
                          setCart(
                            state.cart.filter(
                              (p) => p.productId !== item.productId
                            )
                          )
                        )
                      }
                      style={styles.closeIcone}
                    >
                      <Image source={CrossIcon} style={styles.icon} />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>

            <View style={styles.cartTotalContainer}>
              <Text style={styles.cartTotalTitle}>Cart Total</Text>

              <View>
                <Text style={styles.cartTotalItem}>
                  <Text>Subtotal:</Text>
                  <Text>
                    ${state.cart.reduce((acc, item) => acc + item.subTotal, 0)}
                  </Text>
                </Text>
                <Text style={styles.cartTotalItem}>
                  <Text>Shipping: </Text> <Text>Free</Text>
                </Text>
                <Text style={styles.cartTotalItem}>
                  <Text>Total:</Text>
                  <Text>
                    ${state.cart.reduce((acc, item) => acc + item.subTotal, 0)}
                  </Text>
                </Text>
              </View>

              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={handleCheckout}
              >
                <Text style={styles.checkoutButtonText}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    padding: 10,
  },
  emptyCartText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.brown,
  },
  goToShopText: {
    color: colors.yellow,
    fontWeight: "bold",
    fontSize: 18,
    textDecorationLine: "underline",
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
    gap: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 32,
  },
  headerText: {
    color: colors.darkGreen,
    fontSize: 24,
    fontWeight: "bold",
  },
  cartItemsContainer: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cartHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderBottomColor: "#ddd",
  },
  cartHeaderItem: {
    fontWeight: 500,
    fontSize: 16,
    color: "#949494",
  },
  titleProduct: {
    width: "30%",
    textAlign: "center",
  },
  titlePrice: {
    width: "15%",
    textAlign: "center",
  },
  titleQuantity: {
    width: "15%",
    textAlign: "center",
  },
  titleSubtotal: {
    width: "15%",
    textAlign: "center",
  },
  titleClose: {
    width: "10%",
    textAlign: "center",
  },
  cartItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: "#ddd",
  },
  itemDetails: {
    width: "30%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  itemImage: {
    width: 50,
    height: 50,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 500,
  },
  itemPrice: {
    width: "15%",
    fontSize: 16,
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  quantityControlsWrapper: {
    width: "15%",
  },
  quantityControls: {
    width: "100%",
    marginHorizontal: "auto",
    maxWidth: 50,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    borderColor: "#dedede",
    borderWidth: 2,
    padding: 4,
  },
  iconWrapper: {
    backgroundColor: colors.lightBeige,
    padding: 4,
    borderRadius: 50,
  },
  icon: {
    width: 25,
    height: 25,
  },
  quantity: {
    width: 32,
    height: 32,
    padding: 8,

    fontSize: 16,
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  itemSubtotal: {
    width: "15%",
    fontSize: 16,
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  closeIcone: {
    width: "10%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cartTotalContainer: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,

    display: "flex",
    gap: 20,
  },
  cartTotalTitle: {
    fontSize: 24,
    color: colors.darkGreen,
    fontWeight: "bold",
  },
  cartTotalItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 16,
    fontWeight: 500,
    paddingVertical: 8,

    borderBottomWidth: 2,
    borderBottomColor: "#ddd",
  },
  checkoutButton: {
    backgroundColor: colors.darkGreen,
    padding: 12,
    borderRadius: 50,
    marginTop: 15,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CartPage;
