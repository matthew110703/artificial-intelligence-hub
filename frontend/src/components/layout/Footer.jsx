import { Link } from "react-router-dom";

// UI
import Icon from "../ui/Icon";

// Icons
import { logo } from "../../assets";

import { SOCIAL_LINKS } from "../../lib/constants";

const Footer = () => {
  return (
    <footer className="bg-primary text-dark mt-16 w-full space-y-4 px-12 py-8">
      {/* Brand  */}
      <div className="space-y-1 text-center">
        <Icon src={logo} alt="logo" size={32} className={"mx-auto"} />
        <Link to="/" className="font-primary text-lg font-semibold md:text-xl">
          ArTiFiciaL InTelLigeNcE HuB
        </Link>
        <p className="text-sm">Developed By Mathew</p>
        <p className="text-xs">© 2025</p>
      </div>

      {/* Links */}
      <aside className="flex justify-center gap-8">
        {SOCIAL_LINKS.map(({ name, icon, url }) => (
          <a key={name} href={url} target="_blank">
            <Icon src={icon} alt={name} size={24} />
          </a>
        ))}
      </aside>
    </footer>
  );
};

export default Footer;
