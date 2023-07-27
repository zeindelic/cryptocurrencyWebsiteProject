import React from "react";
import { NavLink } from "react-router-dom";
import { BiSolidUserRectangle } from 'react-icons/bi';
import { HeaderContainer, LogoDiv, PLogo, NavBarUl, NavBarli, NavBar, UserDiv } from "../../styledComponents/index.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faSearch } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <HeaderContainer>
      <LogoDiv>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")} to={"/"}style={{display: 'flex',width: '100%', textDecoration: "none", color: "#5762D5" }}>
          <img src="https://i.postimg.cc/8P0LjnXR/logo-removebg-preview.png" style={{height: '50px', marginTop:'-10px', marginLeft:'20px'}}></img>
         <PLogo>CRYPTO-APP</PLogo>
        </NavLink>
        </LogoDiv>
        <NavBar>
        <NavBarUl>
        <NavBarli>
          <NavLink
            to={"/coins"}
            style={{ textDecoration: "none", color: "#6E7DAB" }}
          >
           Coins
          </NavLink>
          </NavBarli> 
          <NavBarli>
          <NavLink
            to={"/exchanges"}
            style={{ textDecoration: "none", color: "#6E7DAB" }}
          >
           Exchanges
          </NavLink>
          </NavBarli>
          <NavBarli>
          <NavLink
            to={"/about_us"}
            style={{ textDecoration: "none", color: "#6E7DAB" }}
          >
           About Us
          </NavLink>
          </NavBarli>
          <NavBarli>
          <NavLink
            to={"/favorite"}
            style={{ textDecoration: "none", color: "#6E7DAB" }}
          >
           <FontAwesomeIcon icon={faHeart} style={{ height: "20px" }} />
          </NavLink>
          </NavBarli>
        </NavBarUl>
        </NavBar>
        <UserDiv>
        <NavLink
            to={"/user"}
            style={{ textDecoration: "none", color: "#6E7DAB" }}
          >
        <BiSolidUserRectangle    style={{ fontSize:'40px',textDecoration: "none", color: "white" }} />
        </NavLink>
        </UserDiv>
      </HeaderContainer>  
    );
};

export default Header;
