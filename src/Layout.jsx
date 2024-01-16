import Head from "next/head";
import Header from "./components/Header";

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title ? `${title} | Fronk-Cartel` : "Fronk-Cartel"}</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/9901.png" />
        {/* <link rel="stylesheet" href="" /> */}
      </Head>
      <Header />
      <main className="min-h-screen">{children}</main>
    </>
  );
}
