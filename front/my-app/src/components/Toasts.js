import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

toast.configure();

export const notification = (type, value) => {
    switch (type) {
        case 'success':
            toast.success(value, {
                position: "top-center",
                autoClose: 4000,
                closeOnClick: true,
                draggable: true
            });
            break;
        case 'error':
            toast.error(value, {
                position: "top-center",
                autoClose: false,
                closeOnClick: true,
                draggable: true
            });
            break;
    };
};