import { Link } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../../utils/MyProvider";

export default function Footer() {
  const { setModal } = useContext(MyContext);

  return (
    <section id="contact">
      <footer className="bg-primary text-white py-10 my-5 border-t-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-row justify-around items-center ">
            {/* Logo and Description */}
            <div className="mb-6 md:mb-0">
              <Link to="/" className="flex items-center text-xl font-semibold">
                <img
                  src="/media/brain.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="mr-2"
                />
                AI Hub
              </Link>
              <p className="mt-2 text-sm text-gray-800">
                Providing quality service since 2024.
              </p>
            </div>

            {/* Navigation Links */}
            <Link
              to="/contact"
              onClick={() => {
                setModal({ isOpen: true, type: "contact" });
              }}
            >
              <div className="bg-secondary p-3 shadow-xl rounded-lg font-bold hover:ring hover:ring-white hover:scale-110 transition ease-out duration-300">
                CONTACT US
              </div>
            </Link>

            {/* Social Media Icons */}
            <div>
              <h2 className="font-semibold mb-2">Follow Us</h2>
              <div className="flex space-x-4">
                <a
                  href="www.instagram.com"
                  target="_blank"
                  className="scale-transition hover:-translate-y-0"
                >
                  <img src="/media/insta.gif" alt="" width={32} height={32} />
                </a>
                <a
                  href="www.twitter.com"
                  target="_blank"
                  className="scale-transition hover:-translate-y-0"
                >
                  <img
                    width="32"
                    height="32"
                    src="https://img.icons8.com/ios/32/twitter--v1.png"
                    alt="twitter--v1"
                  />
                </a>
                <a
                  href="www.linkedin.com/in/matthew110703"
                  target="_blank"
                  className="scale-transition hover:-translate-y-0"
                >
                  <img
                    width="32"
                    height="32"
                    src="https://img.icons8.com/windows/32/linkedin.png"
                    alt="linkedin"
                  />
                </a>
                <a
                  href="www.github.com/unknownloop11"
                  target="_blank"
                  className="scale-transition hover:-translate-y-0"
                >
                  <img
                    width="32"
                    height="32"
                    src="https://img.icons8.com/windows/32/github.png"
                    alt="github"
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-sm mx-auto tracking-widest">
            © 2024 ArTiFiciaL InTelLigeNcE HuB. All rights reserved.
          </div>
        </div>
      </footer>
    </section>
  );
}
