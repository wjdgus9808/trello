import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { toDoState } from "./atom";
import DraggableCard from "./Compponents/DraggableCard";
import Board from "./Compponents/Board";
import AddCategory from "./Compponents/AddCategory";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  //onDragEnd=>유저가 드래그를 끝낸 시점(드롭했을때)에 불려지는 함수
  const onDragEnd = (info: DropResult) => {
    const { draggableId, destination, source } = info;
    console.log(info);
    //drag하고 이동시키지 않았을 때 destination=>undefined 이문장 실행하지않으면 두번째 slice문 에러
    if (destination === undefined) return null;
    if (destination === null) {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        console.log(sourceBoard);

        sourceBoard.splice(source.index, 1);

        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
        };
      });
    }

    if (destination?.droppableId === source.droppableId) {
      //same board안에서 이동
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        //1) Delete item on source.index
        boardCopy.splice(source.index, 1);
        // 2) Put back the item on the destination.index
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy, //object key에 변수명을 쓸때는 괄호[] 쳐주기
        };
      });
    }
    if (destination?.droppableId !== source.droppableId) {
      //cross board movement
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const destinationBoard = [...allBoards[destination?.droppableId]];
        const taskObj = sourceBoard[source.index]; //source.index로 우리가 드래그 하고있는 obj위치 알수잇음

        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <AddCategory />
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} /> //toDos는 string[]형식인데 boardId는 string이 아니라고(""<-따옴표가없어서) 인식=>index signature
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
