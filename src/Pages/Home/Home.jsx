import { Helmet } from 'react-helmet-async'
import StatisticsHome from '../../Components/Home/StatisticsHome/StatisticsHome'
import TopDeliveryMen from '../../components/Home/TopDeliveryMen/TopDeliveryMen'
import Banner from '../../Components/Home/Banner/Banner'
import Features from '../../Components/Home/Features/Features'


const Home = () => {
  return (
    <div>
      <Helmet>
        <title> Go parcel | Home</title>
      </Helmet>
      <Banner></Banner>
      <Features></Features>
      <StatisticsHome></StatisticsHome>
      <TopDeliveryMen></TopDeliveryMen>
    </div>
  )
}

export default Home
