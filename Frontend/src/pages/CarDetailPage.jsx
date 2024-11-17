import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCar, deleteCar } from "../slices/carSlice";
import { useParams, useNavigate } from "react-router-dom";

const CarDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { car, loading, error } = useSelector((state) => state.cars);

  // Fetch car details on component mount
  useEffect(() => {
    dispatch(fetchCar(id));
  }, [dispatch, id]);

  const handleDelete = async () => {
    await dispatch(deleteCar(id));
    navigate("/cars"); // Navigate back to the car list after deletion
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
  if (!car) return <div>No car found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{car.title}</h1>
      <p className="mb-4">{car.description}</p>
      
      {/* Displaying car images */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {car.images.length > 0 ? (
          car.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Car ${index}`}
              className="w-full h-auto rounded-md"
            />
          ))
        ) : (
          <p>No images available</p>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex space-x-4">
        <button
          onClick={() => navigate(`/edit-car/${id}`)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CarDetailPage;
