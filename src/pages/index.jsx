import Layout from "@/Layout";
import { gsap } from "gsap";
import Cards from "@/components/Cards";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";

export default function Home() {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState(false);
  const ITEMS_PER_PAGE = 100;

  const showFilter = () => {
    setFilter(!filter);
  };

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
      const filteredData = jsonData
        .filter((item) => item.name.toString().includes(`#${term}`))
        .sort((a, b) => {
          // Extract numbers from names and compare
          const numA = parseInt(a.name.match(/\d+/)[0], 10);
          const numB = parseInt(b.name.match(/\d+/)[0], 10);
          return numA - numB;
        });

      setData(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderSelect = () => {
    return data?.map((d) => {
      return d?.attributes?.map((a) => {
        // console.log(a?.trait_types);
      });
    });
  };
  renderSelect();

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
      "input, h2, .filter",
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
      <div className="container mx-auto ">
        <section>
          <div className="flex flex-col justify-center items-center mt-10 px-4 ">
            <h2 className="text-xl text-center mt-0 mb-5">
              Search NFT rarity by number
            </h2>
            <div className="w-full relative flex space-x-2">
              <input
                type="text"
                placeholder="Type Number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute top-3 right-16 text-primary ">
                <AiOutlineSearch size={28} />
              </div>
              <div
                onClick={showFilter}
                className="filter shadow-lg cursor-pointer flex justify-center items-center h-12 rounded-md bg-white text-primary w-12"
              >
                <FiFilter size={24} />
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
              {searchTerm ? (
                "No results found."
              ) : (
                <div className="animate-pulse">Loading...</div>
              )}
            </div>
          )}
        </section>

        <div
          className={`${
            filter
              ? "translate-y-0  md:translate-x-0"
              : "-translate-y-full md:translate-y-0 md:translate-x-full"
          } duration-300 h-screen bg-[#44444450] backdrop-blur-sm fixed z-40 top-0 bottom-0 right-0 md:w-[50vw] w-[100vw]`}
        >
          <div className="bg-white text-primary py-10 relative">
            <div
              onClick={showFilter}
              className="cursor-pointer text-2xl fixed z-[100] right-7 top-2"
            >
              X
            </div>
            <h3 className="text-xl text-center mb-5 text-primary font-medium">
              Filter By Traits
            </h3>
            <div className="pl-4 pr-8">
              <div>
                <select>
                  <option value="Body">Body</option>
                  <option value="Body">Body</option>
                  <option value="Body">Body</option>
                  <option value="Body">Body</option>
                  <option value="Body">Body</option>
                </select>

                <select>
                  <option value="Body">Face</option>
                  <option value="Body">Body</option>
                  <option value="Body">Body</option>
                  <option value="Body">Body</option>
                  <option value="Body">Body</option>
                </select>

                <select>
                  <option value="Body">Face</option>
                  <option value="Body">Body</option>
                  <option value="Body">Body</option>
                  <option value="Body">Body</option>
                  <option value="Body">Body</option>
                </select>

                <select>
                  <option value="Body">Face</option>
                  <option value="Body">Body</option>
                  <option value="Body">Body</option>
                  <option value="Body">Body</option>
                  <option value="Body">Body</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
