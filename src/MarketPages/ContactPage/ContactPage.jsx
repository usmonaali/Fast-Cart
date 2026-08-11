import React from "react";
import HomePage from "../HomePage/HomePage";
import { Link } from "react-router-dom";
import CallToUs from "../../MagazinePagesComponents/CallToUs/CallToUs";
import FormInfo from "../../MagazinePagesComponents/FormInfo/FormInfo";

const ContactPage = () => (
  <div className="max-w-[1170px] mx-auto px-4 py-10">
    <div className={`flex`}>
      <Link to="/" className="text-[#808080] dark:text-white">
        Home
      </Link>
      <p className={`ml-[10px]`}>/</p>
      <p className={`dark:text-white ml-[10px]`}>Contact</p>
    </div>
    <section className={`mt-[60px] flex`}>
      <div>
        <CallToUs />
      </div>
      <div>
        <FormInfo/>
      </div>
    </section>
  </div>
);
export default ContactPage;
