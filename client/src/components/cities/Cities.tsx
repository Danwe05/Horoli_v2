import { IoBedOutline } from "react-icons/io5";
import { TbBath } from "react-icons/tb";
import { HiArrowsPointingOut } from "react-icons/hi2";
import { CiHeart } from "react-icons/ci";
import { MdCompareArrows } from "react-icons/md";
import { BsCamera } from "react-icons/bs";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { GoArrowRight } from "react-icons/go";
const Cities = () => {
  return (
    <>
       <section className="px-20 py-9 bg-gray-100">
        <div className="container mx-auto">
          <div className="flex justify-between justify-center pt-10 items-center">
            <div>
              <h5 className="text-[rgb(17, 17, 22)] font-[900] text-[20px]  ">
                Properties By Cities
              </h5>
              <span className="text-blue-400 font-[400] text-[14px]">
                Explore Cities
              </span>
            </div>
            <div className="flex items-center gap-2 border-b-2 pb-2 border-blue-500">
              <a href="">View All Properties</a>
              <GoArrowRight className="text-blue-500 font-bold" />
            </div>
          </div>
          <div className="grid grid-cols-3 mt-10 gap-0 lg:gap-2">
            {" "}
            <div className="flex gap-4 border-1 items-center bg-[#f7f7f7] rounded-[8px] overflow-hidden ">
              <div className="w-[230px] h-[150px] border-1 ">
                <img
                  className="w-full h-full"
                  src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-2 pr-10 pl-0">
                <div>
                  <h6 className="text-[24px] font-[600] ">
                    <a href="#" class="link">
                      Yaoundé
                    </a>
                  </h6>
                </div>
                <div className="mt-[4px] text-[16px] ">
                  <p>263 properties</p>
                </div>
                <div>
                  <a
                    href="#"
                    className="flex gap-2 items-center hover:text-blue-500 hover:transition-all transition-all text-[13px] "
                  >
                    <span className="text">Explore Now</span> <GoArrowRight />
                  </a>
                </div>
              </div>
            </div>
            <div className="flex gap-4 border-1 items-center bg-blue-500 rounded-[8px] overflow-hidden ">
              <div className="w-[230px] h-[150px] border-1 ">
                <img
                  className="w-full h-full"
                  src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-2 pr-10 pl-0 text-white">
                <div>
                  <h6 className="text-[24px] font-[600] ">
                    <a href="#">Yaoundé</a>
                  </h6>
                </div>
                <div className="mt-[4px] text-[16px] ">
                  <p>263 properties</p>
                </div>
                <div>
                  <a
                    href="#"
                    className="flex gap-2 items-center hover:text-blue-500 hover:transition-all transition-all text-[13px] "
                  >
                    <span className="text">Explore Now</span> <GoArrowRight />
                  </a>
                </div>
              </div>
            </div>
            <div className="flex gap-4 border-1 items-center bg-[#f7f7f7] rounded-[8px] overflow-hidden ">
              <div className="w-[230px] h-[150px] border-1 ">
                <img
                  className="w-full h-full"
                  src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-2 pr-10 pl-0">
                <div>
                  <h6 className="text-[24px] font-[600] ">
                    <a href="#" class="link">
                      Yaoundé
                    </a>
                  </h6>
                </div>
                <div className="mt-[4px] text-[16px] ">
                  <p>263 properties</p>
                </div>
                <div>
                  <a
                    href="#"
                    className="flex gap-2 items-center hover:text-blue-500 hover:transition-all transition-all text-[13px] "
                  >
                    <span className="text">Explore Now</span> <GoArrowRight />
                  </a>
                </div>
              </div>
            </div>
            <div className="flex gap-4 border-1 items-center bg-[#f7f7f7] rounded-[8px] overflow-hidden ">
              <div className="w-[230px] h-[150px] border-1 ">
                <img
                  className="w-full h-full"
                  src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-2 pr-10 pl-0">
                <div>
                  <h6 className="text-[24px] font-[600] ">
                    <a href="#" class="link">
                      Yaoundé
                    </a>
                  </h6>
                </div>
                <div className="mt-[4px] text-[16px] ">
                  <p>263 properties</p>
                </div>
                <div>
                  <a
                    href="#"
                    className="flex gap-2 items-center hover:text-blue-500 hover:transition-all transition-all text-[13px] "
                  >
                    <span className="text">Explore Now</span> <GoArrowRight />
                  </a>
                </div>
              </div>
            </div>
            <div className="flex gap-4 border-1 items-center bg-[#f7f7f7] rounded-[8px] overflow-hidden ">
              <div className="w-[230px] h-[150px] border-1 ">
                <img
                  className="w-full h-full"
                  src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-2 pr-10 pl-0">
                <div>
                  <h6 className="text-[24px] font-[600] ">
                    <a href="#" class="link">
                      Yaoundé
                    </a>
                  </h6>
                </div>
                <div className="mt-[4px] text-[16px] ">
                  <p>263 properties</p>
                </div>
                <div>
                  <a
                    href="#"
                    className="flex gap-2 items-center hover:text-blue-500 hover:transition-all transition-all text-[13px] "
                  >
                    <span className="text">Explore Now</span> <GoArrowRight />
                  </a>
                </div>
              </div>
            </div>
            <div className="flex gap-4 border-1 items-center bg-[#f7f7f7] rounded-[8px] overflow-hidden ">
              <div className="w-[230px] h-[150px] border-1 ">
                <img
                  className="w-full h-full"
                  src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-2 pr-10 pl-0">
                <div>
                  <h6 className="text-[24px] font-[600] ">
                    <a href="#" class="link">
                      Yaoundé
                    </a>
                  </h6>
                </div>
                <div className="mt-[4px] text-[16px] ">
                  <p>263 properties</p>
                </div>
                <div>
                  <a
                    href="#"
                    className="flex gap-2 items-center hover:text-blue-500 hover:transition-all transition-all text-[13px] "
                  >
                    <span className="text">Explore Now</span> <GoArrowRight />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Cities