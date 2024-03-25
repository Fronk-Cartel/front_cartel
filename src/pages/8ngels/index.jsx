/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "@/Layout";
import { gsap } from "gsap";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import { BsSortDownAlt, BsSortUpAlt } from "react-icons/bs";
import Image from "next/image";
import { useRouter } from "next/router";
import DemonCards from "@/components/DemonCards";
import AngelCards from "@/components/AngelCards";

export default function Angels() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [toggle, setToggle] = useState(false);
  const itemsPerPage = 100;

  const toggleSortData = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/angels_new.json");
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

  const toggleData = [...data];

  toggleData.sort((a, b) => {
    // Compare indices of elements
    return data.indexOf(b) - data.indexOf(a);
  });

  const renderData = () => {
    const dataToRender = toggle ? toggleData : data;
    const filteredData = dataToRender?.filter((d) => {
      const nameMatch =
        searchTerm === "" ||
        d.meta.name.toLowerCase().includes(searchTerm.toLowerCase());

      // const inscription =
      //   searchTerm === "" || d.inscription_number.includes(searchTerm);
      return nameMatch;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    if (currentData && currentData.length > 0) {
      // setItemsAtTime(currentData)
      return currentData.map((d) => <AngelCards key={d.id} info={d} />);
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
            currentPage === i ? "bg-black text-white" : "bg-white text-black"
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
    <Layout title="8ngels">
      <div className="container mx-auto text-black ">
        <section>
          <div className="angel-logo bg-blue00 flex justify-center w-full md:pt-7 px-3  ">
            <h1 className=" text-6xl ">8ngels</h1>
          </div>
          <div className="flex flex-col justify-center mt-3 items-center px-4 ">
            <h2 className="text-xl text-center mt-0 mb-5">Search</h2>
            <div className="w-full relative flex space-x-2">
              <input
                type="text"
                placeholder="Type Name or Number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute top-3 right-16 text-gray-700 ">
                <AiOutlineSearch size={28} />
              </div>
              <div
                onClick={toggleSortData}
                className="filter shadow-md cursor-pointer flex justify-center items-center h-12 rounded-md bg-white text-black w-12"
              >
                {toggle ? (
                  <BsSortUpAlt size={24} />
                ) : (
                  <BsSortDownAlt size={24} />
                )}
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
