import { DragDropContext } from 'react-beautiful-dnd';
import { useBoards } from '../context';
import Column from './column';
import Task from './task';

const Dashboard = () => {
  const {currentBoard, boards, dragTask} = useBoards();

  function handleOnDragEnd(result) {
    const {source, destination} = result;
    dragTask(source, destination);
  }

  return (
    <main className='overflow-y-hidden scrollbar-thin scrollbar-thumb-mainPurple scrollbar-track-transparent flex-1 p-4 space-x-4 bg-lightGrey dark:bg-veryDarkGrey flex'>
        <DragDropContext
            onDragEnd={handleOnDragEnd}
        >
        {
            currentBoard.columns.map((column, i) => (
                <Column data={column} key={i}>
                    {
                        column.tasks.map((taskId, j) => {
                            const task = currentBoard.tasks.filter(task => task.id === taskId)[0];
                            return <Task data={task} index={j} key={taskId} />
                        })
                    }
                </Column>
            ))
        }
        </DragDropContext>
    </main>
  )
}
export default Dashboard