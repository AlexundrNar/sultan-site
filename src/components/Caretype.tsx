import React, { FC } from 'react'

interface ICaretype {
  className: string,
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const Caretype: FC<ICaretype> = ({onClick, className}) => {
  return (
    <div className={className}>
        <button onClick={onClick}>Уход за телом</button>
        <button onClick={onClick}>Уход за руками</button>
        <button onClick={onClick}>Уход за ногами</button>
        <button onClick={onClick}>Уход за лицом</button>
        <button onClick={onClick}>Уход за волосами</button>
        <button onClick={onClick}>Средства для загара</button>
        <button onClick={onClick}>Средства для бритья</button>
        <button onClick={onClick}>Подарочные наборы</button>
        <button onClick={onClick}>Гигиеническая продукция</button>
        <button onClick={onClick}>Гигиена полости рта</button>
        <button onClick={onClick}>Бумажная продукция</button>
      </div>
  )
}

export default Caretype