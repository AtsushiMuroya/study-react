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
const tenCats = async () => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search?limit=10");
  const result = await res.json();
  return result;
}
export default function Home(props: IndexPageProps) {
  const [catImage, setImage] = useState<string[]>([props.initialCatImageUrl])
  const handlrClick = async () => {
    const catImages = await tenCats();
    setImage(catImages.map((catImage: { url: string; }) => catImage.url));
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
      {catImage.map((url, index) => (
        <img
          key={index}
          src={url}
          style={{ marginBottom: '10px' }}
          alt={`Cat number ${index + 1}`} />
      ))}
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
