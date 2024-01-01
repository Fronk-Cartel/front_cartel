import Layout from "@/Layout";
import { gsap } from "gsap";
import Cards from "@/components/Cards";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

export default function Home() {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const ITEMS_PER_PAGE = 100;

  useEffect(() => {
    fetchData(currentPage);

    // Scroll to the top of the page when the page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    fetchData(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const fetchData = async (page, term = "") => {
    try {
      const response = await fetch("/_metadata.json");
      const jsonData = await response.json();
      setTotalPages(Math.ceil(jsonData?.length / ITEMS_PER_PAGE));

      // Filter data based on the search term
      const filteredData = jsonData.filter((item) =>
        item.name.toString().includes(term)
      );

      setData(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderData = () => {
    return data?.slice(startIndex, endIndex).map((d) => {
      return <Cards key={d.dna} info={d} />;
    });
  };

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

  useEffect(() => {
    const reveal = gsap.fromTo(
      "input, h2",
      { opacity: 0 },
      {
        opacity: 1,
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
          <div className="flex flex-col justify-center items-center mt-10 px-4 ">
            <h2 className="text-xl textcenter mt-0 mb-5">
              Search NFT rarity by number
            </h2>
            <div className="w-full relative">
              <input
                type="text"
                placeholder="Type Number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute top-3 right-2 text-primary ">
                <AiOutlineSearch size={28} />
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20">
          {data?.length > 0 ? (
            <>
              <div className="image-gallery mt-10">{renderData()}</div>
              <div>
                <div className="flex items-center justify-between mt-14 mb-2 px-3">
                  <div className="arr"> &larr; </div>
                  <div> &rarr; </div>
                </div>
                <div className="flex justify-start items-center px-3 space-x-5 overflow-x-scroll pb-4 hide-scroll">
                  {renderPaginationButtons()}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center mt-20 text-xl">
              {searchTerm ? "No results found." : <div className="animate-pulse">Loading...</div>}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}
