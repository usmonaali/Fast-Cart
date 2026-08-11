import React from "react";
import HomePage from "../HomePage/HomePage";
import { Link } from "react-router-dom";
import StoryPage from "../../MagazinePagesComponents/StoryPage/StoryPage";
import StoryCards from "../../MagazinePagesComponents/StoryCards/StoryCards";
import StoryPersons from "../../MagazinePagesComponents/StoryPersons/StoryPersons";
import StoryHelp from "../../MagazinePagesComponents/StoryHelp/StoryHelp";
const AboutPage = () => (
  <div className="max-w-[1170px] mx-auto px-4 py-10">
    <div className={`flex`}>
      <Link to="/" className="text-[#808080] dark:text-white">
        Home
      </Link>
      <p className={`ml-[10px]`}>/</p>
      <p className={`dark:text-white`}>About</p>
    </div>
    <section>
      <StoryPage />
    </section>
    <section>
      <StoryCards />
    </section>
    <section>
      <StoryPersons />
    </section>
    <section>
      <StoryHelp />
    </section>
  </div>
);
export default AboutPage;
