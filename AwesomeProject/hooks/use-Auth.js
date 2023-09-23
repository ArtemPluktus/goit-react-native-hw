import { useSelector } from "react-redux";

export function useAuth(){
    const {photo, name} = useSelector(state = state.auth.user);

    return { photo, name};
}