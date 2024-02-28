import Intro from "./intro";
import Habbit from "./habbit";
import DrawOutlineButton from "../buttons/draw-outline-button";
import SpotlightButton from "../buttons/spotlight-button";

const Home = () => {
  return (
    <>
      <Intro />
      <Habbit />
      <SpotlightButton>123123</SpotlightButton>
    </>
  );
};

export default Home;
