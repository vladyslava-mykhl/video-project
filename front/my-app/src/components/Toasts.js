import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

toast.configure();

export const successToast = (value) => toast.success(value, {
    position: "top-center",
    autoClose: 4000,
    closeOnClick: true,
    draggable: true
});

export const errorToast = (err) => toast.error(err, {
    position: "top-center",
    autoClose: false,
    closeOnClick: true,
    draggable: true
});