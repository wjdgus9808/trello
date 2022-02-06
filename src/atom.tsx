import { atom, selector } from "recoil";

interface IToDoState {
  [key: string]: ITodo[];
}
export interface ITodo {
  id: number;
  text: string;
}
export const toDoState = atom<IToDoState>({
  key: "toDO",
  default: {
    "To Do": [], //key가 ""따옴표가없기때문에 type지정안해주면 string이라고 인식못함
    Doing: [],
    Done: [],
  },
});
