import React, { useContext } from "react";
import "./LeftSidebar.css";

import { FixedSizeList as List } from "react-window";

import customer_details_json from "../../../public/jsons/customer_details.json";

import { CustomerContext } from "../../Context/CustomerContext";

interface CustomerDetails {
  id: number;
  name: string;
  title?: string;
  address?: string;
  details: string;
}

const Card: React.FC<{ customer_details: CustomerDetails }> = ({
  customer_details,
}) => {
  const customerContext = useContext(CustomerContext);

  if (!customerContext) {
    throw new Error("Card must be used within a CustomerContextProvider");
  }

  const { selectedCustomer, setSelectedCustomer } = customerContext;

  return (
    <div
      className={`card_container ${
        selectedCustomer === customer_details?.id
          ? "card_container_selected"
          : ""
      }`}
      onClick={() => setSelectedCustomer(customer_details?.id)}
    >
      <span className="customer_name">{customer_details?.name}</span>
      <p className="card_customer_details">{customer_details?.details}</p>
    </div>
  );
};

const Row = ({
  index,
  style,
}: {
  index: number;
  style: React.CSSProperties;
}) => {
  const details = customer_details_json[index];
  return (
    <div style={style}>
      <Card customer_details={details} />
    </div>
  );
};

const LeftSidebar: React.FC = () => {
  return (
    <div className="left_sidebar">
      <List
        height={2000}
        itemCount={customer_details_json?.length}
        itemSize={192}
        width={"100%"}
      >
        {Row}
      </List>
    </div>
  );
};

export default LeftSidebar;
