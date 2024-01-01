/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "@/Layout";
import { gsap } from "gsap";
import Cards from "@/components/Cards";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ITEMS_PER_PAGE = 100;

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page) => {
    try {
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;

      const response = await fetch("/_metadata.json");
      const jsonData = await response.json();
      setTotalPages(Math.ceil(jsonData?.length / ITEMS_PER_PAGE));
      setData(jsonData.slice(startIndex, endIndex));
      // console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderData = () => {
    return data?.map((d) => {
      return <Cards key={d.dna} info={d} />;
    });
  };
  // console.log(data);

  //////////////pagination
  // console.log(totalPages);

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`${
            currentPage === i ? "bg-[#111]" : "bg-[#]"
          } border p-4 w-5 h-5 text-white justify-center items-center flex rounded-md`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  // console.log(renderData());

  useEffect(() => {
    const reveal = gsap.fromTo(
      "input, h2",
      { opacity: 0 },
      {
        // scale: 1,
        opacity: 1,
        // translateY: 0,
        duration: 0.5,
        ease: "power2.inOut",
        stagger: 0.1,
      }
    );
    return () => {
      reveal.kill();
    };
  }, []);

  return (
    <Layout title="Search" className={` bg-primary`}>
      <div className="container mx-auto bg-blac">
        <section>
          <div className="flex flex-col  justify-center items-center mt-10 px-4">
            <h2 className="text-xl textcenter mt-0 mb-5">Search NFT rarity</h2>
            <input type="text" placeholder="Type keyword" />
          </div>
        </section>

        <section className="pb-20">
          <div className="image-gallery mt-10">{renderData()}</div>

          <div>
            <div className="flex items-center justify-between mt-14 mb-2 px-3">
              <div className="arr"> &larr; </div>
              <div> &rarr; </div>
            </div>
            <div className="flex justify-start items-center px-3  space-x-5 overflow-x-scroll pb-4 hide-scroll">
              {renderPaginationButtons()}
              {/* <div className="bg-[#] border p-4 w-5 h-5 text-white justify-center items-center flex rounded-md">
              1
            </div>
            <div className="bg-[#111] p-4 border border-black w-6 h-6  text-white justify-center items-center flex rounded-md">
              2
            </div>
            <div className="bg-[#] border p-4 w-5 h-5 text-white justify-center items-center flex rounded-md">
              3
            </div>
            <div className="bg-[#] border p-4 w-5 h-5 text-white justify-center items-center flex rounded-md">
              4
            </div>
            <div className="bg-[#] border p-4 w-5 h-5 text-white justify-center items-center flex rounded-md">
              5
            </div> */}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
