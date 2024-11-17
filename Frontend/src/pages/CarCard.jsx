import propTypes from "prop-types";
import DynamicDrawer from "../components/modal/DynamicDrawer";
import CarFormPage from "./CarFormPage";
import PopUpModal from "../components/modal/PopUpModal";

const CarCard = ({ car, isOpen, setIsOpen }) => {
  const handleEditClick = (carId) => {
    setIsOpen((prev) => ({
      ...prev,
      [carId]: { ...prev[carId], editModal: true },
    }));
  };

  // Open the delete modal for a specific car
  const handleDeleteClick = (carId) => {
    setIsOpen((prev) => ({
      ...prev,
      [carId]: { ...prev[carId], deleteModal: true },
    }));
  };

  // Close a specific modal type (edit or delete) for a specific car
  const closeModal = (carId, modalType) => {
    setIsOpen((prev) => ({
      ...prev,
      [carId]: { ...prev[carId], [modalType]: false },
    }));
  };

  return (
    <div className=" bg-white rounded-lg px-3 py-2 shadow-md flex flex-col gap-3 min-h-[22rem] max-h-[22rem]">
      <div className=" w-full flex items-center justify-between">
        <div className="text-lg text-slate-600 font-montserrat max-w-[12rem line-clamp-1">
          {car.title}
        </div>

        {car.createdAt && (
          <div className="text-xs text-gray-500 bg-slate-100 rounded-full px-3 py-1">
            {formatDate(car.createdAt)}
          </div>
        )}
      </div>

      <div className="flex gap-2 overflow-hidden">
        {car.tags.map((tag, index) => (
          <span
            key={index}
            className="text-xs text-blue-800 bg-blue-100/60 font-mono rounded-full px-3 py-1"
          >
            {tag}
          </span>
        ))}
      </div>

      {car.images.length > 0 && (
        <div className=" rounded-md overflow-hidden aspect-video h-[14rem]">
          <img
            src={car.images[0]}
            className="w-full h-full object-cover"
            alt={car.title}
          />
        </div>
      )}

      {/* Action Buttons: Edit & Delete */}
      <div className="flex justify-end gap-x-3">
        {/* Edit Modal */}
        <div>
          <button
            onClick={() => handleEditClick(car._id)}
            className="px-4 py-1 text-sm bg-green-200/50 ring-1 ring-green-200 text-green-700 rounded-lg overflow-hidden font-onest"
          >
            Edit
          </button>

          {isOpen[car._id]?.editModal && (
            <DynamicDrawer
              open={isOpen[car._id]?.editModal}
              setOpen={() => closeModal(car._id, "editModal")}
            >
              <CarFormPage
                carId={car._id}
                setIsOpen={() => closeModal(car._id, "editModal")}
                carInfo={car}
              />
            </DynamicDrawer>
          )}
        </div>

        {/* Delete Modal */}
        <div>
          <button
            onClick={() => handleDeleteClick(car._id)}
            className="px-4 py-1 text-sm bg-red-200/50 ring-1 ring-red-200 text-red-700 rounded-lg overflow-hidden font-onest"
          >
            Delete
          </button>

          {isOpen[car._id]?.deleteModal && (
            <PopUpModal
              isOpen={isOpen[car._id]?.deleteModal}
              setIsOpen={() => closeModal(car._id, "deleteModal")}
              carId={car._id}
            />
          )}
        </div>
      </div>
    </div>
  );
};

CarCard.propTypes = {
  car: propTypes.object.isRequired,
  isOpen: propTypes.object.isRequired,
  setIsOpen: propTypes.func.isRequired,
};

export default CarCard;

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};
