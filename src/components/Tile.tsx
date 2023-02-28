import { FC } from "react";

type TileType = {
  value: number,
  onClick: (...args: any) => void
}

export const Tile: FC<TileType> = ({ value, onClick }) => {
  return (
    <div className="column" onClick={onClick}>
      {value}
    </div>
  );
};