export interface Predict {
  code: string
  message: string
  data: PredictData
}

export interface PredictData {
  answer: AnswerData[]
  total: number
}

export interface Answer {
  code: string
  message: string
  data: AnswerData
}

export interface AnswerData {
  id: string
  name: string
  question: string
  answerType: string
  Answer: AnswerMap
  answer: AnswerMap
  date: AnswerDate
  img: string
  imgPath: string
  detail: string
  correctAnswer: any
  createdBy: string
  createdDate: string
  status: string
  isEndTime: boolean
  isActive: boolean
}

export interface AnswerPlayer {
  code: string
  message: string
  data?: AnswerPlayerData
}

export interface AnswerPlayerData {
  id: string
  answerId: string
  name: string
  question: string
  choiceSet: AnswerMap
  rightOrWrong: boolean
  username: string
  createdDate: string
  status: string
}

export interface AnswerMap {
  [key: string]: string
}

export interface AnswerDate {
  start: string
  end: string
}