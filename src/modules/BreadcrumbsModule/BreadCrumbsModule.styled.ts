import styled from "styled-components";
import {BreadCrumb} from "primereact/breadcrumb";

export const CustomBreadCrumbs = styled(BreadCrumb)`
  &&&{
    border: none;
    padding: 0;
    font-size: 14px;
    font-weight: 600;
    background: transparent;
    color: #7D8DA6;

    & .p-menuitem-text {
      color: #7D8DA6;
    }
  }
`