// UI
import { Hero, ToolCard, Container } from "../components";

// Constants
import { TOOLS } from "../lib/constants";

const Dashboard = () => {
  return (
    <Container>
      <Hero dashboard />

      {/* Tools Grid */}
      <section className="container mx-auto grid grid-cols-1 place-items-center gap-8 p-4 lg:w-2/3 lg:grid-cols-2 lg:p-12">
        {TOOLS.map((tool, index) => (
          <ToolCard key={index} {...tool} />
        ))}
      </section>
    </Container>
  );
};

export default Dashboard;
