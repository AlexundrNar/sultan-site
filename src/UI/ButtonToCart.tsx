import React, { FC } from "react";

interface IProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const ButtonToCart: FC<IProps> = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      В корзину
      <img src={`${process.env.PUBLIC_URL}/images/cart_mini.svg`} alt="" />
    </button>
  );
};

export default ButtonToCart;
