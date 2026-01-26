import MainLayout from "@/components/layout/MainLayout";
import {
  Armchair,
  Award,
  Bed,
  Heart,
  Sofa,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useRef } from "react";
import banner from "../assets/images/shop-banner.png";

const About = () => {
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);

  useEffect(() => {
    // GSAP animations
    const animateOnScroll = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          element.classList.add("animate-fade-in");
        }
      });
    };

    const observer = new IntersectionObserver(animateOnScroll, {
      threshold: 0.1,
    });

    [statsRef, valuesRef, teamRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    // Hero animation
    if (heroRef.current) {
      const hero = heroRef.current as HTMLElement;
      hero.style.opacity = "0";
      hero.style.transform = "translateY(30px)";
      setTimeout(() => {
        hero.style.transition = "all 1s ease-out";
        hero.style.opacity = "1";
        hero.style.transform = "translateY(0)";
      }, 100);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <MainLayout>
      <div className="relative w-full h-[280px] md:h-[380px] overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-2">About</h2>
          <div className="flex items-center gap-2 text-sm md:text-base text-gray-200">
            <span className="text-gray-300">Home</span>
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m9 5 7 7-7 7"
              />
            </svg>
            <span className="text-white font-medium">About</span>
          </div>
        </div>

        <img
          src={banner}
          alt="Shop Banner"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        {/* Hero Section */}
        <div
          ref={heroRef}
          className="relative overflow-hidden bg-gradient-to-r from-orange-100 via-yellow-50 to-orange-100 py-20 px-4"
        >
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute top-10 left-10 w-64 h-64 rounded-full blur-3xl"
              style={{ backgroundColor: "#b88e2f" }}
            ></div>
            <div
              className="absolute bottom-10 right-10 w-96 h-96 rounded-full blur-3xl"
              style={{ backgroundColor: "#b88e2f" }}
            ></div>
          </div>

          <div className="max-w-6xl mx-auto text-center relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6">
              Welcome to{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #b88e2f, #d4a645)",
                }}
              >
                Furniro
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Crafting beautiful living spaces with premium furniture that
              transforms houses into homes
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-800">Our Story</h2>
              <p className="text-gray-600 leading-relaxed">
                Founded with a passion for exceptional craftsmanship, Furniro
                has been bringing elegance and comfort to homes for over a
                decade. We believe that furniture is more than just objects—it's
                the foundation of memories, comfort, and style.
              </p>
              <p className="text-gray-600 leading-relaxed">
                From luxurious sofas to elegant beds and statement chairs, every
                piece is carefully curated to meet the highest standards of
                quality and design. Our commitment to excellence drives us to
                source the finest materials and work with skilled artisans.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div
                className="col-span-2 rounded-2xl p-8 flex items-center justify-center h-64 transform hover:scale-105 transition-transform"
                style={{
                  background:
                    "linear-gradient(to bottom right, #d4a645, #b88e2f)",
                }}
              >
                <Sofa className="w-24 h-24 text-white" />
              </div>
              <div
                className="rounded-2xl p-6 flex items-center justify-center transform hover:scale-105 transition-transform"
                style={{
                  background:
                    "linear-gradient(to bottom right, #b88e2f, #d4a645)",
                }}
              >
                <Bed className="w-16 h-16 text-white" />
              </div>
              <div
                className="rounded-2xl p-6 flex items-center justify-center transform hover:scale-105 transition-transform"
                style={{
                  background:
                    "linear-gradient(to bottom right, #d4a645, #b88e2f)",
                }}
              >
                <Armchair className="w-16 h-16 text-white" />
              </div>
              <div
                className="col-span-2 rounded-2xl p-8 flex items-center justify-center transform hover:scale-105 transition-transform"
                style={{
                  background:
                    "linear-gradient(to bottom right, #b88e2f, #d4a645)",
                }}
              >
                <Award className="w-20 h-20 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className="opacity-0 max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users, number: "50K+", label: "Happy Customers" },
              { icon: Award, number: "15+", label: "Awards Won" },
              { icon: TrendingUp, number: "99%", label: "Satisfaction Rate" },
              { icon: Heart, number: "10K+", label: "Products Sold" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2"
                style={{ borderColor: "#b88e2f33" }}
              >
                <stat.icon
                  className="w-12 h-12 mx-auto mb-4"
                  style={{ color: "#b88e2f" }}
                />
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div
          ref={valuesRef}
          className="opacity-0 py-16 px-4"
          style={{ background: "linear-gradient(to right, #fef3e2, #fdf8f0)" }}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
              Our Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Quality First",
                  description:
                    "We never compromise on the quality of materials and craftsmanship that goes into every piece.",
                  gradient:
                    "linear-gradient(to bottom right, #b88e2f, #d4a645)",
                },
                {
                  title: "Customer Centric",
                  description:
                    "Your satisfaction is our priority. We go above and beyond to ensure you love your furniture.",
                  gradient:
                    "linear-gradient(to bottom right, #d4a645, #b88e2f)",
                },
                {
                  title: "Sustainable",
                  description:
                    "We are committed to eco-friendly practices and sustainable sourcing for a better tomorrow.",
                  gradient:
                    "linear-gradient(to bottom right, #b88e2f, #c49a38)",
                },
              ].map((value, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2"
                >
                  <div
                    className="w-16 h-16 rounded-xl mb-6"
                    style={{ background: value.gradient }}
                  ></div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div ref={teamRef} className="opacity-0 max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Founder & CEO",
                gradient: "linear-gradient(to bottom right, #b88e2f, #d4a645)",
              },
              {
                name: "Michael Chen",
                role: "Design Director",
                gradient: "linear-gradient(to bottom right, #d4a645, #b88e2f)",
              },
              {
                name: "Emily Rodriguez",
                role: "Quality Manager",
                gradient: "linear-gradient(to bottom right, #b88e2f, #c49a38)",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2"
              >
                <div
                  className="h-80 flex items-center justify-center"
                  style={{ background: member.gradient }}
                >
                  <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
                    <Users className="w-16 h-16" style={{ color: "#b88e2f" }} />
                  </div>
                </div>
                <div className="bg-white p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {member.name}
                  </h3>
                  <p className="font-semibold" style={{ color: "#b88e2f" }}>
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div
          className="py-16 px-4 text-center"
          style={{ background: "linear-gradient(to right, #b88e2f, #d4a645)" }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-orange-50 mb-8">
              Explore our collection and find the perfect pieces for your home
            </p>
            <button
              className="bg-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-50 transition-all transform hover:scale-105 shadow-xl"
              style={{ color: "#b88e2f" }}
            >
              Shop Now
            </button>
          </div>
        </div>

        <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
      </div>
    </MainLayout>
  );
};

export default About;
