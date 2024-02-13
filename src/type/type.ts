export interface CharacteristicsType {
  speed: number,
  force: number,
  engineAmperage: number
}

export interface TrainType {
  name: string,
  description: string,
  characteristics: {
    data: CharacteristicsType[],
    isValid: boolean
  }
}

export interface GetTrainType {
  name: string,
  description: string,
  characteristics: CharacteristicsType[]
}
