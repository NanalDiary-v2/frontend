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
    <div className='w-84 h-[430px] overflow-auto'>
      <p className='box-border flex justify-around h-20 p-4 w-70'>
        찾고자 하는 친구의 아이디를 <br />
        입력 후 검색해주세요
      </p>
      <form
        onSubmit={searchFriend}
        className='flex justify-around p-1 h-18 w-70'
      >
        <input type='text' id='searchId'></input>
        <button type='submit'>검색하기</button>
      </form>
      <hr className='my-5 border-solid border-1 border-slate-800 w-80' />
      {friendList.map((friendItem) => (
        <div key={friendItem.userIdx} className='my-2'>
          <p className='font-semibold'>친구의 </p>
          <p>닉네임 : {friendItem.userId}</p>
          <p>이메일 : {friendItem.email}</p>
          <p className='text-right'>
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
      <div></div>
    </div>
  );
}

export default FriendAdd;
