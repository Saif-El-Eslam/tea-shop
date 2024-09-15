import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notify: {
  error: (message: string) => void;
  success: (message: string) => void;
  info: (message: string) => void;
} = {
  error: (message: string) => {
    toast.error(message);
  },
  success: (message: string) => {
    toast.success(message);
  },
  info: (message: string) => {
    toast.info(message);
  },
};

export default Notify;
