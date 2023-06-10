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

  const createTask = (task) => {
    task.id = uuidv4();
    const column = columns.find((column) => column.name === task.status);
    task.status = column.name;
    console.log(task);
    column.tasks.push(task.id);
    currentBoard.tasks.push(task);
    setBoards([...boards]);
  };

  const updateTask = (updatedTask) => {
    const task = currentBoard.tasks.find((task) => task.id === updatedTask.id);
    task.title = updatedTask.title;
    if (updatedTask.status !== task.status) {
      const column = currentBoard.columns.find(
        (column) => column.name === updatedTask.status
      );
      const columnToRemove = currentBoard.columns.find(
        (column) => column.name === task.status
      );
      columnToRemove.tasks.splice(columnToRemove.tasks.indexOf(task.id), 1);
      column.tasks.push(task.id);
    }
    task.status = updatedTask.status;
    setBoards([...boards]);
  };

  const changeTaskStatus = (taskId, status) => {
    const task = currentBoard.tasks.find((task) => task.id === taskId);
    const column = columns.find((column) => column.name === status);
    const prevColumn = columns.find((column) => column.name === task.status);
    console.log(prevColumn);
    prevColumn.tasks = prevColumn.tasks.filter((id) => id !== taskId);
    column.tasks.push(taskId);
    task.status = column.name;
    setBoards([...boards]);
  };

  const deleteTask = (taskId) => {
    const task = currentBoard.tasks.find((task) => task.id === taskId);
    const column = columns.find((column) => column.name === task.status);
    column.tasks = column.tasks.filter((id) => id !== taskId);
    console.log(currentBoard.tasks);
    currentBoard.tasks = currentBoard.tasks.filter(
      (task) => task.id !== taskId
    );
    setBoards([...boards]);
    console.log(boards);
  };

  const value = {
    boards,
    setBoards,
    currentBoard,
    columns,
    createTask,
    changeTaskStatus,
    updateTask,
    deleteTask,
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
