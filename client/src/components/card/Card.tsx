import { Link } from "react-router-dom";
import "./card.scss";
import { CiHeart } from "react-icons/ci";
import { MdCompareArrows } from "react-icons/md";
import { BsCamera } from "react-icons/bs";
import { HiArrowsPointingOut } from "react-icons/hi2";
import { TbBath } from "react-icons/tb";
import { IoBedOutline } from "react-icons/io5";
import { PiMapPinLight } from "react-icons/pi";

import Btn from "../button/Btn";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';
function Card({ item }: any) {
  return (
    <>
      <Link to={`/${item.id}`}>
        <div className="border-1 shadow-2xl bg-white">
          <div className="w-full relative">
            <div
              className="hero relative bg-cover 
      font-[Poppins] md:bg-top bg-center h-[240px] "
            >
              <img src={item.images[0]} alt="" className="w-full h-full" />
            </div>
            <div className="absolute top-0 z-30 text-white flex flex-col justify-between h-full w-full px-3 py-3 !pb-6">
              <div className="flex justify-between w-full">
                <div className="px-[15px] py-[7px] text-[14px] bg-green-500 ">
                  <span>For {item.type}</span>
                </div>
                <div className="flex gap-2">
                  <div className="px-[15px] py-[7px] text-[14px] bg-green-500 ">
                    Popular
                  </div>
                  <div className="px-[15px] py-[7px] text-[14px] bg-green-500 ">
                    Top
                  </div>
                </div>
              </div>

              <div className="flex justify-between w-full">
                <div className="text-[24px] font-[600] ">
                  <span>XAF </span>
                  {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  {item.type === "rent" ? (
                    <p className="text-blue-400 p-0 m-0 text-right text-sm">
                      / month
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex gap-2">
                  <div className="flex justify-center items-center w-[35px] h-[35px] rounded-[3px] text-[16px] bg-[#00000080] hover:bg-white hover:text-blue-500 cursor-pointer">
                    <CiHeart />
                  </div>
                  <div className="flex justify-center items-center w-[35px] h-[35px] rounded-[3px] text-[16px] bg-[#00000080] hover:bg-white hover:text-blue-500 cursor-pointer">
                    <MdCompareArrows />
                  </div>
                  <div className="flex justify-center items-center w-[35px] h-[35px] rounded-[3px] text-[16px] bg-[#00000080] hover:bg-white hover:text-blue-500 cursor-pointer">
                    <BsCamera />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute px-3">
            <span className="bg-white capitalize text-blue-500 p-1 relative -top-4 text-[14px] px-[12px] py-[8px] rounded-[3px] font-[400] ">
              {item.property}
            </span>
          </div>
          <div className="px-3 py-3 flex flex-col gap-3 w-full">
            <h3 className="text-[24px] font-[600] text-ellipsis overflow-hidden whitespace-nowrap max-w-[290px]">
              <a href="#">{item.title}</a>
            </h3>
            <ul className=" list-none flex items-center gap-1">
              <li>
                <PiMapPinLight />
              </li>
              <li>
                <p className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[280px]">
                  {item.city}, {item.address}
                </p>
              </li>
            </ul>
            <ul className=" list-none flex gap-3 items-center">
              <li className="flex items-center gap-1">
                <span className="bg-blue-100 text-blue-500 w-[32px] h-[32px] rounded-[50%] flex justify-center items-center ">
                  <IoBedOutline />
                </span>{" "}
                <span className="font-[500] text-[14px] ">
                  {+item.bedroom > 1 ? `${item.bedroom} Beds` : "1 Bed"}{" "}
                </span>
              </li>
              <li className="flex items-center gap-1">
                <span className="bg-blue-100 text-blue-500 w-[32px] h-[32px] rounded-[50%] flex justify-center items-center ">
                  <TbBath />
                </span>{" "}
                <span className="font-[500] text-[14px] ">
                  {+item.bathroom > 1 ? `${item.bathroom} Baths` : "1 Bath"}
                </span>
              </li>
              <li className="flex items-center gap-1">
                <span className="bg-blue-100 text-blue-500 w-[32px] h-[32px] rounded-[50%] flex justify-center items-center ">
                  <HiArrowsPointingOut />
                </span>{" "}
                <span className="font-[500] text-[14px] ">1500 Sqft </span>
              </li>
            </ul>
          </div>
          {/* ========== */}
          <div
            className="px-3 py-3 flex items-center justify-between"
            style={{
              borderWidth: "0px 0px thin",
              borderColor: "rgba(145, 158, 171, 0.2)",
              borderStyle: "dashed",
              borderTop: "1px dashed #e5e7eb",
            }}
          >
            <div className="flex gap-3 items-center">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1625417026759-69162d7ded55?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                  className="w-[36px] h-[36px] rounded-[50%] "
                />
              </div>
              <div>Daziy Millar </div>
            </div>
            <div>
              <Btn
                type="button"
                role="none"
              >
                Details
              </Btn>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default Card;
