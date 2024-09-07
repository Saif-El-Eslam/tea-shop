import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Main: undefined;
  Orders: undefined;
  Teas: undefined;
};

export type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;
export type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Register"
>;
export type MainScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Main"
>;
export type OrdersScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Orders"
>;
export type TeasScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Teas"
>;

export type LoginScreenRouteProp = RouteProp<RootStackParamList, "Login">;
export type RegisterScreenRouteProp = RouteProp<RootStackParamList, "Register">;
export type MainScreenRouteProp = RouteProp<RootStackParamList, "Main">;
export type OrdersScreenRouteProp = RouteProp<RootStackParamList, "Orders">;
export type TeasScreenRouteProp = RouteProp<RootStackParamList, "Teas">;
