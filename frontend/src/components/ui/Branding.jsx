import Icon from "./Icon";
import { logo } from "../../assets";

const Branding = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Icon src={logo} alt="Logo" size={48} invert className="mx-auto" />
      <div className="text-center">
        <h2 className="font-primary text-xl font-bold md:text-2xl">
          ArTiFiciaL InTelLigeNcE HuB
        </h2>
        <p className="text-center text-xs">
          Your AI Journey Starts Here – Let’s Innovate Together!
        </p>
      </div>
    </div>
  );
};

export default Branding;
