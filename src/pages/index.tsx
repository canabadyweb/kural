import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { type FC, useState } from "react";
import { api } from "~/utils/api";

export default function Home() {

  return (
    <>
      <Head>
        <title>Kural</title>
        <meta name="description" content="Learning Thirukkural" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Easy <span className="text-[hsl(280,100%,70%)]">Kural</span> Learning
          </h1>
          <div className="flex flex-col items-center gap-2">
             <Link
            href="/learn"
            className={[
              "flex w-full items-center justify-center rounded-xl border-b-4 border-gray-200 bg-white p-3 uppercase",
              "text-green-500",
            ].join(" ")}
          >
            Learn
          </Link>
            {/* <ThirukkuralAthikaram chapter={16}/> */}
          </div>
          <div className="flex flex-col items-center gap-2">
            {/* <AuthShowcase /> */}
          </div>
        </div>
      </main>
    </>
  );
}

const ThirukkuralAthikaram:FC = ({
  chapter = 1,
}:{
  chapter?:number
}) => {
  const { data: athikaramKurals, isLoading } = api.thirukkural.getKuralsForAthikaram.useQuery({ chapter_index: chapter });
  // const { data: athikaramKurals, isLoading } = api.thirukkural.getAll.useQuery();

  if(isLoading) return <div>Fetching Kurals...</div>;

  return (
    <div className="flex flex-col gap-4">
      {athikaramKurals?.map((entry, index) => {
      return (
        <div key={index} className="text-white">
          <span>{entry.id}</span>
          <p>{entry.kural}</p>
        </div>
      );
      })}
    </div>
  );
};

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
