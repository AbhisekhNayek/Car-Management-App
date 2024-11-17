import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCar, fetchCar, updateCar, fetchCars } from "../slices/carSlice";
import PropTypes from "prop-types";

const CarFormPage = ({ carId }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.cars);
  const [carData, setCarData] = useState({
    title: "",
    description: "",
    images: [],
    tags: "",
  });

  // Fetch car data if editing an existing car
  useEffect(() => {
    if (carId) {
      const fetchCarData = async () => {
        const car = await dispatch(fetchCar(carId)).unwrap();
        setCarData({
          title: car.title,
          description: car.description,
          images: [],
          tags: car.tags.join(", "),
        });
      };

      fetchCarData();
    }
  }, [carId, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleFileChange = (e) => {
    setCarData({ ...carData, images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", carData.title);
    formData.append("description", carData.description);
    formData.append("tags", carData.tags);
    for (let i = 0; i < carData.images.length; i++) {
      formData.append("images", carData.images[i]);
    }

    if (carId) await dispatch(updateCar({ carId, carData: formData }));
    else await dispatch(createCar(formData));

    dispatch(fetchCars());
  };

  return (
    <div className="flex w-full h-full rounded-lg justify-center items-center gap-x-3 lg:gap-x-16 bg-gradient-to-br from-slate-50 to-[#fcfdf0]">
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-[#eefffa] to-[#e2f3ff] rounded-md ring-1 ring-lime-200 p-5 w-[36rem]"
      >
        <h1 className="text-slate-600 font-onest tracking-wider font-bold text-2xl mb-12 text-center">
          {carId ? "Edit Car" : "Create Car"}
        </h1>

        <div className="grid gap-3 grid-cols-2">
          {/* Title Input */}
          <div className="flex items-center mb-5 rounded-lg relative group">
            <input
              id="title"
              name="title"
              type="text"
              value={carData.title}
              onChange={handleChange}
              required
              className={`w-full bg-white pl-3 pr-10 text-slate-900 border-none outline-none focus:outline-none rounded-lg py-2.5 ${
                carData.title ? "ring-1 ring-cyan-400" : ""
              } transition-all hover:ring-blue-300 ring-1 ring-blue-100 peer`}
            />
            <label
              htmlFor="title"
              className={`absolute transition-all left-4 text-slate-800 text-[15px] ${
                carData.title
                  ? "left-2 -top-[1.1rem] text-xs font-bold text-slate-600"
                  : "top-1/2 -translate-y-1/2"
              }`}
            >
              Title
            </label>
          </div>

          {/* Tags Input */}
          <div className="flex items-center mb-5 rounded-lg relative group">
            <input
              id="tags"
              name="tags"
              type="text"
              value={carData.tags}
              onChange={handleChange}
              required
              className={`w-full bg-white pl-3 pr-10 text-slate-900 border-none outline-none focus:outline-none rounded-lg py-2.5 ${
                carData.tags ? "ring-1 ring-cyan-400" : ""
              } transition-all hover:ring-blue-300 ring-1 ring-blue-100 peer`}
            />
            <label
              htmlFor="tags"
              className={`absolute transition-all left-4 text-slate-800 text-[15px] ${
                carData.tags
                  ? "left-2 -top-[1.1rem] text-xs font-bold text-slate-600"
                  : "top-1/2 -translate-y-1/2"
              }`}
            >
              Tags (comma-separated)
            </label>
          </div>

          {/* Description Textarea */}
          <div className="flex items-center mb-5 rounded-lg relative group col-span-2">
            <textarea
              id="description"
              name="description"
              value={carData.description}
              onChange={handleChange}
              required
              className={`w-full bg-white pl-3 pr-10 text-slate-900 border-none outline-none focus:outline-none rounded-lg py-2.5 ${
                carData.description ? "ring-1 ring-cyan-400" : ""
              } transition-all hover:ring-blue-300 ring-1 ring-blue-100 peer`}
            />
            <label
              htmlFor="description"
              className={`absolute transition-all left-4 text-slate-800 text-[15px] ${
                carData.description
                  ? "left-2 -top-[1.1rem] text-xs font-bold text-slate-600"
                  : "top-2"
              }`}
            >
              Description
            </label>
          </div>

          {/* Images Input */}
          <div className="flex items-center mb-5 rounded-lg relative group col-span-2">
            <input
              id="images"
              name="images"
              type="file"
              multiple
              onChange={handleFileChange}
              className={`w-full bg-white pl-3 pr-10 text-slate-900 border-none outline-none focus:outline-none rounded-lg py-2.5 ${
                carData.images.length > 0 ? "ring-1 ring-cyan-400" : ""
              } transition-all hover:ring-blue-300 ring-1 ring-blue-100 peer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-violet-100`}
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-sm mt-2 text-center">{error}</div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-x-2 mt-4 py-2 rounded-lg bg-[#eef9ff] ring-1 ring-blue-100 hover:ring-0 hover:bg-blue-200 active:scale-95 transition-all duration-200 text-slate-500 hover:text-indigo-600 font-semibold font-mavenPro tracking-wider w-full"
        >
          {loading
            ? carId
              ? "Updating..."
              : "Creating..."
            : carId
            ? "Update Car"
            : "Create Car"}
        </button>
      </form>
    </div>
  );
};

CarFormPage.propTypes = {
  carId: PropTypes.string,
  setIsOpen: PropTypes.func,
};

export default CarFormPage;
