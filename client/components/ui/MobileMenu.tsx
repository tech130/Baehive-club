import { useState } from "react";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Why Us", href: "#why-us" },
    { label: "Events", href: "#up-events" },
    { label: "Testimonials", href: "#testimonials1" },
  ];

  return (
    <div>
      {/* Hamburger Button */}
      <button className="md:hidden p-2" onClick={() => setIsOpen(true)}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="w-64 bg-white h-full shadow-lg p-6 flex flex-col">
            {/* Close Button */}
            <button className="self-end mb-6 p-2" onClick={() => setIsOpen(false)}>
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Menu Items */}
            <ul className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-lg font-semibold text-black hover:text-pink-500"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
