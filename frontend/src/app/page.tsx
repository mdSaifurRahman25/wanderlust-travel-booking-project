import Banner from "@/components/homepage/Banner";
import CallToAction from "@/components/homepage/CallToAction";
import Testimonials from "@/components/homepage/Testimonials";
import WhyChoose from "@/components/homepage/WhyChoose";

export default function Home() {
  return (
    <main className="flex-1">
      <Banner />
      <WhyChoose />
      <Testimonials />
      <CallToAction />
    </main>
  );
}

