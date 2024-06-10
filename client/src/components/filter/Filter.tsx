import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./filter.scss";

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    property: searchParams.get("property") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    bedroom: searchParams.get("bedroom") || "",
    area: searchParams.get("area") || "",
    parking: searchParams.get("parking") || "",
  });

  const [minPrice, setMinPrice] = useState(query.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(query.maxPrice || "");
  const [advancedFilter, setAdvancedFilter] = useState({
    area: query.area || "",
    parking: query.parking || "",
  });

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "minPrice") {
      setMinPrice(e.target.value);
    } else if (e.target.name === "maxPrice") {
      setMaxPrice(e.target.value);
    }
  };

  const handleAdvancedFilterChange = (e) => {
    setAdvancedFilter({
      ...advancedFilter,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = () => {
    if (minPrice && isNaN(minPrice)) {
      alert("Please enter a valid minimum price.");
      return;
    }

    if (maxPrice && isNaN(maxPrice)) {
      alert("Please enter a valid maximum price.");
      return;
    }

    if (minPrice && maxPrice && parseInt(minPrice) > parseInt(maxPrice)) {
      alert("The minimum price cannot be greater than the maximum price.");
      return;
    }

    setQuery({
      ...query,
      minPrice,
      maxPrice,
      ...advancedFilter,
    });

    setSearchParams(query);
  };

  return (
    <div className="filter mb-10 bg-white z-[9999] ">
      {searchParams.get("city") && (
        <h1>
          Search results for <b>{searchParams.get("city")}</b>
        </h1>
      )}
      <div className="top">
        <div className="item">
          <label htmlFor="city">Location</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City Location"
            onChange={handleChange}
            defaultValue={query.city}
          />
        </div>
      </div>
      <div className="bottom flex-nowrap justify-center items-center">
        <div className="item">
          <label htmlFor="type">Type</label>
          <select
            name="type"
            id="type"
            onChange={handleChange}
            defaultValue={query.type}
          >
            <option value="">any</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="property">Property</label>
          <select
            name="property"
            id="property"
            onChange={handleChange}
            defaultValue={query.property}
          >
            <option value="">any</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="land">Land</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="minPrice">Min Price</label>
          <input
            type="text"
            id="minPrice"
            name="minPrice"
            placeholder="Min Price"
            onChange={handleChange}
            defaultValue={query.minPrice}
          />
        </div>
        <div className="item">
          <label htmlFor="maxPrice">Max Price</label>
          <input
            type="text"
            id="maxPrice"
            name="maxPrice"
            placeholder="Max Price"
            onChange={handleChange}
            defaultValue={query.maxPrice}
          />
        </div>
        <div className="item advanced-filter mt-3">
          <button
            onClick={() => setAdvancedFilter(!advancedFilter)}
            className="flex justify-center items-center gap-2 text-blue-500 bg-blue-100  font-medium text-sm px-5 py-2.5 text-center "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>
            <span>Advanced</span>
          </button>
        </div>
      </div>
      {advancedFilter && (
        <div className="advanced-options">
          <div className="item">
            <label htmlFor="area">Area (sqft)</label>
            <input
              type="text"
              id="area"
              name="area"
              placeholder="Min Area"
              onChange={handleAdvancedFilterChange}
              defaultValue={advancedFilter.area}
            />
          </div>
          <div className="item">
            <label htmlFor="parking">Parking</label>
            <select
              name="parking"
              id="parking"
              onChange={handleAdvancedFilterChange}
              defaultValue={advancedFilter.parking}
            >
              <option value="">any</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
      )}
      <button className=" text-blue-500 bg-blue-100  font-medium text-sm px-5 py-2.5 text-center " onClick={handleFilter}>
        Apply Filter
      </button>
    </div>
  );
}

export default Filter;
