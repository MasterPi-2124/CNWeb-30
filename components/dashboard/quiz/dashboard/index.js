import { useBoards } from '../context';
import Column from './column';
import Task from './task';

const Dashboard = () => {
    const { currentBoard } = useBoards();

    return (
        <main className='overflow-y-hidden scrollbar-thin scrollbar-thumb-mainPurple scrollbar-track-transparent flex-1 p-4 space-x-4 bg-lightGrey dark:bg-veryDarkGrey flex'>
            {
                currentBoard.columns.map((column, i) => (
                    <Column data={column} key={i}>
                        {
                            column.tasks.map((taskId, j) => {
                                const task = currentBoard.tasks.filter(task => task.id === taskId)[0];
                                return <Task data={task} index={j} />
                            })
                        }
                    </Column>
                ))
            }
        </main>
    )
}
export default Dashboard