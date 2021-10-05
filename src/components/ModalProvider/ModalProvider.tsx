import React, {
  useCallback, useState, ReactNode, createContext,
} from 'react';

import ModalInfo from '../ModalInfo';

export interface ModalsContextProps {
  children: ReactNode;
}
export const ModalContext = createContext<any>(null);

const ModalProvider = ({ children }: ModalsContextProps) => {
  const [state, setState] = useState({ show: false, title: '' });

  const hideModal = useCallback(() => {
    setState((prevState) => ({ ...prevState, show: false }));
  }, []);

  const showModalInfo = useCallback((title) => {
    setState({ title, show: true });
  }, []);

  return (<ModalContext.Provider value={{ showModalInfo, hideModal }}>
    { children }
    <ModalInfo isShowModal={state.show} modalText={state.title} hideModal={hideModal}/>
  </ModalContext.Provider>);
};

export default ModalProvider;
