/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "@/Layout";
import { gsap } from "gsap";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import { BsSortDownAlt } from "react-icons/bs";
import Image from "next/image";
import { useRouter } from "next/router";
import DemonCards from "@/components/DemonCards";

export default function Demons() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 100;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/ids-demons.json");
        // const res = await fetch("/devs.json");

        const jsonData = await response.json();
        // const jsonData2 = await res.json();

        // console.log(jsonData);
        setData(jsonData);
        // setData2(jsonData2);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // console.log(data);

  // data?.sort((a, b) => {
  //   const numA = parseInt(a.name.match(/\d+/)?.[0] || 0); // Extracting numeric value from name
  //   const numB = parseInt(b.name.match(/\d+/)?.[0] || 0);
  //   return numA - numB; // Sorting based on numeric value
  // });

  // console.log(data);

  const renderData = () => {
    // const dataToRender = toggle ? toggleData : test;
  const filteredData = data?.filter((d) => {
    const nameMatch =
      searchTerm === "" ||
      d.name.toLowerCase().includes(searchTerm.toLowerCase());
    return nameMatch;
  });


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    if (currentData && currentData.length > 0) {
      // setItemsAtTime(currentData)
      return currentData.map((d) => <DemonCards key={d.name} info={d} />);
    } else {
      return (
        <div className="text-center mt-20 text-xl">
          {currentData.length === 0 ? (
            "No results found."
          ) : (
            <div className="animate-pulse">Loading...</div>
          )}
        </div>
      );
    }
  };

  useEffect(() => {
    renderData();
  }, []);

  const renderPaginationButtons = () => {
    const totalPages = Math.ceil(data?.length / itemsPerPage);
    const buttons = [];

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`${
            currentPage === i ? "bg-[#fff] text-black" : "bg-[#000] text-white"
          } border p-4 w-5 h-5  justify-center items-center flex rounded-md`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  useEffect(() => {
    // Scroll to the top of the page when the page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    const reveal = gsap.fromTo(
      "input, h2, .filter, .logo",
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
    <Layout title="d9monz">
      <div className="container mx-auto ">
        <section>
          <div className="demon-logo bg-blue00 flex justify-center w-full md:pt-7 px-3  ">
            <h1 className=" text-6xl ">d9monz</h1>
          </div>
          <div className="flex flex-col justify-center mt-3 items-center px-4 ">
            <h2 className="text-xl text-center mt-0 mb-5">Search by number</h2>
            <div className="w-full relative flex space-x-2">
              <input
                type="text"
                placeholder="Type Number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute top-3 right-3 text-gray-700 ">
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
                {/* <div className="flex items-center justify-between mt-14 mb-2 px-3">
                  <div className="arr"> &larr; </div>
                  <div> &rarr; </div>
                </div> */}
                <div className="flex  md:justify-center mt-10 items-center px-3 space-x-5 overflow-x-scroll pb-4 hide-scroll">
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
      </div>
    </Layout>
  );
}
