import { toast } from "react-hot-toast";

export const showSuccessToast = (msg: string) => toast.success(msg);
export const showErrorToast = (msg: string) => toast.error(msg);
