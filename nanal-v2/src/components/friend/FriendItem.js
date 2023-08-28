import { Link } from 'react-router-dom';

function FriendItem({ item }) {
  return (
    <div>
      <Link to={`/Friend`} state={{ friendIdx: item.userIdx }}>
        {/* <div className='flex bg-[#EBEBEB] border-2 border-dashed border-slate-200 rounded-lg m-1 mb-3 p-2'> */}
        <div className='flex bg-[#EBEBEB] border-1 border-slate-200 rounded-lg m-1 mb-3 p-2 w-80'>
          <img
            src={item.img}
            className='inline-block w-1/4 p-1 mr-3 rounded-full h-1/4'
          ></img>
          <div className='my-2 w-52'>
            <p className='box-border mb-1 font-bold'>{item.nickname}</p>
            <p className='box-border truncate'>{item.introduction}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default FriendItem;
