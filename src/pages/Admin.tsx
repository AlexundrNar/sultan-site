import React, { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks/redux";
import { IGood } from "../models/model";
import "../style/admin.scss";
import { adminActions } from "../store/reducers/AdminSlice";

const Admin: FC = () => {
  const [form, setForm] = useState<any>();
  const [options, setOptions] = useState<any>();


  const data = useAppSelector(state => state.adminSlice.adminItems)

  const dispatch = useAppDispatch();

  const handleSelect = (e: any) => {
    let value = Array.from(
      e.target.selectedOptions,
      (option: any) => option.value
    );
    setOptions(value);
  }

  // добавление в корзину
  const changeItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    dispatch(
      adminActions.changeData({
        name: form.name,
        description: form.desc,
        sizeType: form.tSize,
        size: form.size,
        barcode: Number(form.bar),
        maker: form.maker,
        brend: form.brend,
        price: form.price,
        url: form.url,
        caretype: options
      })
    );
  };

  const deleteProduct = (item: IGood) => {
    dispatch(adminActions.deleteItem(item.barcode));
  };

  return (
    <div className="container">
      <div className="admin">
        <form className="form">
          <h4>Форма для товара</h4>
          <input onChange={(e) => setForm({...form, name: e.target.value})} type="text" placeholder="Название"/>
          <input onChange={(e) => setForm({...form, desc: e.target.value})} type="text" placeholder="Описание"/>
          <input onChange={(e) => setForm({...form, tSize: e.target.value})} type="text" placeholder="тип размера"/>
          <input onChange={(e) => setForm({...form, size: e.target.value})} type="text" placeholder="размер"/>
          <input onChange={(e) => setForm({...form, bar: e.target.value})} type="text" placeholder="баркод"/>
          <input onChange={(e) => setForm({...form, maker: e.target.value})} type="text" placeholder="производитель"/>
          <input onChange={(e) => setForm({...form, brend: e.target.value})} type="text" placeholder="бренд"/>
          <input onChange={(e) => setForm({...form, price: e.target.value})} type="text" placeholder="цена"/>
          <input onChange={(e) => setForm({...form, url: e.target.value})} type="text" placeholder="ссылка на картинку"/>
          <select name="уход" multiple value={options} onChange={handleSelect}>
            <option value="уход за телом">уход за телом</option>
            <option value="уход за руками">уход за руками</option>
            <option value="уход за ногами">уход за ногами</option>
            <option value="уход за лицом">уход за лицом</option>
            <option value="уход за волосами">уход за волосами</option>
            <option value="средства для загара">средства для загара</option>
            <option value="средства для бритья">средства для бритья</option>
            <option value="подарочные наборы">подарочные наборы</option>
            <option value="гигиеническая продукция">гигиеническая продукция</option>
            <option value="гигиена полости рта">гигиена полости рта</option>
            <option value="бумажная продукция">бумажная продукция</option>
          </select>
          <div className="form__btn">
            <button onClick={changeItem}>Изменить содержимое</button>
          </div>
        </form>

        <div>
          {data.map((good: IGood) => (
            <div className="admin__content" key={good.barcode}>
              <div className="admin__img">
                <img src={good.url} alt="" />
              </div>
              <div className="admin__info">
                <span>
                  {good.size} {good.sizeType === "вес" ? "г" : good.sizeType === "объем" ? "мл" : "вес"}
                </span>
                <h3>{good.name}</h3>
                <p>{good.description}</p>
                <h3>{good.price} ₸</h3>
              </div>
              <div className="admin__caretype">
                <p>{good.caretype.join(',')}</p>
              </div>
              <div className="admin__price">
                <h3>{good.maker}</h3>
                <h3>{good.brend}</h3>
                <p>{good.barcode}</p>
              </div>
                <button className="btn__danger" onClick={() => deleteProduct(good)}>
                  &#10006;
                </button>
            </div>
          ))}
        </div>
      </div>


    </div>
  )
}

export default Admin