// import React from 'react'
import "./Main.css";

import LeftSidebar from "../LeftSidebar/LeftSidebar";
import CustomerDetails from "../CustomerDetails/CustomerDetails";

import { useContext, useEffect, useState } from "react";
import { MdOutlineArrowCircleRight } from "react-icons/md";
import { CustomerContext } from "../../Context/CustomerContext";

const Main = () => {
  const [customerDetailsSelected, setCustomerDetailsSelected] = useState(true);

  const customerContext = useContext(CustomerContext);

  if (!customerContext) {
    throw new Error("Card must be used within a CustomerContextProvider");
  }

  const { selectedCustomer } = customerContext;

  useEffect(() => {
    setCustomerDetailsSelected(true);
  }, [selectedCustomer]);

  return (
    <main className="main_page_container">
      <nav className="main_page_navbar">
        <span className="navbar_heading">Customer Details</span>
      </nav>
      <aside
        className={`main_page_left_sidebar ${
          !customerDetailsSelected ? "main_page_left_sidebar_open" : ""
        }`}
      >
        <LeftSidebar />
      </aside>
      <section className="main_page_customer_details_section">
        <CustomerDetails />
      </section>
      <MdOutlineArrowCircleRight
        size={30}
        className={`switching_arrow ${
          customerDetailsSelected ? "switching_arrow_on_details_selected" : ""
        }`}
        onClick={() => setCustomerDetailsSelected(!customerDetailsSelected)}
      />
    </main>
  );
};

export default Main;
