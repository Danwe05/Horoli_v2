import { useEffect } from "react";
import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { useNavigate, useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

import Btn from "../../components/button/Btn";
import Card from "../../components/card/Card";
import { CiShoppingTag } from "react-icons/ci";
import { FiHome } from "react-icons/fi";
import { PiGarageLight } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { HiArrowsPointingOut } from "react-icons/hi2";
import { TbBath } from "react-icons/tb";
import { IoBedOutline } from "react-icons/io5";
import { PiMapPinLight } from "react-icons/pi";
import { MdSnowing } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { MdPhoneAndroid } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import { FiShare } from "react-icons/fi";
import { IoPrintOutline } from "react-icons/io5";
import { MdCompareArrows } from "react-icons/md";
// stars
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

import ImageGallery from "react-image-gallery";
// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import moment from "moment";

function SinglePage() {
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const { currentUser }: any = useContext(AuthContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [images, setImages] = useState([]); // Initialize an empty array for images
  const [comments, setComments] = useState({}); // Initialize an empty object for comments
  const [reviews, setReviews] = useState({}); // Initialize an empty object for reviews
  const [newComment, setNewComment] = useState(""); // Initialize an empty string for new comment
  const [newReview, setNewReview] = useState(""); // Initialize an empty string for new review
  const [rating, setRating] = useState(0); // Initialize a rating state
  const defaultReviews = [];

  const [relatedPosts, setRelatedPosts] = useState([]); // Initialize an empty array for related posts

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await apiRequest.get(`/posts/${post.id}/comments`); // Replace with your API endpoint
        setComments({ ...comments, [post.id]: data });
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, [post.id]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await apiRequest.get(`/posts/${post.id}/reviews`); // Replace with your API endpoint
        setReviews({ ...reviews, [post.id]: data });
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, [post.id]);

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
    }
    // AFTER REACT 19 UPDATE TO USEOPTIMISTIK HOOK
    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };

  const links = [
    { title: "Home", href: "/" },
    { title: "Buy", href: "/list" },
    { title: post.title, href: "" }, // current page title
  ];

  const headerElement1 = (
    <div className="flex justify-center items-center py-3 border-b-[1px] w-full gap-2">
      <span className="font-bold white-space-nowrap">Request to apply</span>
    </div>
  );
  const headerElement2 = (
    <div className="flex justify-center items-center py-3 border-b-[1px] w-full gap-2">
      <span className="font-bold white-space-nowrap">Request a tour</span>
    </div>
  );

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await apiRequest.get("/posts", {
        params: {
          limit: 3,
        },
      });
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const [click, setClick] = useState(false);
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiRequest.post(`/posts/${post.id}/comments`, { text: newComment });
      setComments({
        ...comments,
        [post.id]: [...comments[post.id], { text: newComment }],
      });
      setNewComment("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiRequest.post(`/posts/${post.id}/reviews`, {
        text: newReview,
        rating,
      });
      setReviews({
        ...reviews,
        [post.id]: [...reviews[post.id], { text: newReview, rating }],
      });
      setNewReview("");
      setRating(0);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        const { data } = await apiRequest.get(`/posts/${post.id}/related`); // Replace with your API endpoint
        setRelatedPosts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRelatedPosts();
  }, [post.id]);

  return (
    <>
      <Carousel
        axis="horizontal"
        className="h-[500px] grid grid-cols-[1fr_130px]  relative mt-10 "
      >
        {post.images.map((image, index) => (
          <div className="flex justify-center h-screen grid grid-cols-1 xl:grid-cols-2">
            <img
              key={index}
              src={image}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Carousel>
      <h2>Related Posts</h2>
      <ul>
        {relatedPosts.map((post) => (
          <li key={post.id}>
            <a href={`/posts/${post.id}`}>{post.title}</a>
          </li>
        ))}
      </ul>
      <div className="container mx-auto">
        <div className="flex justify-between items-center  px-10">
          <div>
            <Breadcrumb links={links} />
          </div>
          <div>
            <ul className="flex gap-2 justify-center items-center">
              <li>
                <span
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setShareLinkCopied(true);
                    setTimeout(() => {
                      setShareLinkCopied(false);
                    }, 2000);
                  }}
                  className="text-[20px] w-[50px] h-[50px] border-1 rounded-[4px] text-blue-500 flex items-center justify-center shadow-md hover:bg-blue-500 hover:text-white"
                >
                  <FiShare />{" "}
                </span>
                {shareLinkCopied && (
                  <p className="fixed top-[23%] right-[5%] font-semibold border-2 border-gray-400 rounded-md bg-white z-10 p-2">
                    Link Copied
                  </p>
                )}
              </li>
              <li>
                <a
                  href=""
                  className="text-[20px] w-[50px] h-[50px] border-1 rounded-[4px] text-blue-500 flex items-center justify-center shadow-md hover:bg-blue-500 hover:text-white"
                >
                  <CiHeart />{" "}
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="text-[20px] w-[50px] h-[50px] border-1 rounded-[4px] text-blue-500 flex items-center justify-center shadow-md hover:bg-blue-500 hover:text-white"
                >
                  <MdCompareArrows />
                </a>
              </li>
              <li>
                <button
                  onClick={() => window.print()}
                  className="text-[20px] w-[50px] h-[50px] border-1 rounded-[4px] text-blue-500 flex items-center justify-center shadow-md hover:bg-blue-500 hover:text-white"
                >
                  <IoPrintOutline />{" "}
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-[60px]" id="">
          <div className="grid grid-cols-[1fr_350px] gap-4 lg:gap-2 p-10">
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <div>
                  <div>
                    <span className="bg-blue-500 text-white capitalize font-[600] text-[12px] rounded-[4px] py-[4px] px-[8px] ">
                      {post.type}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-[36px] ">{post.title}</h4>
                    <ul className=" list-none flex items-center gap-1">
                      <li>
                        <PiMapPinLight />
                      </li>
                      <li>
                        <p className="text-ellipsis  overflow-hidden whitespace-nowrap font-[500] max-w-[280px]">
                          {post.city},{" "}
                          <span className="text-[#5c6368]">{post.address}</span>
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h4 className="text-[36px] font-[600] ">
                    {post.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    {post.type === "rent" ? (
                      <span className="text-[20px] text-[#5c6368] ">
                        /month
                      </span>
                    ) : (
                      ""
                    )}{" "}
                  </h4>
                </div>
              </div>
              <div className="pb-[1.5rem]" id="about">
                <div>
                  <h2 className="text-[20px] text-[#212121] mb-[1.5rem] mt-[1.5rem] ">
                    Overview
                  </h2>
                </div>
                <div>
                  <ul className="flex border-b-[1px]  w-full flex-wrap list-none">
                    <li className="relative mt-[10px] mb-[27px] w-[25%] flex ">
                      <div className="mr-[15px] ">
                        <span className="text-[20px] w-[50px] h-[50px] border-1 rounded-[4px] text-blue-500 flex items-center justify-center shadow-md hover:bg-blue-500 hover:text-white">
                          <CiShoppingTag />
                        </span>
                      </div>
                      <div className="amenities-content">
                        <h2 className="text-[14px] text-[#212121] mt-[2px] ">
                          ID No{" "}
                        </h2>
                        <span className="text-[#878c9f] text-[14px] ">
                          HH{post.id.substring(0, 5)}
                        </span>
                      </div>
                    </li>
                    <li className="relative mt-[10px] mb-[27px] w-[25%] flex ">
                      <div className="mr-[15px] ">
                        <span className="text-[20px] w-[50px] h-[50px] border-1 rounded-[4px] text-blue-500 flex items-center justify-center shadow-md hover:bg-blue-500 hover:text-white">
                          <FiHome />
                        </span>
                      </div>
                      <div className="amenities-content">
                        <h2 className="text-[14px] text-[#212121] mt-[2px]  rtcl-field-radio">
                          Type{" "}
                        </h2>
                        <span className="text-[#878c9f] text-[14px] capitalize ">
                          {post.property}
                        </span>
                      </div>
                    </li>
                    <li className="relative mt-[10px] mb-[27px] w-[25%] flex ">
                      <div className="mr-[15px] ">
                        <span className="text-[20px] w-[50px] h-[50px] border-1 rounded-[4px] text-blue-500 flex items-center justify-center shadow-md hover:bg-blue-500 hover:text-white">
                          <PiGarageLight />
                        </span>
                      </div>
                      <div className="amenities-content">
                        <h2 className="text-[14px] text-[#212121] mt-[2px]  rtcl-field-radio">
                          Parking{" "}
                        </h2>
                        <span className="text-[#878c9f] text-[14px] ">
                          Yes{" "}
                        </span>
                      </div>
                    </li>
                    <li className="relative mt-[10px] mb-[27px] w-[25%] flex ">
                      <div className="mr-[15px] ">
                        <span className="text-[20px] w-[50px] h-[50px] border-1 rounded-[4px] text-blue-500 flex items-center justify-center shadow-md hover:bg-blue-500 hover:text-white">
                          <IoBedOutline />
                        </span>
                      </div>
                      <div className="amenities-content">
                        <h2 className="text-[14px] text-[#212121] mt-[2px]  rtcl-field-select">
                          Bedroom{" "}
                        </h2>
                        <span className="text-[#878c9f] text-[14px] ">
                          {+post.bedroom > 1 ? `${post.bedroom} Beds` : "1 Bed"}{" "}
                        </span>
                      </div>
                    </li>
                    <li className="relative mt-[10px] mb-[27px] w-[25%] flex ">
                      <div className="mr-[15px] ">
                        <span className="text-[20px] w-[50px] h-[50px] border-1 rounded-[4px] text-blue-500 flex items-center justify-center shadow-md hover:bg-blue-500 hover:text-white">
                          <TbBath />
                        </span>
                      </div>
                      <div className="amenities-content">
                        <h2 className="text-[14px] text-[#212121] mt-[2px]  rtcl-field-select">
                          Bath{" "}
                        </h2>
                        <span className="text-[#878c9f] text-[14px] ">
                          {" "}
                          {+post.bathroom > 1
                            ? `${post.bathroom} Baths`
                            : "1 Bath"}{" "}
                        </span>
                      </div>
                    </li>
                    <li className="relative mt-[10px] mb-[27px] w-[25%] flex ">
                      <div className="mr-[15px] ">
                        <span className="text-[20px] w-[50px] h-[50px] border-1 rounded-[4px] text-blue-500 flex items-center justify-center shadow-md hover:bg-blue-500 hover:text-white">
                          <HiArrowsPointingOut />
                        </span>
                      </div>
                      <div className="amenities-content">
                        <h2 className="text-[14px] text-[#212121] mt-[2px]  rtcl-field-number">
                          Sqft{" "}
                        </h2>
                        <span className="text-[#878c9f] text-[14px] ">
                          {post.postDetail.size}
                        </span>
                      </div>
                    </li>
                    <li className="relative mt-[10px] mb-[27px] w-[25%] flex ">
                      <div className="mr-[15px] ">
                        <span className="text-[20px] w-[50px] h-[50px] border-1 rounded-[4px] text-blue-500 flex items-center justify-center shadow-md hover:bg-blue-500 hover:text-white">
                          <MdSnowing />
                        </span>
                      </div>
                      <div className="amenities-content">
                        <h2 className="text-[14px] text-[#212121] mt-[2px]  rtcl-field-radio">
                          Purpose{" "}
                        </h2>
                        <span className="text-[#878c9f] text-[14px] capitalize">
                          {post.type}
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="pb-[1.5rem]" id="testimonials">
                <div>
                  <h2 className="text-[20px] text-[#212121] mb-[1.5rem] capitalize">
                    Description about this listing
                  </h2>
                </div>
                <div
                  className="text-[#878c9f] text-[16px] leading-[1.5] "
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(post.postDetail.desc),
                  }}
                ></div>
              </div>
              <div className=" border-t-[1px] pb-[1.5rem] " id="demo">
                <div>
                  <h2 className="text-[20px] text-[#212121] mb-[1.5rem] mt-[1.5rem] capitalize">
                    Features & Amenities
                  </h2>
                </div>
                <div>
                  <ul className="flex w-full flex-wrap list-none text-[#6c757d] text-[14px] ">
                    {" "}
                    <li className="flex pt-[9px] pb-[9px] pl-[10px] w-[25%] relative pr-[10px] ">
                      <span className="flex w-full items-center gap-2">
                        <FaCircleCheck className=" text-[16px] text-blue-500 " />{" "}
                        TV Cable
                      </span>
                    </li>
                    <li className="flex pt-[9px] pb-[9px] pl-[10px] w-[25%] relative pr-[10px] ">
                      <span className="flex w-full items-center gap-2">
                        <FaCircleCheck className=" text-[16px] text-blue-500 " />{" "}
                        TV Cable
                      </span>
                    </li>
                    <li className="flex pt-[9px] pb-[9px] pl-[10px] w-[25%] relative pr-[10px] ">
                      <span className="flex w-full items-center gap-2">
                        <FaCircleCheck className=" text-[16px] text-blue-500 " />{" "}
                        TV Cable
                      </span>
                    </li>
                    <li className="flex pt-[9px] pb-[9px] pl-[10px] w-[25%] relative pr-[10px] ">
                      <span className="flex w-full items-center gap-2">
                        <FaCircleCheck className=" text-[16px] text-blue-500 " />{" "}
                        TV Cable
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="border-t-[1px] pb-[1.5rem]">
                <div>
                  <h2 className="text-[20px] text-[#212121] mb-[1.5rem] mt-[1.5rem] capitalize">
                    Map Location
                  </h2>
                </div>
                <div className="w-full h-[450px] flex">
                  <Map items={[post]} />
                </div>
              </div>
              <div className="border-t-[1px] pb-[1.5rem]">
                <div>
                  <h2 className="text-[20px] text-[#212121] mb-[1.5rem] mt-[1.5rem] capitalize">
                    What’s Nearby?
                  </h2>
                </div>
                <div>
                  <ul className="flex w-full flex-wrap list-none text-[#6c757d] text-[14px] ">
                    {" "}
                    <li className="flex pt-[9px] pb-[9px] pl-[10px] w-[25%] relative pr-[10px] ">
                      <span className="flex w-full items-center gap-2">
                        <span className="text-black font-[700] ">School:</span>{" "}
                        0.7 km
                      </span>
                    </li>
                    <li className="flex pt-[9px] pb-[9px] pl-[10px] w-[25%] relative pr-[10px] ">
                      <span className="flex w-full items-center gap-2">
                        <span className="text-black font-[700] ">
                          University:
                        </span>{" "}
                        1.2 km
                      </span>
                    </li>
                    <li className="flex pt-[9px] pb-[9px] pl-[10px] w-[25%] relative pr-[10px] ">
                      <span className="flex w-full items-center gap-2">
                        <span className="text-black font-[700] ">
                          Restaurant:
                        </span>{" "}
                        2.5 km
                      </span>
                    </li>
                    <li className="flex pt-[9px] pb-[9px] pl-[10px] w-[25%] relative pr-[10px] ">
                      <span className="flex w-full items-center gap-2">
                        <FaCircleCheck className=" text-[16px] text-blue-500 " />{" "}
                        TV Cable
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="border-t-[1px] py-[1.5rem]">
                <h2 className="text-2xl font-bold mb-4">
                  Comments and Reviews
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (rating > 0) {
                      handleReviewSubmit(e);
                    } else {
                      handleCommentSubmit(e);
                    }
                  }}
                >
                  <input
                    type="text"
                    value={newComment || newReview}
                    onChange={(e) => {
                      setNewComment(e.target.value);
                      setNewReview(e.target.value);
                    }}
                    placeholder="Add a comment or review"
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                  />
                  <div className="flex justify-between mb-2">
                    <span>Rating:</span>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setRating(i)}
                        className={`bg-${
                          i <= rating ? "yellow" : "gray"
                        }-500 hover:bg-${
                          i <= rating ? "yellow" : "gray"
                        }-700 text-white font-bold py-2 px-4 rounded`}
                      >
                        <CiStar />
                      </button>
                    ))}
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Add Comment or Review
                  </button>
                </form>
                <ul className="list-none">
                  {Array.isArray(reviews[post.id]) &&
                  reviews[post.id].length > 0 ? (
                    reviews[post.id].map((review) => (
                      <li key={review.id} className="mb-2">
                        <div className="flex w-full gap-2">
                          <div className="w-[12%] ">
                            <img
                              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                              alt=""
                              className="w-[60px] h-[60px] rounded-[50%] "
                            />
                          </div>
                          <div className="border-b-[1px] pb-[28px] mb-[28px] w-full">
                            {review.username ? (
                              <div className="name h-7 font-[700] text-black">
                                {review.username}
                              </div>
                            ) : (
                              <div className="name h-7 font-[700] text-black">
                                Anonymous
                              </div>
                            )}
                            <div className="text-[#a3abb0] mt-[4px] ">
                              {moment(review.createdAt).format("MMMM Do, YYYY")}{" "}
                              at {moment(review.createdAt).format("h:mm a")}
                            </div>
                            <p>{review.text}</p>
                            <ul className="text-yellow-500 flex gap-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <li key={i}>
                                  <FaStar />
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li>No reviews yet</li>
                  )}
                </ul>
              </div>
            </div>
            <div className="border-1 bg-[#f7f7f7] top-20 sticky shadow-sm flex flex-col px-3 py-3 h-[max-content] ">
              <div>
                <h2 className="text-[20px] text-[#212121] mb-[1.5rem] capitalize  ">
                  Contact {post.user.username}
                </h2>
              </div>
              <div className="card flex justify-content-center"></div>
              <div className="flex flex-col justify-center items-center gap-1">
                <Button
                  label="Request to apply"
                  className="text-blue-500 w-full bg-blue-100  font-medium text-sm px-5 py-3 text-center me-2 mb-2 "
                  onClick={() => setVisible1(true)}
                />
                <Dialog
                  header={headerElement1}
                  visible={visible1}
                  modal={false}
                  style={{ width: "50vw" }}
                  breakpoints={{ "960px": "75vw", "641px": "100vw" }}
                  onHide={() => {
                    if (!visible1) return;
                    setVisible1(false);
                  }}
                >
                  <form className="max-w-md mx-auto p-4 pt-6 pb-8 mb-4 bg-white rounded">
                    <div className="mb-4">
                      <label
                        htmlFor="rtcl-contact-name"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="rtcl-contact-name"
                        placeholder="Name *"
                        required
                        className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="rtcl-contact-email"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="rtcl-contact-email"
                        placeholder="Email *"
                        required
                        className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="rtcl-contact-phone"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Phone *
                      </label>
                      <input
                        type="text"
                        name="phone"
                        id="rtcl-contact-phone"
                        placeholder="Phone *"
                        required
                        className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="rtcl-contact-message"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Message *
                      </label>
                      <textarea
                        name="message"
                        id="rtcl-contact-message"
                        rows="5"
                        cols="20"
                        placeholder="Message *"
                        required
                        value="I'm interested in your property and would like to move forward. Can you send me an application for this property?"
                        className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      ></textarea>
                    </div>

                    <div id="rtcl-contact-g-recaptcha"></div>
                    <p id="rtcl-contact-message-display"></p>
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
                </Dialog>
                <div className="flex justify-center items-center">Or</div>
                <div className="w-full mt-3">
                  <Button
                    label="Request a tour"
                    className="text-white w-full bg-blue-500  font-medium text-sm px-5 py-3 text-center me-2 mb-2 "
                    onClick={() => setVisible2(true)}
                  />
                  <Dialog
                    header={headerElement2}
                    visible={visible2}
                    modal={false}
                    style={{ width: "50vw" }}
                    breakpoints={{ "960px": "75vw", "641px": "100vw" }}
                    onHide={() => {
                      if (!visible2) return;
                      setVisible2(false);
                    }}
                  >
                    <form
                      id="rtcl-contact-form"
                      novalidate="novalidate"
                      className="max-w-md mx-auto p-4 pt-6 pb-8 mb-4 bg-white rounded"
                    >
                      <div className="mb-4">
                        <label
                          htmlFor="rtcl-contact-name"
                          className="block text-gray-700 text-sm font-bold mb-2"
                        >
                          Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="rtcl-contact-name"
                          placeholder="Name *"
                          required
                          className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="rtcl-contact-email"
                          className="block text-gray-700 text-sm font-bold mb-2"
                        >
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="rtcl-contact-email"
                          placeholder="Email *"
                          required
                          className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="rtcl-contact-phone"
                          className="block text-gray-700 text-sm font-bold mb-2"
                        >
                          Phone *
                        </label>
                        <input
                          type="text"
                          name="phone"
                          id="rtcl-contact-phone"
                          placeholder="Phone *"
                          required
                          className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="rtcl-contact-message"
                          className="block text-gray-700 text-sm font-bold mb-2"
                        >
                          Message *
                        </label>
                        <textarea
                          name="message"
                          id="rtcl-contact-message"
                          rows="5"
                          cols="20"
                          placeholder="Message *"
                          required
                          className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        ></textarea>
                      </div>

                      <div id="rtcl-contact-g-recaptcha"></div>
                      <p id="rtcl-contact-message-display"></p>
                      <div className="flex justify-center">
                        <button
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Send Message
                        </button>
                      </div>
                    </form>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
          <div className="p-10">
            <div class="flex justify-between justify-center pt-10 items-center">
              <div>
                <h5 class="text-[rgb(17, 17, 22)] font-[900] text-[20px]  ">
                  Related Properties
                </h5>
                <span class="text-blue-400 font-[400] text-[14px]">
                  SIMILAR PROPERTIES
                </span>
              </div>
              <div class="flex items-center gap-2 border-b-2 pb-2 border-blue-500">
                <a href="">View All Properties</a>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 24 24"
                  class="text-blue-500 font-bold"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M13.22 19.03a.75.75 0 0 1 0-1.06L18.19 13H3.75a.75.75 0 0 1 0-1.5h14.44l-4.97-4.97a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215l6.25 6.25a.75.75 0 0 1 0 1.06l-6.25 6.25a.75.75 0 0 1-1.06 0Z"></path>
                </svg>
              </div>
            </div>
            {/* <div className="flex flex-wrap gap-4 mt-10">
              {posts.map((post) => (
                <Card key={post.id} post={post} />
              ))}
            </div> */}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus et
            cupiditate quo aperiam id quae fuga expedita, possimus quod placeat
            magni maiores facere inventore nisi! Totam repellat veritatis nemo
            ut. Alias, doloribus consequuntur. Officiis dolor quibusdam sit ea
            corrupti cumque totam rerum recusandae vero! Labore magni, soluta
            illum sapiente quis perspiciatis inventore. Deserunt illo explicabo
            labore deleniti, a natus facilis! Voluptate nulla provident
            assumenda aliquid eius laboriosam eligendi, laudantium veniam quas
            aspernatur libero ex omnis tempora, voluptates atque, fugit at. Illo
            expedita quae repudiandae vero! Quasi sint facere non ea? Eius cum,
            dolor hic recusandae sequi culpa laboriosam distinctio numquam
            laborum dicta tenetur veritatis corrupti? Libero, vel ratione ad
            perspiciatis vero aliquid accusantium, dicta quisquam perferendis,
            unde possimus labore earum. Impedit voluptatum magni obcaecati
            voluptate aperiam, tempore laboriosam recusandae sint sequi? Odio
            exercitationem nam aut? Eaque asperiores architecto repellendus
            velit doloremque laborum voluptatibus, veritatis incidunt a.
            Inventore incidunt adipisci provident! Inventore, aliquam
            praesentium, quas sapiente soluta molestiae accusantium, saepe amet
            animi eligendi molestias ratione nostrum officiis quidem tenetur
            dicta? Exercitationem quisquam temporibus ullam necessitatibus
            accusamus modi repudiandae nam perferendis ipsa? Maiores rem, quo
            pariatur vero velit alias. Amet sit vitae veniam earum veritatis
            sunt ratione aperiam quod laboriosam repudiandae? Quam natus
            delectus vel dolores unde odio voluptate nulla tempora eveniet.
            Omnis, distinctio rem. Sapiente similique culpa autem repellendus
            aspernatur deleniti debitis, odio perspiciatis minus laborum, quo
            pariatur aliquid voluptate iure molestias ea in quis totam vero
            ipsam error! Quaerat, eos? Officiis ipsum harum, ex esse hic non
            odio doloribus voluptate totam quae. Tempore placeat ut, illum magni
            fuga consectetur reiciendis ipsam consequuntur obcaecati inventore,
            eligendi et sed quidem culpa velit. Numquam quae voluptate aut, quis
            ducimus quasi magni beatae et, cupiditate dolor minima. Iste ducimus
            nostrum eos, consequuntur, delectus ut iure eveniet nemo, accusamus
            tempore neque esse dolor nam velit.
          </div>
        </div>
      </div>
    </>
  );
}

export default SinglePage;
