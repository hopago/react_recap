import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuthentication } = useAuth();

    const getRefreshToken = async () => {
        const res = await axios.get("/refresh", {
            withCredentials: true,
        });

        setAuthentication(prev => {
            console.log(JSON.stringify(prev));
            console.log(res.data.accessToken);
            return { ...prev, accessToken: res.data.accessToken }
        });

        // 리턴 반환값으로 요청을 다시 보낼 수 있다
        return res.data.accessToken;
    };

    return getRefreshToken;
}

export default useRefreshToken