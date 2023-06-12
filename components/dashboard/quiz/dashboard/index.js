import { useBoards } from '../context';
import Column from './column';
import Item from './item';

const Dashboard = () => {
    const { currentBoard } = useBoards();

    return (
        <main className='quiz-dashboard overflow-y-hidden scrollbar-thin scrollbar-thumb-mainPurple scrollbar-track-transparent flex-1 p-4 space-x-4 bg-lightGrey dark:bg-veryDarkGrey flex'>
            {
                currentBoard.columns.map((column, i) => (
                    <Column data={column} key={i}>
                        {
                            column.items.map((itemId, j) => {
                                const item = currentBoard.items.filter(item => item.id === itemId)[0];
                                return <Item data={item} index={j} />
                            })
                        }
                    </Column>
                ))
            }
        </main>
    )
}
export default Dashboard