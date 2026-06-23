import Hero from '../components/Hero';
import SportCategories from '../components/SportCategories';
import FeaturedFacilities from '../components/FeaturedFacilities';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';

export default function Home() {
  return (
    <>
      <Hero />
      <SportCategories />
      <FeaturedFacilities />
      <HowItWorks />
      <Testimonials />
    </>
  );
}
