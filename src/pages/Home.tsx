import Hero from "./home/Hero";
import { Ticker, Collections, Featured } from "./home/Collections";
import CustomCreation from "./home/CustomCreation";
import Occasions from "./home/Occasions";
import Story from "./home/Story";
import Bestsellers from "./home/Bestsellers";
import Testimonials from "./home/Testimonials";
import { Gallery, VipNewsletter } from "./home/GalleryNewsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <Collections />
      <Featured />
      <CustomCreation />
      <Occasions />
      <Story />
      <Bestsellers />
      <Testimonials />
      <Gallery />
      <VipNewsletter />
    </>
  );
}
