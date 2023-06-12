import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";
import data from "../data.json";

const BoardContext = createContext();

function BoardProvider({ children }) {
  const [boards, setBoards] = useLocalStorage("boards", data.boards);
  const [activeBoard, setActiveBoard] = useState(0);

  const currentBoard = boards[activeBoard];

  const columns = currentBoard?.columns;

  const createItem = (item) => {
    item.id = uuidv4();
    const column = columns.find((column) => column.name === item.status);
    item.status = column.name;
    console.log(item);
    column.items.push(item.id);
    currentBoard.items.push(item);
    setBoards([...boards]);
  };

  const updateItem = (updatedItem) => {
    const item = currentBoard.items.find((item) => item.id === updatedItem.id);
    item.title = updatedItem.title;
    if (updatedItem.status !== item.status) {
      const column = currentBoard.columns.find(
        (column) => column.name === updatedItem.status
      );
      const columnToRemove = currentBoard.columns.find(
        (column) => column.name === item.status
      );
      columnToRemove.items.splice(columnToRemove.items.indexOf(item.id), 1);
      column.items.push(item.id);
    }
    item.status = updatedItem.status;
    setBoards([...boards]);
  };

  const changeItemStatus = (itemId, status) => {
    const item = currentBoard.items.find((item) => item.id === itemId);
    const column = columns.find((column) => column.name === status);
    const prevColumn = columns.find((column) => column.name === item.status);
    console.log(prevColumn);
    prevColumn.items = prevColumn.items.filter((id) => id !== itemId);
    column.items.push(itemId);
    item.status = column.name;
    setBoards([...boards]);
  };

  const deleteItem = (itemId) => {
    console.log("ahihi");
    const item = currentBoard.items.find((item) => item.id === itemId);
    const column = columns.find((column) => column.name === item.status);
    column.items = column.items.filter((id) => id !== itemId);
    console.log(currentBoard.items);
    currentBoard.items = currentBoard.items.filter(
      (item) => item.id !== itemId
    );
    setBoards([...boards]);
    console.log(boards);
  };

  const value = {
    boards,
    setBoards,
    currentBoard,
    columns,
    createItem,
    changeItemStatus,
    updateItem,
    deleteItem,
  };
  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
}

const useBoards = () => {
  const context = useContext(BoardContext);
  if (context === undefined) {
    throw new Error("useBoards must be used within a BoardProvider");
  }
  return context;
};

export { BoardProvider, useBoards };
