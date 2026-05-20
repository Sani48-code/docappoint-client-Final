import { Helmet } from 'react-helmet-async';
import HeroBanner from './HeroBanner';
import TopRatedDoctors from './TopRatedDoctors';
import WhyChooseUs from './WhyChooseUs';
import HowItWorks from './HowItWorks';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>DocAppoint – Find & Book Top Doctors</title>
        <meta name="description" content="DocAppoint connects you with top-rated doctors. Book appointments online instantly with verified specialists." />
      </Helmet>
      <HeroBanner />
      <TopRatedDoctors />
      <WhyChooseUs />
      <HowItWorks />
    </>
  );
}
