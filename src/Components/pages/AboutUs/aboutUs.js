import React from "react";
import UserCard from "./UserCard";
import "./gg.css";
import zeinImage from './zein.jpg';

const AboutUsFunc = () => {
  return (
    <div className="mt-24 mb-20 flex flex-row justify-evenly items-center min-h-[54vh]">
      <UserCard
        name="Zein Delic"
        place="Novi Pazar, Serbia"
        description="Zein was the Team lead and made the home page, exchanges page, footer and header!"
        git="https://github.com/zeindelic"
        image = 'https://avatars.githubusercontent.com/u/117202123?v=4'
      />
      <UserCard
        name="Ammar Mustafic"
        place="Novi Pazar, Serbia"
        description="Ammar was a key component in the whole project, he made the  singular coin page and the profile page!"
        git="https://github.com/MrNikola"
        image="https://avatars.githubusercontent.com/u/114184018?v=4"
      />
      <UserCard
        name="Asmir Trtovac"
        place="Novi Pazar, Serbia"
        description="Asmir was the like the second Team Lead in this project, he made the coins page and the favorites functionality!"
        git="https://github.com/MrNikola"
        image="https://avatars.githubusercontent.com/u/103320034?v=4"
      />
      <UserCard
        name="Nikola Bozovic"
        place="Novi Pazar, Serbia"
        description="Nikola made contributions across the board and made this About us page!"
        git="https://github.com/MrNikola"
        image="https://avatars.githubusercontent.com/u/111905289?v=4"
      />
    </div>
  );
};
export default AboutUsFunc;
