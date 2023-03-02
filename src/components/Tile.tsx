import { FC } from "react";
import styled from "styled-components";

type TileType = {
  value: number,
  onClick: (...args: any) => void;
  imageCoordinates: string;
  withImage?: boolean
}

const TileStyled = styled.div<{ imageCoordinates: string }>`
  background-position: ${props => props.imageCoordinates};
  background-image: ${props => props.imageCoordinates === '0' && 'none !important'};
`

export const Tile: FC<TileType> = ({ value, onClick, imageCoordinates }) => {
  return (
    <TileStyled className="column" onClick={onClick} imageCoordinates={imageCoordinates}/>
  );
};