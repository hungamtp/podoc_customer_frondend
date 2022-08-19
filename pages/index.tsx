import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/common/header";
import HomePage from "./home";
import Footer from "../components/common/footer";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Print on demand</title>
        <meta
          name="description"
          content="Print on demand of customers in VietNam /n Bán các sản phẩm in theo yêu cầu. Không có mức tối thiểu và không mất phí."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />
        <HomePage />
        <Footer />
      </main>
    </div>
  );
};

export default Home;
