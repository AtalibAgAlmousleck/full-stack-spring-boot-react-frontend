import { toast } from "react-toastify";

const toastMessage = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light"
};

export function toastInfo(message) {
    toast.info(message, toastMessage);
}