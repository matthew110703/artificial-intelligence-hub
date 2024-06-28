import ToolCard from "../components/ToolCard";
import { getAvailableTools } from "../../utils/data";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ExplorePage() {
  const tools = getAvailableTools();
  const [cookies] = useCookies(["user"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.user) {
      navigate("/login");
    }
  });

  return (
    <>
      {/* HERO BANNER  */}
      <div className="flex gap-x-10 justify-start items-center w-3/4 mx-auto bg-primary p-6 my-3 border-l-4 rounded-lg">
        <img src="/media/ai-robot.gif" alt="Explore" width={300} height={300} />
        <p className="text-xl font-light tracking-wide basis-2/5 leading-10 italic">
          <span className="text-6xl font-bold my-2 mr-2 not-italic tracking-wide">
            Explore
          </span>{" "}
          the frontier of AI <br /> with our suite of tools—designed to
          streamline your workflow, boost productivity, and unlock new
          possibilities.
        </p>
      </div>

      {/* TOOL CARDS */}
      <div className="grid grid-cols-2 gap-x-52 gap-y-14 p-5 w-2/3 mx-auto">
        {tools.map((tool, idx) => {
          return (
            <ToolCard
              key={idx}
              name={tool.name}
              description={tool.description}
              image={tool.image}
              href={tool.href}
            />
          );
        })}
      </div>
    </>
  );
}
