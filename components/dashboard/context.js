import { createContext, useContext, useState } from "react";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API;
const BoardContext = createContext();

function BoardProvider({ data, type, token, children }) {
  const [boards, setBoards] = useState(data.boards);
  const currentBoard = type === "quizzes" ? boards.quizzes : boards.classes;
  const columns = currentBoard?.columns;

  const deleteItem = (itemId) => {
    if (type === "quizzes") {
      try {
        axios.delete(
          `${API}/quizzes/${itemId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        ).then(() => {
          const item = currentBoard.items.find((item) => item._id === itemId);
          const column = columns.find((column) => column.name === item.status);
          column.items = column.items.filter((id) => id !== itemId);
          currentBoard.items = currentBoard.items.filter(
            (item) => item.id !== itemId
          );
          setBoards(prevBoards => ({ ...prevBoards, ...boards }));
        });

      } catch (err) {
        console.error(err);
      }

    } else if (type === "classes") {
      try {
        axios.delete(
          `${API}/classes/${itemId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        ).then(() => {
          const item = currentBoard.items.find((item) => item._id === itemId);
          const column = columns.find((column) => column.name === item.semester);
          column.items = column.items.filter((id) => id !== itemId);
          currentBoard.items = currentBoard.items.filter(
            (item) => item.id !== itemId
          );
          setBoards(prevBoards => ({ ...prevBoards, ...boards }));
        });

      } catch (err) {
        console.error(err);
      }
    }

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
