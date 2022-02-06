import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  padding: 10px 10px;
  margin-bottom: 10px;
  background-color: ${(props) =>
    props.isDragging ? "#4989e9" : props.theme.cardColor};
  box-shadow: ${(props) => (props.isDragging ? "0px 2px 5px black" : "none")};
`;

interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}
function DraggableCard({ toDoId, toDoText, index }: IDraggableCardProps) {
  return (
    //react는 부모의 state가 바뀌면 모든자식들도 리랜더링함
    //react memo는 react한테 prop이 바뀌지 않는다면 컴포넌트를 랜더링 하지마랄고함
    // draggableId 와 key는 반드시 같아야함
    // ref는 beautiful-dnd가 html요소에 접근할 수 있게 해줌
    <Draggable key={toDoId} draggableId={toDoId + ""} index={index}>
      {/* 요소가 기본적으로 드래그 되길 원한다면 draggableProps */}
      {/* 요소의 드래그가능한 부분을 handle하려면 dragHandleProps */}
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}
//prop이 변하지 않았다면 DraggableCard를 다시렌더링 하지않음
export default React.memo(DraggableCard);
