import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, User, Store, Bell, Shield, Globe } from "lucide-react";

export function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 bg-white p-4 rounded-2xl shadow"
      >
        <Settings className="text-gray-700" />
        <h2 className="text-xl font-bold text-gray-800">Settings</h2>
      </motion.div>

      {/* GRID */}
      <div className="grid lg:grid-cols-2 gap-6">
        <SettingsCard icon={<User />} title="Profile">
          <SettingsInput placeholder="Admin Name" />
          <SettingsInput placeholder="Email" />
          <ActionButton label="Save Profile" />
        </SettingsCard>

        <SettingsCard icon={<Store />} title="Store">
          <SettingsInput placeholder="Store Name" />
          <SettingsInput placeholder="Logo URL" />
          <SettingsInput placeholder="Currency (USD, PKR)" />
          <ActionButton label="Save Store" />
        </SettingsCard>

        <SettingsCard icon={<Bell />} title="Notifications">
          <Toggle label="New Order Alerts" />
          <Toggle label="Low Stock Alerts" />
          <Toggle label="Email Reports" />
        </SettingsCard>

        <SettingsCard icon={<Shield />} title="Security">
          <SettingsInput placeholder="Current Password" type="password" />
          <SettingsInput placeholder="New Password" type="password" />
          <ActionButton label="Update Password" />
        </SettingsCard>

        <SettingsCard icon={<Globe />} title="General">
          <Toggle label="Maintenance Mode" />
          <Toggle label="Allow Guest Checkout" />
        </SettingsCard>
      </div>
    </div>
  );
}

/* ---------------- CARD ---------------- */

function SettingsCard({ icon, title, children }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className="bg-white rounded-2xl shadow p-5 space-y-4"
    >
      <div className="flex items-center gap-3 border-b pb-3">
        <div className="p-2 bg-gray-100 rounded-xl text-gray-700">{icon}</div>
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>

      <div className="space-y-3">{children}</div>
    </motion.div>
  );
}

/* ---------------- INPUT ---------------- */

function SettingsInput({ placeholder, type = "text" }: any) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition"
    />
  );
}

/* ---------------- BUTTON ---------------- */

function ActionButton({ label }: any) {
  return (
    <button className="w-full bg-black text-white py-2.5 rounded-xl hover:scale-[1.02] transition shadow">
      {label}
    </button>
  );
}

/* ---------------- TOGGLE (REAL STATE) ---------------- */

function Toggle({ label }: any) {
  const [enabled, setEnabled] = useState(false);

  return (
    <div
      onClick={() => setEnabled(!enabled)}
      className="flex items-center justify-between cursor-pointer py-1"
    >
      <span className="text-sm text-gray-700">{label}</span>

      <div
        className={`w-11 h-6 flex items-center rounded-full p-1 transition ${
          enabled ? "bg-black" : "bg-gray-300"
        }`}
      >
        <motion.div
          layout
          className="w-4 h-4 bg-white rounded-full shadow"
          animate={{ x: enabled ? 20 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </div>
    </div>
  );
}
