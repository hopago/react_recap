import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuthentication } = useAuth();

    const logout = async () => {
        setAuthentication({});

        try {
            await axios.post("/logout", {
                withCredentials: true,
            });
        } catch (err) {
            console.log(err);
        }
    };

    return logout;
};

export default useLogout;