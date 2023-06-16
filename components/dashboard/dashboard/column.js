const Column = ({ data, children }) => {
  return (
    <div className="dashboard-column column w-[280px] shrink-0">
      <h3 className="heading-sm uppercase mb-6">
        <span className="item-status inline-block h-3 w-3 rounded-full mr-3"></span>
        {data.name} ({data.items.length})
      </h3>
      <ul className="scrollbar-thin scrollbar-thumb-mainPurple scrollbar-track-transparent overflow-y-scroll h-full pb-12 flex flex-col gap-5">
        {children}
      </ul>
    </div>
  )
}
export default Column