import styled from "styled-components";

export const BoardGame = styled.div<{ columns: number }>`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;

  & > .row {
    grid-template-columns: repeat(${props => props.columns}, 1fr);
  }
`;