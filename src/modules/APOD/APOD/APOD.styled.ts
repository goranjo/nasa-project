import styled, { keyframes, css } from "styled-components";

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const TransitionContainer = styled.div<{ transitioning: boolean }>`
  transition: opacity 0.5s ease;
  opacity: ${({ transitioning }) => (transitioning ? '0' : '1')};
  animation: ${({ transitioning }) =>
          transitioning
                  ? css`
          ${fadeOut} 0.5s ease forwards
        `
                  : "none"};
`;
