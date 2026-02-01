
import HeroSection from "./components/HeroSection";
import About from "./components/About";
import Team from "./components/Team";
import Faculty from "./components/Faculty";
import Events from "./components/Events";


export const metadata = {
  title: "ARHAM - GGSIPU EDC",
};

export default function Home() {
  

  return (
    <>
    <HeroSection/>
    <About/>
    <Events/>
    <Faculty/>
    <Team/>
    </>
  );
}
