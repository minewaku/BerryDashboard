import { useContext } from "react";
import ModalContext from "~/store/context/ModalContext";

const useModal = () => {
  return useContext(ModalContext);
};

export default useModal;
