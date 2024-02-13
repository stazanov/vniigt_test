import {CharacteristicsType} from "../type/type";
import {isValid} from "./isValid";

export const isValidList = (characteristics: CharacteristicsType[]): boolean => {
  let res: boolean = true
  characteristics.forEach((characteristic) => {
    if (!isValid({header: "speed", value: String(characteristic.speed)})) res = false
    if (!isValid({header: "force", value: String(characteristic.force)})) res = false
    if (!isValid({header: "engineAmperage", value: String(characteristic.engineAmperage)})) res = false
  })
  return res
}