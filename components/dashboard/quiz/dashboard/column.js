const Column = ({ data, children }) => {

  return (
    <div className="column w-[280px] shrink-0">
      <h3 className="heading-sm uppercase mb-6">
        <span className="task-status inline-block h-3 w-3 rounded-full mr-3"></span>
        {data.name} ({data.tasks.length})
      </h3>
      <ul className="scrollbar-thin scrollbar-thumb-mainPurple scrollbar-track-transparent overflow-y-scroll h-full pb-12 flex flex-col gap-5">
        {children}
      </ul>
    </div>
  )
}
export default Column