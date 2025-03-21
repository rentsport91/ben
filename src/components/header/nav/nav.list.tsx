import { NavItem } from "./nav.items";

const nav_data = [
  { label: "home", href: "/" },
  {
    label: "Ship",
    subMenu: [
      {
        label: "Create Shipment",
        href: "/create-shipment",
      },
      {
        label: "Get a Rate and Time Quote",
        href: "/get-quote",
      },
      {
        label: "Schedule Pickup",
        href: "/schedule-pickup",
      },
    ],
  },
  { label: "Track", href: "/tracking" },

  {
    label: "Services",
    subMenu: [
      {
        label: "Express Delivery",
        href: "/",
      },
      {
        label: "Freight Forwarding",
        href: "/",
      },
      {
        label: "Same-Day Delivery",
        href: "/",
      },
    ],
  },
  { label: "Support", href: "/support" },
];

export const NavList = () => {
  return (
    <div className="hidden lg:block">
      <ul className="flex items-center">
        {nav_data.map((item, index) => (
          <NavItem key={index} item={item} />
        ))}
      </ul>
    </div>
  );
};
