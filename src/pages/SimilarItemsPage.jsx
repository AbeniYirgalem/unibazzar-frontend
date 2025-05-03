import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import listingsData from "../mock/listings.json";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";
import { Link } from "react-router-dom";

function SimilarItemsPage() {
  const { id } = useParams();
  const [similarItems, setSimilarItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    const itemId = Number(id); // convert to number
    const selectedItem = listingsData.find((item) => item.id === itemId);
    setCurrentItem(selectedItem);

    if (selectedItem) {
      const similar = listingsData.filter(
        (item) =>
          item.category === selectedItem.category && item.id !== selectedItem.id
      );
      setSimilarItems(similar);
    }
  }, [id]);

  if (!currentItem)
    return (
      <div className="p-6 pt-16 text-gray-900 dark:text-white">Loading...</div>
    );

  return (
    <div className="p-6 pt-16 text-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold mb-4">
        Similar Items to: {currentItem.title}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {similarItems.map((item) => (
          <CardContainer
            key={item.id}
            className="group relative w-full max-w-sm mx-auto overflow-visible"
          >
            <CardBody className="relative bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300 flex flex-col overflow-visible">
              <CardItem>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-48 w-full object-cover rounded mb-4"
                />
              </CardItem>
              <CardItem>
                <h2 className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-1 mb-1">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {item.category}
                </p>
                <p className="text-blue-600 font-bold text-lg mb-4">
                  ${item.price}
                </p>
              </CardItem>
              <Link
                to={`/listing/${item.id}`}
                className="bg-black dark:bg-blue-600 text-white px-3 py-2 rounded text-sm text-center hover:opacity-90 transition"
              >
                View Details
              </Link>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </div>
  );
}

export default SimilarItemsPage;
