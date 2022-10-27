import { toast } from 'react-toastify';
// import { useDispatch } from 'react-redux';
// import { setToast } from '../store/slices/toastSlice';

export const showSuccessToast = (message) => {
  toast.success(message, {
    position: toast.POSITION.TOP_CENTER,
  });

  // const dispatch = useDispatch();
  // dispatch(setToast({
  //   toastSuccess: '',
  // }));
};

export const showErrorToast = (message) => {
  toast.error(message, {
    position: toast.POSITION.TOP_CENTER,
  });

  // const dispatch = useDispatch();
  // dispatch(setToast({
  //   toastError: '',
  // }));
};

export const showToast = (message) => {
  toast(message, {
    position: toast.POSITION.TOP_CENTER,
  });
};
