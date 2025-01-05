import { createContext, useState } from 'react';

const ModalContext = createContext();
const ModalProvider = (props) => {
    const [modal, setModal] = useState([]);

    const closeModal = () => {
        setModal([]);
    };

    const openModal = (modal) => {
        setModal(modal);
    };

    const contextValue = {
        modal,
        closeModal,
        openModal,
    };

    return <ModalContext.Provider value={contextValue}>{props.children}</ModalContext.Provider>;
};

export { ModalProvider };
export default ModalContext;
