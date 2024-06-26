import Image from "next/image";
import { Inter } from "next/font/google";
import Main from "@/components/Main";
import { useState } from "react";
import { GetServerSideProps } from "next";


const inter = Inter({ subsets: ["latin"] });

interface SerchCatImage {
  id: string,
  url: string,
  width: number,
  height: number
}

interface IndexPageProps {
  initialCatImageUrl: string
}

const changeCat = async (): Promise<SerchCatImage> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const result = await res.json();
  return result[0];
}

export default function Home(getServerSideProps: IndexPageProps) {
  const [catImage, setImage] = useState(getServerSideProps.initialCatImageUrl)
  const handlrClick = async () => {
    const catImage = await changeCat();
    setImage(catImage.url)
  }
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh"
    }}>
      <h1>猫の画像アプリ</h1>
      <img
        src={catImage}
        width={500}
        height="auto" />
      <button onClick={handlrClick}>今日の猫さん</button>
    </div>
  );
}

//SSR
export const getServerSideProps: GetServerSideProps<IndexPageProps> = async () => {
  const catImage = await changeCat()
  return {
    props: {
      initialCatImageUrl: catImage.url
    },
  }
}
