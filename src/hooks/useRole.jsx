import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: roleType, isPending: isLoading } = useQuery({
    queryKey: ["roleType", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/roleType/${user?.email}`);
      return data || null;
    },
  });
  return [roleType, isLoading];
};

export default useRole;
