import Head from "next/head";
import Header from "./components/Header";

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title ? `${title} | Fronk-Cartel` : "Fronk-Cartel"}</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Header />
      <main className="min-h-screen">{children}</main>
    </>
  );
}
