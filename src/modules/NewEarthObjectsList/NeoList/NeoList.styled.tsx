import styled from "styled-components";
import {Link} from "react-router-dom";

export const NeoListWrapper = styled.div`
  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const CustomLink = styled(Link)`
  text-decoration: none;
`;