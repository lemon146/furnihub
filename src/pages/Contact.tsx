import MainLayout from "@/components/layout/MainLayout";
import ContactInfo from "@/components/section/ContactInfo";
import banner from "../assets/images/shop-banner.png";
import ServiceFeature from "../components/section/ServiceFeature";

const Contact = () => {
  return (
    <>
      <MainLayout>
        <div className="relative w-full h-[280px] md:h-[380px] overflow-hidden">
          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-2">Contact</h2>
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
              <span className="text-white font-medium">Contact</span>
            </div>
          </div>

          <img
            src={banner}
            alt="Shop Banner"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Contact section */}
        <div className="max-w-6xl max-lg:max-w-3xl mx-auto px-4 py-8">
          <div className="bg-white [box-shadow:0_2px_10px_-3px_rgba(14,14,14,0.3)] rounded-sm p-6 sm:p-8">
            <h2 className="text-3xl text-slate-900 font-bold text-center">
              Contact us
            </h2>

            <div className="grid lg:grid-cols-2 items-start gap-12 mt-12">
              {/* Form */}
              <form className="space-y-4 text-slate-900">
                <div>
                  <label className="text-sm font-medium mb-2 block">Name</label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    className="w-full bg-gray-100 py-2.5 px-4 text-sm border border-gray-200 
            focus:bg-transparent focus:border-primary focus:ring-1 focus:ring-primary 
            outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    className="w-full bg-gray-100 py-2.5 px-4 text-sm border border-gray-200 
            focus:bg-transparent focus:border-primary focus:ring-1 focus:ring-primary 
            outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Phone
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Phone No."
                    className="w-full bg-gray-100 py-2.5 px-4 text-sm border border-gray-200 
            focus:bg-transparent focus:border-primary focus:ring-1 focus:not-enabled:
            outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Message
                  </label>
                  <textarea
                    placeholder="Enter Message"
                    rows={6}
                    className="w-full bg-gray-100 px-4 text-sm pt-3 border border-gray-200
            focus:bg-transparent focus:border-primary focus:ring-1 focus:ring-primary
            outline-none transition-all"
                  ></textarea>
                </div>

                <button
                  type="button"
                  className="text-white bg-primary hover:bg-primary/90 text-sm font-medium px-4 py-2.5 cursor-pointer !mt-2 flex items-center gap-2"
                >
                  <svg
                    width="16px"
                    height="16px"
                    fill="currentColor"
                    viewBox="0 0 548.244 548.244"
                    className="inline"
                  >
                    <path d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z" />
                  </svg>
                  Send Message
                </button>
              </form>

              {/* Contact Details */}
              <ContactInfo />
            </div>
          </div>
        </div>

        <ServiceFeature />
      </MainLayout>
    </>
  );
};

export default Contact;
