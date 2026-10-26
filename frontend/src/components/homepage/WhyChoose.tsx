import Image from "next/image";

const features = [
  {
    icon: "/images/ShieldCheck.png",
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/images/MapTrifold.png",
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/images/Headset.png",
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export default function WhyChoose() {
  return (
    <section
      id="why-choose"
      aria-labelledby="why-choose-heading"
      className="bg-[#edfcff] px-4 py-16 sm:px-6 sm:py-20 lg:px-20 lg:py-[120px]"
    >
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="text-center">
          <h2
            id="why-choose-heading"
            className="font-display text-[clamp(2.25rem,4.17vw,3.75rem)] font-medium leading-none tracking-[-0.03em] text-[#0c0b0b]"
          >
            Why Choose Wanderlust
          </h2>
          <p className="mt-2 text-base leading-[1.6667] tracking-[-0.03em] text-[#6c696d] sm:text-lg">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="flex flex-col bg-white p-6 sm:p-8 lg:min-h-[248px] xl:p-10"
            >
              <Image
                src={feature.icon}
                alt=""
                width={48}
                height={48}
                className="size-12"
              />
              <h3 className="mt-6 font-display text-2xl leading-none tracking-[-0.015em] text-[#0c0b0b] sm:text-[2rem] lg:text-3xl xl:text-[2rem]">
                {feature.title}
              </h3>
              <p className="mt-4 text-base leading-[1.5] tracking-[-0.004em] text-[#6c696d]">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
