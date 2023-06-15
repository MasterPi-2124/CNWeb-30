import { createContext, useContext, useState } from "react";

const BoardContext = createContext();

function BoardProvider({ data, type, children }) {
  const [boards, setBoards] = useState(data.boards);
  const currentBoard =  type === "quizzes" ?boards.quizzes : boards.classes;
  const columns = currentBoard?.columns;

  const deleteItem = (itemId) => {
    const item = currentBoard.items.find((item) => item.id === itemId);
    const column = columns.find((column) => column.name === item.status);
    column.items = column.items.filter((id) => id !== itemId);
    console.log(currentBoard.items);
    currentBoard.items = currentBoard.items.filter(
      (item) => item.id !== itemId
    );
    setBoards([...boards]);
  };

  const value = {
    boards,
    setBoards,
    currentBoard,
    columns,

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
