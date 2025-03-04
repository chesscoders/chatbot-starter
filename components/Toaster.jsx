import { Toaster as ToasterBox } from 'react-hot-toast';

const Toaster = () => {
  const toastOptions = {
    duration: 6000,
    position: 'bottom-center',
    className: 'react-hot-toast',
    success: {
      style: {
        background: '#18F2B2', // using `secondary` as a success color
        color: '#121212',
        minWidth: '16rem',
      },
    },
    error: {
      style: {
        background: '#FF5252', // using `softRed` as an error color
        color: '#121212',
        minWidth: '16rem',
      },
    },
  };

  return (
    <ToasterBox toastOptions={toastOptions} />
  );
};


export default Toaster;
