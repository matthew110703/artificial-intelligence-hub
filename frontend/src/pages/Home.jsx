// UI
import { Hero, Feature, Container } from "../components";

// Constants
import { FEATURES } from "../lib/constants";

const Home = () => {
  return (
    <Container className="space-y-16" contentClassname={"space-y-16"}>
      <Hero />
      <section className="space-y-16">
        {FEATURES.map((feature, index) => (
          <Feature key={index} {...feature} />
        ))}
      </section>
    </Container>
  );
};

export default Home;
