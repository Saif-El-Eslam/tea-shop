import Toast from "react-native-toast-message";

const Notify: {
  error: (message: string) => void;
  success: (message: string) => void;
  info: (message: string) => void;
} = {
  error: (message: string) => {
    Toast.show({
      type: "error",
      text1: message,
      position: "top",
    });
  },
  success: (message: string) => {
    Toast.show({
      type: "success",
      text1: message,
      position: "top",
    });
  },
  info: (message: string) => {
    Toast.show({
      type: "info",
      text1: message,
      position: "top",
    });
  },
};

export default Notify;
