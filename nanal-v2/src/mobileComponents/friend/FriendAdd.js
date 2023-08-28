import React, { useEffect } from 'react';
import { onLogin } from '../../config/Login';
import FriendAddScript from '../../scripts/friend/FriendAdd';

function FriendAdd() {
  const friendList = FriendAddScript.friendList;
  const searchFriend = FriendAddScript.searchFriend;
  const addFriend = FriendAddScript.addFriend;

  useEffect(() => {
    onLogin();
  }, []);

  return (
    <div>
      <p className='box-border flex justify-around h-20 p-4 w-70'>
        찾고자 하는 친구의 아이디를 <br />
        입력 후 검색해주세요
      </p>
      <form
        onSubmit={searchFriend}
        className='grid grid-cols-2 m-auto h-18 w-70'
      >
        <input
          type='text'
          id='searchId'
          className='w-full pl-2 m-auto rounded-lg h-18'
        />
        <button type='submit' className='w-16 m-auto h-18'>
          검색하기
        </button>
      </form>
      <hr className='mx-auto my-5 text-center border-dashed border-1 border-slate-800 w-80' />
      {friendList.map((friendItem) => (
        <div key={friendItem.userIdx} className='my-2'>
          <p className='font-semibold'>친구의 </p>
          <p>닉네임 : {friendItem.userId}</p>
          <p>이메일 : {friendItem.email}</p>
          <p className='my-1 text-right'>
            <button
              type='button'
              onClick={(e) => addFriend(e, friendItem.userIdx)}
              className='p-2 text-sm font-semibold rounded-lg cursor-pointer bg-violet-100 text-violet-700 hover:bg-violet-300 whitespace-nowrap'
            >
              친구 추가하기
            </button>
          </p>
        </div>
      ))}
    </div>
  );
}

export default FriendAdd;
