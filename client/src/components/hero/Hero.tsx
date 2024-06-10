import SearchBar from "../searchBar/SearchBar";
import { PiBuildingApartment } from "react-icons/pi";

const Hero = () => {
  return (
    <section
      className="bg-[url('https://images.unsplash.com/photo-1584752242818-b4bd7fb3fe10?q=80&w=1467&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] hero relative bg-cover 
      font-[Poppins] md:bg-top bg-center h-screen flex items-center justify-center"
    >
      <div className="container mx-auto">
        <div className="flex relative flex-col justify-center text-white text-center py-24 items-center">
          <p className="flex justify-center items-center gap-2"><span><PiBuildingApartment /></span> <span>Real Estate Agency</span></p>
          <h1 className="md:text-5xl text-2xl text-white capitalize font-semibold w-3/5 flex gap-2 flex-col py-5">
            <span>Find your dream</span><span>house by us</span>
          </h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. <br /> Alias
            rerum odio incidunt dicta quibusdam beatae doloremque nam amet
            illum? Fugi.
          </p>
          <SearchBar />
        </div>
      </div>
    </section>
  );
};

export default Hero;
