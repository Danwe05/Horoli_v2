import './list.scss'
import Card from"../card/Card"

function List({posts}){
  return (
    <div className=' border-2 border-red-500 grid grid-cols-2 gap-4 lg:gap-6 px-3 xl:px-0'>
      {posts.map(item=>(
        <Card key={item.id} item={item}/>
      ))}
    </div>
  )
}

export default List