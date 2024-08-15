import React, { useContext, useEffect, useState } from "react";
import "./CustomerDetails.css";

import axios from "axios";
import { FiLoader } from "react-icons/fi";

import customer_details_json from "../../../public/jsons/customer_details.json";
import { CustomerContext } from "../../Context/CustomerContext";

interface ImageDetails {
  id: number;
  url: string;
}

const CustomerDetails: React.FC = () => {
  const [customerImages, setCustomerImages] = useState<ImageDetails[] | null>(
    null
  );

  useEffect(() => {
    const fetchImage = async (page: number) => {
      const images_url = `https://picsum.photos/v2/list?page=${page}&limit=9`;
      setCustomerImages(null);

      try {
        const response = await axios.get(images_url);

        const image_urls: ImageDetails[] = response.data?.map(
          (url_details: any) => ({
            id: url_details?.id,
            url: url_details?.download_url,
          })
        );

        setCustomerImages(image_urls);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    const initialPage = Math.floor(Math.random() * 100) + 1;
    fetchImage(initialPage);

    const intervalId = setInterval(() => {
      const randomPage = Math.floor(Math.random() * 100) + 1;
      fetchImage(randomPage);
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const customerContext = useContext(CustomerContext);

  if (!customerContext) {
    throw new Error("Card must be used within a CustomerContextProvider");
  }

  const { selectedCustomer } = customerContext;

  return (
    <div className="customer_details">
      <section className="customer_name_title_address">
        <span>{customer_details_json[selectedCustomer]?.name}</span>
        <span>{customer_details_json[selectedCustomer]?.title}</span>
        <span>{customer_details_json[selectedCustomer]?.address}</span>
      </section>

      <p className="customer_details_container">
        {customer_details_json[selectedCustomer]?.details}
      </p>

      <div className="customer_images">
        {customerImages &&
          customerImages.map((image) => (
            <div className="image_container" key={image?.id}>
              <img
                key={image?.id}
                src={image?.url}
                alt={`customer_image_${image?.id}`}
              />
            </div>
          ))}
      </div>
      {!customerImages && (
        <FiLoader size={30} className="customer_images_loader" />
      )}
    </div>
  );
};

export default CustomerDetails;
