import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars, searchCars } from "../slices/carSlice";
import DynamicDrawer from "../components/modal/DynamicDrawer";
import CarFormPage from "../pages/CarFormPage";
import logo from "../assets/carLlogo.png";
import { FiSearch } from "react-icons/fi";
import Loader from "../components/loader/Loader";
import nothingFound from "../assets/nothing-found.png";
import { motion } from "framer-motion";
import CarCard from "./CarCard";
import { useNavigate } from "react-router-dom";

const CarListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cars, loading, error } = useSelector((state) => state.cars);
  const [keyword, setKeyword] = useState("");
  const [isOpen, setIsOpen] = useState({});

  useEffect(() => {
    if (keyword.trim()) dispatch(searchCars(keyword));
    else dispatch(fetchCars());
  }, [dispatch, keyword]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) dispatch(searchCars(keyword));
    else dispatch(fetchCars());
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex flex-col w-screen h-screen relative">
      {/* Loading and Error States */}
      {loading && (
        <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-grow items-center justify-center">
            <Loader width="w-24" border="border-4" />
          </div>
        </div>
      )}

      {/* navbar */}
      <div className="w-full h-16 bg-[#fafdff] shadow-md flex items-center justify-between px-5 py-2 z-10">
        <div className=" w-16 h-auto">
          <img src={logo} className=" w-full h-full" alt="logo" />
        </div>

        <div className="flex w-fit items-center justify-center gap-3">
          {/* Search Form */}
          <form onSubmit={handleSearch}>
            <div className="relative w-[20rem]">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search cars..."
                className=" py-2 pl-10 w-full rounded-xl border-none outline-none bg-blue-50 ring-1 ring-blue-300 border-gray-400 placeholder:font-mavenPro"
              />
              <span className=" text-slate-400 text-xl absolute left-2 top-1/2 transform -translate-y-1/2">
                <FiSearch />
              </span>
            </div>
          </form>

          {/* Create Car Button */}
          <div>
            <button
              className="rounded-xl border-2 border-blue-400 bg-blue-100 px-4 py-[.41rem] font-semibold uppercase text-blue-700 text-[15px] transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_#5689c7] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
              onClick={() => setIsOpen({ ...isOpen, createCarModal: true })}
            >
              Create Car
            </button>

            {isOpen.createCarModal && (
              <DynamicDrawer open={isOpen.createCarModal} setOpen={setIsOpen}>
                <CarFormPage carId={null} setIsOpen={setIsOpen} />
              </DynamicDrawer>
            )}
          </div>

          <button
            className="rounded-xl border-2 border-red-400 bg-red-100 px-4 py-[.41rem] font-semibold uppercase text-red-700 text-[15px] transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_#c75658] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
            onClick={handleSignOut}
          >
            SignOut
          </button>
        </div>
      </div>

      <div className="flex flex-grow items-center justify-center p-4 relative overflow-hidden">
        {error && (
          <motion.div
            className="text-red-600 bg-red-100 rounded-lg text-lg px-4 py-2 shadow-md shadow-red-400 absolute z-50 top-4 right-4 tracking-wide font-robotoMono"
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
          >
            {error}
          </motion.div>
        )}

        {/* No Cars Message */}
        {cars.length === 0 && !loading && !error ? (
          <div className="flex flex-grow items-center justify-center flex-col gap-10">
            <img src={nothingFound} className="w-[26rem]" alt="no data" />
          </div>
        ) : (
          <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 overflow-y-auto px-3 pb-4">
            {cars.map((car) => (
              <CarCard
                key={car._id}
                car={car}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarListPage;
