import { AnimatePresence, motion } from "framer-motion";
import { FiTrash2 } from "react-icons/fi";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteCar, fetchCars } from "../../slices/carSlice";
import { useState } from "react";
import Loader from "../loader/Loader";

const PopUpModal = ({ isOpen, setIsOpen, carId }) => {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      // Perform delete operation
      await dispatch(deleteCar(carId)).unwrap();
      // Fetch updated list after successful deletion
      await dispatch(fetchCars());
      // Close the modal
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to delete the car:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-blue-600 to-blue-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <FiTrash2 className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-[5.8rem] -left-[5.5rem]" />
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-blue-600 grid place-items-center mx-auto">
                <FiTrash2 />
              </div>
              <h3 className="text-3xl font-bold text-center mb-2">
                Are you sure you want to delete this car?
              </h3>

              <div className="flex gap-2 mt-8 font-robotoMono">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                >
                  Nah, go back
                </button>
                <button
                  onClick={handleDelete}
                  className={`bg-white hover:opacity-90 transition-opacity text-blue-600 font-semibold w-full py-2 rounded ${
                    isDeleting ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <Loader width="w-5" show={isDeleting} />
                  ) : (
                    "Yeah! Do it"
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

PopUpModal.propTypes = {
  isOpen: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  setIsOpen: PropTypes.func.isRequired,
  carId: PropTypes.string.isRequired,
};

export default PopUpModal;
