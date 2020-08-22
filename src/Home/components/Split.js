import styled from "styled-components";
import wallpaper from './assets/img/wallpaper.jpg';
export const Split = styled.div`
position: relative;
background-image: url('${wallpaper}');
background-repeat: no-repeat;
background-size: cover;
width: 100%;
height: 98vh;
top:
}
`;

export const Synopsis= styled.div`
  padding-top: 200px;
  padding-left: 20px;
  font-size: 30px;
  color: #001529;
  font-weight: 700;
  text-align:center;`;

export const SplitTitle = styled.h1`
  font-size: 42px;
  color: #001529;
  text-align:center;
  font-weight: 700;
`;
export const SplitSide = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    grid-gap: 20px;

    @media (max-width: 786px) {
        grid-template-columns: 1fr;
    }`

export const SplitImg = styled.img`
  height: 100%;
  width: 100%;
`;

