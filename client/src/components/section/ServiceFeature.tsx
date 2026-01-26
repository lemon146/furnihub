import gsap from "gsap";
import { BadgeCheck, Headset, Trophy, TruckElectric } from "lucide-react";
import { useEffect, useRef } from "react";

const ServiceFeature = () => {
  // GSAP refs
  const cardsRef = useRef<HTMLElement[]>([]);

  // Function to add card refs
  const addToRefs = (el: HTMLElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    // Clear previous refs on reload
    cardsRef.current = [];

    if (cardsRef.current.length > 0) {
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out",
      });
    }
  }, []);
  return (
    <div className="mt-10 bg-1 w-full px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        <div
          className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left bg-white p-4 rounded shadow"
          ref={addToRefs}
        >
          <Trophy size={36} strokeWidth={0.5} />
          <div>
            <h6 className="font-semibold">High Quality</h6>
            <p className="text-sm font-medium text-gray-700">
              Crafted from top materials
            </p>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left bg-white p-4 rounded shadow"
          ref={addToRefs}
        >
          <BadgeCheck size={36} strokeWidth={0.5} />
          <div>
            <h6 className="font-semibold">Warranty Protection</h6>
            <p className="text-sm font-medium text-gray-700">
              Crafted from top materials
            </p>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left bg-white p-4 rounded shadow"
          ref={addToRefs}
        >
          <TruckElectric size={36} strokeWidth={0.5} />
          <div>
            <h6 className="font-semibold">Free Shipping</h6>
            <p className="text-sm font-medium text-gray-700">
              Crafted from top materials
            </p>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left bg-white p-4 rounded shadow"
          ref={addToRefs}
        >
          <Headset size={36} strokeWidth={0.5} />
          <div>
            <h6 className="font-semibold">24 / 7 Support</h6>
            <p className="text-sm font-medium text-gray-700">
              Crafted from top materials
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceFeature;
