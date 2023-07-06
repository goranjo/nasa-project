import styled from "styled-components";

export const StyledMenuBar = styled.div`
  background-color: #f5f5f5;
  padding: 10px 0;

  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

export const StyledMenuItem = styled.li`
  margin-right: 20px;
  font-size: 16px;
  font-weight: bold;

  a {
    text-decoration: none;
    color: #333;
    transition: color 0.3s;

    &:hover {
      color: #008cba;
    }
  }
`;
