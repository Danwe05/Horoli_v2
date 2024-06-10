import { useContext, useEffect } from "react";

import { AuthContext } from "../../context/AuthContext";
import Hero from "../../components/hero/Hero";

import "react-tabs/style/react-tabs.css";
import "tailwindcss/tailwind.css";

import apiRequest from "../../lib/apiRequest";
import Card from "../../components/card/Card";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

// import required modules
import {
  Autoplay,
  Navigation,
  Pagination,
  FreeMode,
  Thumbs,
} from "swiper/modules";
import Cities from "../../components/cities/Cities";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import { Route, Routes, useNavigate } from "react-router-dom";
import AgoraRTC, { AgoraRTCProvider, useRTCClient } from "agora-rtc-react";

import ImageGallery from "react-image-gallery";
// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";

import { AutoComplete } from "primereact/autocomplete";
import { CountryService } from "../../components/service/CountryService";

function HomePage() {
  const navigate = useNavigate();
  const agoraClient = useRTCClient(
    AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })
  ); // Initialize Agora Client

  const handleConnect = (channelName: string) => {
    navigate(`/via/${channelName}`); // on form submit, navigate to new route
  };

  const { currentUser }: any = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [mostVisitedPost, setMostVisitedPost] = useState(null);

  
  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await apiRequest.get("/posts", {
        params: {
          limit: 5,
        },
      });
      setPosts(data);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchMostVisitedPost = async () => {
      const { data } = await apiRequest.get("/posts/most-visited");
      setMostVisitedPost(data);
    };

    fetchMostVisitedPost();
  }, []);


  const [showMore, setShowMore] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState(null);

  const search = (event) => {
      // Timeout to emulate a network connection
      setTimeout(() => {
          let _filteredCountries;

          if (!event.query.trim().length) {
              _filteredCountries = [...countries];
          }
          else {
              _filteredCountries = countries.filter((country) => {
                  return country.name.toLowerCase().startsWith(event.query.toLowerCase());
              });
          }

          setFilteredCountries(_filteredCountries);
      }, 250);
  }

  useEffect(() => {
      CountryService.getCountries().then((data) => setCountries(data));
  }, []);
  return (
    <>
      <Hero />
      <Cities />
      
   
      <div className="container mx-auto p-4">
   
            <AutoComplete field="name" value={selectedCountry} suggestions={filteredCountries} completeMethod={search} onChange={(e) => setSelectedCountry(e.value)} />
      
      </div>
      <section className="px-20 py-9 bg-gray-100">
        <div className="container mx-auto">
          <div className="flex justify-between justify-center pt-10 items-center">
            <div>
              <h5 className="text-[rgb(17, 17, 22)] font-[900] text-[20px]  ">
                Homes For You in Aurora, CO
              </h5>
              <span className="text-[rgb(83, 83, 100)] font-[400] text-[14px]">
                Based on homes you recently viewed
              </span>
            </div>
            <div className="flex items-center">
              <button
                id="prev2"
                aria-label="slide backward"
                className="swiper-button-prev2 hover:bg-blue-400 hover:text-white hover:transition-all nextArrowBtn focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer"
              >
                <MdKeyboardArrowLeft />
              </button>
              <button
                id="next2"
                aria-label="slide forward"
                className="swiper-button-next2 hover:bg-blue-400 hover:text-white hover:transition-all prevArrowBtn focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer"
              >
                <MdKeyboardArrowRight />
              </button>
            </div>
          </div>
          <Swiper
            slidesPerView={1}
            spaceBetween={1}
            pagination={{
              clickable: true,
            }}
            navigation={
              (true,
              {
                nextEl: ".swiper-button-next2",
                prevEl: ".swiper-button-prev2",
              })
            }
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }}
            modules={[Navigation, Pagination]}
            className="mySwiper"
          >
            {posts.map((post) => (
              <SwiperSlide className="border-1 border-yellow-800">
                <Card key={post.id} item={post} />
              </SwiperSlide>
            ))}

            <SwiperSlide className="border-1 border-yellow-800">
              <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <div className="px-6 py-4">
                  <h2 className="text-2xl font-semibold text-gray-800 pb-5">
                    View All
                  </h2>
                  <p className="text-gray-500">
                    See all the Rentals Houses in one place
                  </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <a
                    href="#"
                    className="block w-full p-2 text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                  >
                    View All
                  </a>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
      <section className="px-20 py-9 bg-gray-100">
        <div className="container mx-auto">
          <h2>Most Visited Post</h2>
          {mostVisitedPost && <Card item={mostVisitedPost} />}
        </div>
      </section>
      {/* <Routes>
        <Route
          path="/"
          element={<ConnectForm connectToVideo={handleConnect} />}
        />
        <Route
          path="/via/:channelName"
          element={
            <AgoraRTCProvider client={agoraClient}>
              <LiveVideo />
            </AgoraRTCProvider>
          }
        />
      </Routes> */}
      <style>
        {`


.swiper-button-next2 {
position: relative;
}
.swiper-button-prev2 {
position: relative;
margin-right: 10px;
}
.swiper-button-prev2::after, .swiper-button-next2::after{
content: " ";
}
.swiper-button-prev2, .swiper-button-next2 {
width: auto;
height: auto;
}
.swiper-button-next2.swiper-button-disabled1, .swiper-button-prev2.swiper-button-disabled1 {
opacity:1
}	
`}
      </style>
    </>
  );
}

export default HomePage;
