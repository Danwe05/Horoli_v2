import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import apiRequest from "../../lib/apiRequest";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import { Suspense, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "tailwindcss/tailwind.css";

function ProfilePage() {
  const data = useLoaderData();

  const { updateUser, currentUser }: any = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <section className="container mx-auto">
        <Tabs
          className="flex flex-col md:flex-row mt-10"
          id="controlled-tabs"
          selectedTabClassName="bg-blue-500 text-white"
        >
          <TabList className="flex flex-col md:w-64 md:border-r md:border-gray-200">
            <Tab className="mb-2 md:mb-0 md:py-2 md:px-4 cursor-pointer">
              Account
            </Tab>
            <Tab className="mb-2 md:mb-0 md:py-2 md:px-4 cursor-pointer">
              Chat
            </Tab>
            <Tab className="mb-2 md:mb-0 md:py-2 md:px-4 cursor-pointer">
              My Lising
            </Tab>
          </TabList>

          <TabPanel>
            <div className="w-full pl-10 pb-10">
              <div className="flex flex-col gap-5">
                <div>
                  <h1 className="text-black font-[600] text-[1.5rem] ">
                    Account
                  </h1>
                  <p className="text-black font-[400] text-[1rem] ">
                    Manage your account information
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="text-[1rem] font-[500] pb-1 border-b-[1px] ">
                    <p>Profile</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div>
                      <img
                        src={currentUser.avatar || "https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg?size=338&ext=jpg&ga=GA1.1.1518270500.1717632000&semt=ais_user"}
                        alt="Profile Picture"
                        className="w-[3.125rem] h-[3.125rem] rounded-full"
                      />
                    </div>
                    <div className="text-[0.8rem] font-[600] capitalize ">
                      {currentUser.username}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="text-[1rem] font-[500] pb-1 border-b-[1px] ">
                    <p>Email Address</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="text-[0.8rem] font-[600] ">
                      {currentUser.email}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="text-[1rem] font-[500] pb-1 border-b-[1px] ">
                    <p>Security</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <input
                      type="password"
                      id="price"
                      name="city"
                      placeholder="Current password"
                      className="block w-96 bg-gray-300 text-gray-900 pl-3 pr-3 py-2.5 border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    <input
                      type="password"
                      id="price"
                      name="city"
                      placeholder="New password"
                      className="block w-96 bg-gray-300 text-gray-900 pl-3 pr-3 py-2.5 border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    <input
                      type="password"
                      id="price"
                      name="city"
                      placeholder="Confirm password"
                      className="block w-96 bg-gray-300 text-gray-900 pl-3 pr-3 py-2.5 border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <Link
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2 w-full"
                    to="/profile/update"
                  >
                    <button>Update Profile</button>
                  </Link>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="profilePage">
              <div className="details">
                <div className="wrapper"></div>
              </div>
              <div className="chatContainer w-[500px] ">
                <div className="wrapper">
                  <Suspense fallback={<p>Loading...</p>}>
                    <Await
                      resolve={data.chatResponse}
                      errorElement={<p>Error loading chats!</p>}
                    >
                      {(chatResponse) => <Chat chats={chatResponse.data} />}
                    </Await>
                  </Suspense>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="profilePage">
              <div className="details">
                <div className="wrapper">
                  <div className="title">
                    <h1 className="!text-[1.5rem] !font-[700] pb-1 ">
                      My List
                    </h1>
                    <Link to="/add">
                      <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2 w-full">
                        Create New Post
                      </button>
                    </Link>
                  </div>
                  <Suspense fallback={<p>Loading...</p>}>
                    <Await
                      resolve={data.postResponse}
                      errorElement={<p>Error loading posts!</p>}
                    >
                      {(postResponse) => (
                        <List posts={postResponse.data.userPosts} />
                      )}
                    </Await>
                  </Suspense>
                  <div className="title">
                    <h1 className="!text-[1.5rem] !font-[700] pb-1 ">
                      Saved List
                    </h1>
                  </div>
                  <Suspense fallback={<p>Loading...</p>}>
                    <Await
                      resolve={data.postResponse}
                      errorElement={<p>Error loading posts!</p>}
                    >
                      {(postResponse) => (
                        <List posts={postResponse.data.savedPosts} />
                      )}
                    </Await>
                  </Suspense>
                </div>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </section>
    </>
  );
}

export default ProfilePage;
