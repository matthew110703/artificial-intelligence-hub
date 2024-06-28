/* eslint-disable react/prop-types */

import UserForm from "../components/UserForm";

export default function LoginAndRegisterPage({ isLoginPage }) {
  return (
    <>
      <div className=" w-screen h-screen">
        <div className="flex flex-row">
          <div className=" basis-3/5 w-screen h-screen">
            {/* Image One */}
            <div className="flex flex-row gap-24 h-2/5 m-5 border-b-4 border-white  rounded">
              <img
                src="/media/bot-assistant.gif"
                alt="woman-working"
                className=" w-2/5  aspect-auto scale-transition"
                loading="lazy"
              />
              <div className=" leading-normal text-2xl font-normal italic text-gray-500 w-3/5 my-auto tracking-wide bg-white p-3 rounded-md shadow border-2 border-primary">
                Login or Register to access cutting-edge AI tools and unleash
                the potential of technology.
              </div>
            </div>

            <div className=" text-3xl font-semibold m-auto text-center align-baseline">
              <img src="/media/brain.png" alt="brain" className="m-auto" />
              ArTiFiciaL InTelLigeNcE HuB
            </div>

            {/* Image Two */}
            <div className="flex flex-row-reverse gap-28 h-2/5 m-5 border-t-4 border-white  ">
              <img
                src="/media/ai-brain-floating.gif"
                alt=""
                className=" w-2/5  aspect-auto scale-transition "
              />
              <div className="leading-normal text-2xl font-normal italic text-gray-500 w-3/5 my-auto tracking-wide bg-white p-3 rounded-md shadow border-2 border-primary">
                In the hands of humanity, AI is a brush painting the canvas of
                innovation.
                <br />
                <span className=" text-base float-end">
                  -- Varun Kshatriyas
                </span>
              </div>
            </div>
          </div>

          {/* Form */}

          <div className="border-r-4 border-white"></div>

          <UserForm isLoginPage={isLoginPage} />
        </div>
      </div>
    </>
  );
}
