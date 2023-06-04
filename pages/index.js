import Image from "next/image";
import Head from "next/head";
import { Inter } from "next/font/google";
import Sidebar from "../components/Sidebar";
import Widgets from "@/components/Widgets";
import Feed from "../components/Feed";
import { getProviders, getSession, useSession } from "next-auth/react";
import Login from "@/components/Login";
import Modal from "@/components/Modal";
import { modalState } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ newsResults, randomUsersResults, providers }) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);

  if (!session) return <Login providers={providers} />;

  return (
    <div className="">
      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        <Feed />

        {/* Widgets */}
        <Widgets
          newsResults={newsResults?.articles}
          randomUsersResults={randomUsersResults?.results || null}
        />
          {isOpen && <Modal />}
      </main>
    </div>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession(context);
  const providers = await getProviders();

  const newsResults = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
  ).then((res) => res.json());

  // Who to follow section

  let randomUsersResults = [];

  try {
    const res = await fetch(
      "https://randomuser.me/api/?results=30&inc=name,login,picture"
    );

    randomUsersResults = await res.json();
  } catch (e) {
    randomUsersResults = [];
  }

  // const randomUsersResults = await fetch(
  //   "https://randomuser.me/api/?results=30&inc=name,login,picture"
  // ).then((res) => res.json());

  return {
    props: {
      newsResults,
      randomUsersResults,
      providers,
      session,
    
    },
  };
}