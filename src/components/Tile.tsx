import { FC } from "react";
import styled from "styled-components";

type TileType = {
  value: number,
  onClick: (...args: any) => void;
  imageCoordinates: string;
  withImage?: boolean
}

const TileStyled = styled.button<{ imageCoordinates: string }>`
  background-position: ${props => props.imageCoordinates};
  background-image: ${props => props.imageCoordinates === '0' && 'none !important'};
  
  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.4;
  }
`

export const Tile: FC<TileType & React.HTMLProps<HTMLButtonElement>> = ({ onClick, imageCoordinates, disabled }) => {
  return (
    <TileStyled className="column" onClick={onClick} imageCoordinates={imageCoordinates} disabled={ disabled }/>
  );
};