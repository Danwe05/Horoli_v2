import { useState } from "react";
import { Link } from "react-router-dom";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import { CiSearch } from "react-icons/ci";

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css"; // flex
const types = ["buy", "rent", "Sell"];

function SearchBar() {
  const [query, setQuery] = useState({
    type: "buy",
    city: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const switchType = (val: any) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  const handleChange = (e: any) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
   
    <>
      {/* <div className="searchBar">
        <div className="type">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => switchType(type)}
              className={query.type === type ? "active" : ""}
            >
              {type}
            </button>
          ))}
        </div>
        <form>
          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
          />
          <input
            type="number"
            name="minPrice"
            min={0}
            max={10000000}
            placeholder="Min Price"
            onChange={handleChange}
          />
          <input
            type="number"
            name="maxPrice"
            min={0}
            max={10000000}
            placeholder="Max Price"
            onChange={handleChange}
          />
          <Link
            to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
          >
            <button>
              <img src="/search.png" alt="" />
            </button>
          </Link>
        </form>
      </div> */}
      <TabGroup className="border-red-100 table text-white mt-5">
        <TabList className="flex gap-0.5 justify-center items-center  overflow-hidden">
          {types.map((type) => (
            <Tab
              key={type}
              onClick={() => switchType(type)}
              className={
                query.type === type
                  ? "active data-[selected]:bg-white data-[selected]:text-blue-500 data-[selected]:text-blue-500 w-44 text-center text-base py-2 px-4 cursor-pointer "
                  : "data-[selected]:bg-white data-[selected]:text-blue-500  w-44 bg-blue-500 text-center text-base py-2 px-4 cursor-pointer "
              }
            >
              {type}
            </Tab>
          ))}
        </TabList>
        <TabPanels className="border border-1 table bg-white px-3 py-3">
          <TabPanel>
            <form className="flex space-x-4 justify-center items-center">
              <div className="flex-1">
                <input
                  type="text"
                  id="price"
                  name="city"
                  placeholder="Enter a city, neighborhood, city, or ZIP code"
                  className="block w-56 bg-gray-300 text-gray-900 pl-3 pr-3 py-2.5 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={handleChange}
                />
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  id="price"
                  className="block w-56 bg-gray-300 text-gray-900 pl-3 pr-3 py-2.5 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  name="minPrice"
                  min={0}
                  max={10000000}
                  placeholder="Min Price"
                  onChange={handleChange}
                />
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  id="price"
                  className="block w-56 bg-gray-300 text-gray-900 pl-3 pr-3 py-2.5 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm "
                  name="maxPrice"
                  min={0}
                  max={10000000}
                  placeholder="Max Price"
                  onChange={handleChange}
                />
              </div>
              <div className="flex-1">
                <Link
                  to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
                >
                  <button
                    type="submit"
                    className="text-white flex justify-center items-center gap-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium text-sm px-5 py-2.5 text-center w-44"
                    role="none"
                  >
                    <div>
                      {" "}
                      <CiSearch />
                    </div>
                    <div> Search</div>
                  </button>
                </Link>
              </div>
            </form>
          </TabPanel>
          <TabPanel>
            <form className="flex space-x-4 justify-center items-center">
              <div className="flex-1">
                <input
                  type="text"
                  id="price"
                  name="city"
                  placeholder="Enter a city, neighborhood, city, or ZIP code"
                  className="block w-56 bg-gray-300 text-gray-900 pl-3 pr-3 py-2.5 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={handleChange}
                />
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  id="price"
                  className="block w-56 bg-gray-300 text-gray-900 pl-3 pr-3 py-2.5 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  name="minPrice"
                  min={0}
                  max={10000000}
                  placeholder="Min Price"
                  onChange={handleChange}
                />
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  id="price"
                  className="block w-56 bg-gray-300 text-gray-900 pl-3 pr-3 py-2.5 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm "
                  name="maxPrice"
                  min={0}
                  max={10000000}
                  placeholder="Max Price"
                  onChange={handleChange}
                />
              </div>
              <div className="flex-1">
                <Link
                  to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
                >
                  <button
                    type="submit"
                    className="text-white flex justify-center items-center gap-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium text-sm px-5 py-2.5 text-center w-44"
                    role="none"
                  >
                    <div>
                      {" "}
                      <CiSearch />
                    </div>
                    <div> Search</div>
                  </button>
                </Link>
              </div>
            </form>
          </TabPanel>
          <TabPanel>
            <form className="flex space-x-4 justify-center items-center">
              <div className="flex-1">
                <input
                  type="text"
                  id="price"
                  name="city"
                  placeholder="Enter a city, neighborhood, city, or ZIP code"
                  className="block w-56 bg-gray-300 text-gray-900 pl-3 pr-3 py-2.5 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={handleChange}
                />
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  id="price"
                  className="block w-56 bg-gray-300 text-gray-900 pl-3 pr-3 py-2.5 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  name="minPrice"
                  min={0}
                  max={10000000}
                  placeholder="Min Price"
                  onChange={handleChange}
                />
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  id="price"
                  className="block w-56 bg-gray-300 text-gray-900 pl-3 pr-3 py-2.5 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm "
                  name="maxPrice"
                  min={0}
                  max={10000000}
                  placeholder="Max Price"
                  onChange={handleChange}
                />
              </div>
              <div className="flex-1">
                <Link
                  to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
                >
                  <button
                    type="submit"
                    className="text-white flex justify-center items-center gap-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium text-sm px-5 py-2.5 text-center w-44"
                    role="none"
                  >
                    <div>
                      {" "}
                      <CiSearch />
                    </div>
                    <div> Search</div>
                  </button>
                </Link>
              </div>
            </form>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </>
  );
}

export default SearchBar;
