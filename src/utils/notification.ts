import toast from "react-hot-toast";
import { Response } from "@/types/response";

export const handleResponse = <T>(response:Response<T>) => {
    console.log(response);
    if (!response) {
        toast.error("An unexpected error occurred.");
        return;
    }

    switch (response.status) {
        case 401:
            toast.error(response.message || "Unauthorized access.");
            break;
        case 400:
            toast.error(response.message || "Validation error.");
            break;
        case 200:
        case 201:
            toast.success(response.message || "Operation successful.");
            break;
        case 500:
            toast.error(response.message || "Internal server error.");
            break;
        default:
            toast.error("An unexpected error occurred.");
    }
}

export const handleUnauthorized = () => {
    toast.error("Unauthorized access.");
}