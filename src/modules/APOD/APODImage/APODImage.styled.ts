import styled from "styled-components";

interface ImageProps {
    isloaded: string;
}

export const ImageContainer = styled.div`
  position: relative;
`;

export const Image = styled.img<ImageProps>`
  max-width: 100%;
  height: auto;
  opacity: ${({ isloaded }) => (isloaded === 'true' ? '1' : '0')};
  transition: opacity 0.5s ease;
`;

export const Title = styled.h2`
  position: absolute;
  top: 10px;
  left: 10px;
  color: white;
  font-size: 18px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px;
`;

export const Date = styled.h2`
  position: absolute;
  top: 50px;
  left: 10px;
  color: white;
  font-size: 16px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px;
`;
