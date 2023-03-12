import {createRef} from 'react';
export const navigationRef = createRef();
export const toastRef = createRef();

export const navigate = (name: string, params = {}) => {
  navigationRef.current?.navigate(name, params);
};

export const navigatePop = () => {
  navigationRef.current?.goBack();
};
