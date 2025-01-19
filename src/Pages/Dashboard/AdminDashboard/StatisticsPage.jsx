import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const StatisticsPage = () => {
  const [bookingsByDate, setBookingsByDate] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    fetchBookingsByDate();
  }, []);

  // Fetch Bookings By Date
  const fetchBookingsByDate = async () => {
    try {
      const { data } = await axiosPublic.get("/info-all-parcels");
      const groupedData = data.reduce((acc, parcel) => {
        if (!parcel.bookingDate) return acc;
        const date = new Date(parcel.bookingDate).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      const formattedData = Object.keys(groupedData).map((date) => ({
        x: date,
        y: groupedData[date],
      }));

      setBookingsByDate(formattedData);
    } catch (error) {
      console.error("Error fetching bookings by date:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Statistics</h1>

      {/* Bar Chart */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-center mb-4">
          Bookings By Date
        </h2>
        <Chart
          type="bar"
          series={[{ name: "Bookings", data: bookingsByDate }]}
          options={{
            chart: { id: "bookings-bar-chart" },
            xaxis: { type: "category", title: { text: "Booking Date" } },
            yaxis: { title: { text: "Number of Bookings" } },
          }}
          height={350}
        />
      </div>

      
    </div>
  );
};

export default StatisticsPage;
