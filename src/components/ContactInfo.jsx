import { Mail, MapPin, Phone } from "lucide-react";
import { FaXRay } from "react-icons/fa";

const contactInfo = [
  {
    icon: <MapPin size={20} />,
    title: "Visit office",
    text: "123 Main Street, City, Country",
  },
  {
    icon: <Phone size={20} />,
    title: "Call us",
    text: "+158 996 888",
  },
  {
    icon: <Mail size={20} />,
    title: "Chat to us",
    text: "info@example.com",
  },
  {
    icon: <FaXRay size={20} />,
    title: "Fax",
    text: "+1-548-2588",
  },
];

export default function ContactInfo() {
  return (
    <div className="grid sm:grid-cols-2 gap-6 sm:gap-12 mt-6">
      {contactInfo.map((item, i) => (
        <div key={i} className="flex items-start bg-white">
          <div className="border border-primary shrink-0 w-12 h-10 flex items-center justify-center">
            <span className="text-primary">{item.icon}</span>
          </div>

          <div className="ml-6">
            <h4 className="text-slate-900 text-[15px] font-semibold">
              {item.title}
            </h4>
            <p className="text-[13px] text-slate-600 mt-1.5">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
