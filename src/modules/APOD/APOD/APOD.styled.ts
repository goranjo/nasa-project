import styled, { keyframes, css } from "styled-components";

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const TransitionContainer = styled.div<{ transitioning: string }>`
  transition: opacity 0.5s ease;
  opacity: ${({ transitioning }) => (transitioning === 'false' ? '1' : '0')};
  animation: ${({ transitioning }) =>
          transitioning === 'true'
                  ? css`
          ${fadeOut} 1.5s ease forwards
        `
                  : "none"};
`;
