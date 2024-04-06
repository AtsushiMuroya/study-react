import Image from "next/image";
import { Inter } from "next/font/google";
import { Title } from "./Title";
import { Logo } from "./Logo";
import { Footer } from "./Footer";

const inter = Inter({ subsets: ["latin"] });

type MainProps = {
  components: string;
  number?: Number;
}

const Main: React.FC<MainProps> = (props) => {
  const { components, number } = props;
  console.log(number)
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Title components={components} />
      <Logo />
      <Footer />
    </main>
  );

}

export default Main;
