function FriendItem({ item, setFriendAdd, setUserIdx }) {
  return (
    <div
      onClick={() => {
        setFriendAdd([false, false, true]);
        setUserIdx(item.userIdx);
      }}
    >
      <div className='flex bg-[#fde68a] border-1 border-[#fde68a] rounded-md m-1 mb-3 p-2'>
        <img
          src={item.img}
          className='inline-block w-1/4 p-1 mr-3 rounded-full h-1/4'
          alt='item-img'
        ></img>
        <div className='my-2'>
          <p className='mb-1 font-bold'>{item.nickname}</p>
          <p className='break-all'>{item.introduction}</p>
        </div>
      </div>
    </div>
  );
}

export default FriendItem;
