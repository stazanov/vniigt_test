import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {getTrainsActionCreator} from "../redux/actions";
import {CharacteristicsTable} from "./CharacteristicsTable";
import "./Trains.css"

const nameTableHead = ["Название", "Описание"];

export const Trains = () => {
  const [show, setShow] = useState<boolean>(false)
  const [currentTrain, setCurrentTrain] = useState<string>("")

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getTrainsActionCreator())
  }, [dispatch])
  const loading = useAppSelector(state => state.loading)
  const trainList = useAppSelector(state => state.trainList)

  return (
    <div>
      {loading ? <h2>Loading...</h2> : <>
        <div className="total">
          <div className="train">
            <h2>Список поездов</h2>
            <table className="table">
              <thead>
              <tr>
                {nameTableHead.map((value, idx) => (
                  <th scope="col" key={idx}>
                    {value}
                  </th>
                ))}
              </tr>
              </thead>
              <tbody>
              {trainList.map((item, idx) => (
                <tr
                  key={idx}
                  className="table-tr-link"
                  onClick={() => {
                    setCurrentTrain(item.name)
                    setShow(true)
                  }}
                >
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
          {show && <div className="train">
              <h2>Характеристики</h2>
              <CharacteristicsTable name={currentTrain}/>
          </div>}
        </div>
      </>}
    </div>
  )
}