import CountUp from "react-countup";
import Container from "../../Shared/Container";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const StatisticsHome = () => {

  const axiosPublic = useAxiosPublic()

  // Load book parcels data
  const { data: booked = [] } = useQuery({
    queryKey: ["info-booked"],
    queryFn: async () => {
      const res = await axiosPublic.get("/info-all-parcels");
      return res.data;
    },
  });
  const bookParcels = booked.length

   // Load delivered parcels data
   const { data: delivery = [] } = useQuery({
    queryKey: ["info-delivery"],
    queryFn: async () => {
      const res = await axiosPublic.get("/info-delivery");
      return res.data;
    },
  });
  const deliveredParcels = delivery.length
  console.log(deliveredParcels)

   // Load users data
   const { data: users = [] } = useQuery({
    queryKey: ["info-all-users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/info-all-parcels");
      return res.data;
    },
  });
  const AllUsers = users.length

  const statItems = [
    {
      title: "Parcels Booked",
      value: bookParcels,
      color: "text-yellow-500",
    },
    {
      title: "Parcels Delivered",
      value: deliveredParcels,
      color: "text-green-500",
    },
    {
      title: "Users",
      value: AllUsers,
      color: "text-blue-500",
    },
  ];

  return (
    <Container>
      <div className="py-12 bg-white">
        <div className=" text-center">
          {/* Section Title */}
          <h2 className="text-3xl font-bold mb-8">App Usage Statistics</h2>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {statItems.map((item, index) => (
              <div
                key={index}
                className="bg-gray-100 shadow-md p-6 rounded-lg text-center transform transition duration-300 hover:scale-105"
              >
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className={`text-4xl font-bold ${item.color}`}>
                  <CountUp end={item.value} duration={2} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default StatisticsHome;
