import styled from "styled-components";

export const HeaderContainer = styled.div`
background-color: rgb(0, 5, 59);
  width: 100%;
  height: 13vh;
  display: flex;
  align-items: center   ;
  justify-content: space-between;
`;
export const NavBarUl = styled.ul`
padding: 0%;
  margin: 0%;
  list-style-type: none;
  align-items: center;
  display: flex;
`;
export const NavBarli = styled.li`
  margin-right: 20px;
  margin-left: 20px;
`;
export const PLogo = styled.p`
margin: 0;
width: 200px;
margin-left: 10px;
  color: white;
`;
export const NavBar = styled.div`
background-color: white;
border-radius: 7px;
height: 76%;
  display: flex;
  font-size: 16px;
  font-weight: 500;
`;
export const MainHomeDiv = styled.div`
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0;
margin: 0;


`;
export const HomeCoinsDiv = styled.div`
padding: 10px;
border-bottom: 0.7px solid lightgray;
display: flex;
align-items: center;
flex-direction: row;
justify-content: space-between;
width: 80%;
margin: 0;
margin-top: 20px;

img{
    height: 50px;
    width: 50px;
}
h2{
    width: 20px;
font-size: 15px;
font-style: italic;
}
h4{
    width: 20px;
font-size: 15px;
font-weight: 400;
}
h3{
    width: 20px;
font-size: 15px;
font-weight: 400;
font-style: italic;
}

h1{
   width: 80px;
font-size: 15px;
font-weight: 700;


}

svg{
    width: 10%;
    margin-left: 20px;
}
`;

export const UserDiv = styled.div`
margin-right: 20px;

`;

export const LogoDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 20%;
  font-size: 20px;
  font-weight: 700;
`;
