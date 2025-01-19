import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {data:roleType, isLoading}= useQuery({
    queryKey: ['roleType', user?.email ],
    queryFn: async ()=>{
        const {data}= await axiosSecure(`/user/roleType/${user?.email}`)
        return data.roleType
    }
  })
  return [roleType, isLoading]
};

export default useRole;
