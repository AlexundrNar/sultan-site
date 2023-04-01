import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IGood } from "../models/model";
import data from "../bd.json"
import "../style/catalog.scss";
import { useAppDispatch, useAppSelector } from "../store/hooks/redux";
import { cartActions } from "../store/reducers/CartSlice";

const Catalog: FC<any> = () => {
  const [goods, setGoods] = useState<IGood[]>(data)
  const [minPrice, setMinPrice] = useState<number>(0)
  const [maxPrice, setMaxPrice] = useState<number>(10000)
  const [maker, setMaker] = useState<string>("")
  const [asc, setAsc] = useState(true);
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1)
  const [dataPerPage] = useState(9)

  const dispatch = useAppDispatch();

  const adminItems = useAppSelector(state => state.adminSlice.adminItems) 

  // добавление товара в корзину
  const addToCart = (good: IGood): void => {
    dispatch(
      cartActions.addItem({
        barcode: good?.barcode,
        url: good?.url,
        name: good?.name,
        description: good?.description,
        price: good?.price,
        size: good?.size,
        sizeType: good?.sizeType,
        quantity: 1
      })
    );
  };
  
  // фильтр товаров по цене
  useEffect(() => {
    const prData = adminItems.filter((good) => {
      return good.price >= minPrice && good.price <= maxPrice 
    })
    setGoods(prData)
  }, [minPrice, maxPrice])
  
  // сортировка товаров по 4 видам
  useEffect(() => {
    let sortData
    if (sort === "price") {
      asc ? sortData = [...adminItems].sort((a, b) => (a.price) - (b.price)) : sortData = [...adminItems].sort((a, b) => (b.price) - (a.price));
      setGoods(sortData)
    }
    if (sort === "name") {
      asc ? sortData = [...adminItems].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
      : sortData = [...adminItems].sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()))
      setGoods(sortData)
    }
  }, [asc, sort])

  // фильтр по типу
  function handleFilter (e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const str = e.currentTarget.innerHTML.toLowerCase();
    const fData = adminItems.filter((good) => {
      return good.caretype.includes(str)     
    })
    setGoods(fData)
  }

  // по цене
  function handlePrice (e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.name === "minimum") {
      setMinPrice(+e.target.value)
    }
    if (e.target.name === "maximum") {
      setMaxPrice(+e.target.value)
    }
  }

  // производителю
  function handleMaker (e: React.ChangeEvent<HTMLInputElement>) {
    const str = e.target.value
    setMaker(e.target.value)
    const makerData = adminItems.filter((good: any) => good.maker.toLowerCase().includes(str.toLowerCase())) 
    setGoods(makerData)
  }

  function toggleAsc () {
    setAsc(!asc);
  };

  // пагинация
  const lastIndex = currentPage * dataPerPage
  const firstIndex = lastIndex - dataPerPage
  const currentGoodsList = goods.slice(firstIndex, lastIndex)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const prevPage = () => {
    if (currentPage !== 1) {
    setCurrentPage(page => page - 1)
    }
  }
  
  const nextPage = () => {
    if (currentPage !== pageNumbers.length) {
      setCurrentPage(page => page + 1)
    }
  }

  const pageNumbers = []
  for (let i =1; i <= Math.ceil(goods.length / dataPerPage); i++) {
    pageNumbers.push(i)
  }

  // навигация
  const navigate = useNavigate()

  return (
    <div className="container">
      <div className="toc">
        <h4>Главная</h4>
        <h4>Косметика и гигиена</h4>
      </div>

      <div className="catalog__title">
        <h2>Косметика и гигиена</h2>
        <div>
          <span>Сортировка:</span>
          <select onChange={(e) => setSort(e.target.value)}>
            <option value="name">Название</option>
            <option value="price">Цена</option>
          </select>
          <img className={asc ? 'catalog__asc': ''} src={`${process.env.PUBLIC_URL}/images/sort.svg`} alt="" onClick={toggleAsc} />
        </div>
      </div>

      <div className="catalog__filter">
        <button onClick={handleFilter}>Уход за телом</button>
        <button onClick={handleFilter}>Уход за руками</button>
        <button onClick={handleFilter}>Уход за ногами</button>
        <button onClick={handleFilter}>Уход за лицом</button>
        <button onClick={handleFilter}>Уход за волосами</button>
        <button onClick={handleFilter}>Средства для загара</button>
        <button onClick={handleFilter}>Средства для бритья</button>
        <button onClick={handleFilter}>Подарочные наборы</button>
        <button onClick={handleFilter}>Гигиеническая продукция</button>
        <button onClick={handleFilter}>Гигиена полости рта</button>
        <button onClick={handleFilter}>Бумажная продукция</button>
      </div>

      <div className="catalog">
        <div className="wrapper">
          <div className="catalog__params">
            <h3>ПОДБОР ПО ПАРАМЕТРАМ</h3>
            <p>
              Цена <strong>₸</strong>
            </p>

            <div className="params__price">
              <input type="text" maxLength={5} name="minimum" onChange={handlePrice} value={minPrice}/>
              <span>-</span>
              <input type="text" maxLength={5} name="maximum" onChange={handlePrice} value={maxPrice}/>
            </div>

            <div className="params__prod">
              <h4>Производитель</h4>
              <input type="text" placeholder="Поиск..." onChange={handleMaker} value={maker} />
              <button>
                <img src={`${process.env.PUBLIC_URL}/images/search.svg`} alt="" />
              </button>
            </div>

            <div className="params__filter">
              <button onClick={handleFilter}>Уход за телом</button>
              <button onClick={handleFilter}>Уход за руками</button>
              <button onClick={handleFilter}>Уход за ногами</button>
              <button onClick={handleFilter}>Уход за лицом</button>
              <button onClick={handleFilter}>Уход за волосами</button>
              <button onClick={handleFilter}>Средства для загара</button>
              <button onClick={handleFilter}>Средства для бритья</button>
              <button onClick={handleFilter}>Подарочные наборы</button>
              <button onClick={handleFilter}>Гигиеническая продукция</button>
              <button onClick={handleFilter}>Гигиена полости рта</button>
              <button onClick={handleFilter}>Бумажная продукция</button>
            </div>
          </div>
        </div>

        <div className="catalog__content">
          <div className="content__wrapper">
            {currentGoodsList.map(good => (
              <div className="catalog__card" key={good.barcode}>
                <img src={good.url} alt="пропала картинка" />
                <span>{good.size} {good.sizeType === "вес" ? "г" : "мл"}</span>
                <h3 onClick={() => navigate('/card/' + good.barcode)}>{good.name} {good.description}</h3>
                <p>Штрихкод: {good.barcode}</p>
                <p>Производитель: {good.maker}</p>
                <p>Тип ухода: {good.caretype}</p>
                <h4>{good.price} ₸</h4>
                <button onClick={() => addToCart(good)}>
                  В КОРЗИНУ
                  <img src={`${process.env.PUBLIC_URL}/images/cart_mini.svg`} alt="" />
                </button>
              </div>
            ))}
          </div>

          <div className="content__pagination">
            <button><img src={`${process.env.PUBLIC_URL}/images/arrow_yellow.svg`} alt="" onClick={prevPage}/></button>
            {
            pageNumbers.map(number => (
              <span className='page__items' key={number} onClick={() => paginate(number)}>
                {number}
              </span>
            ))
            }
            <button><img src={`${process.env.PUBLIC_URL}/images/arrow_yellow.svg`} alt="" onClick={nextPage}/></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
