import  { createContext, useContext, useMemo, useState } from "react";
import Modal from "./Modal";
export const ModalContext = createContext({ open: () => {} });
export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const value = useMemo(() => ({ open: () => setIsOpen(true) }), []);
  return (
    <ModalContext.Provider value={value}>
      {children} <Modal open={isOpen} onClose={() => setIsOpen(false)} />
    </ModalContext.Provider>
  );
};
export const useModal = () => useContext(ModalContext);
