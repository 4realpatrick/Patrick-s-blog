import { LazyMotion, domAnimation } from "framer-motion";
import Intro from "./intro";
import Habbit from "./habbit";

const Home = () => {
  return (
    <LazyMotion features={domAnimation}>
      <Intro />
      <Habbit />
    </LazyMotion>
  );
};

export default Home;
