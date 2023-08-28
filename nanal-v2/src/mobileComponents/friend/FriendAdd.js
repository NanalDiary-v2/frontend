import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios_api from '../../config/Axios';
import { onLogin } from '../../config/Login';

function FriendAdd() {
  const [friendList, setFriendList] = useState([]);

  const searchFriend = (e) => {
    e.preventDefault();
    const userId = e.target.searchId.value;

    axios_api
      .get(`search/user/${userId}`)
      .then(({ data }) => {
        if (data.statusCode === 200) {
          if (data.data.responseMessage === '친구 조회 성공') {
            // console.log(data.data.userInfo);
            setFriendList(data.data.userInfo);
          } else {
            console.log('친구 조회 오류 : ');
            console.log(data.statusCode);
            console.log(data.data.responseMessage);
          }
        }
      })
      .catch(({ error }) => {
        console.log('친구 조회 오류 : ' + error);
      });
  };

  const addFriend = (e, useridx) => {
    e.preventDefault();

    axios_api
      .post(`notification/friend`, { userIdx: [useridx] })
      .then(({ data }) => {
        if (data.statusCode === 200) {
          if (data.data.responseMessage === '알림 저장 성공') {
            Swal.fire({
              icon: 'success', // Alert 타입
              text: '친구 추가를 요청했어요!', // Alert 내용
              width: '80%',
            }).then(function () {
              window.location.reload(true);
            });
          } else {
            console.log('친구 추가 알림 저장 오류 : ');
            console.log(data.statusCode);
            console.log(data.data.responseMessage);
          }
        }
      })
      .catch(({ error }) => {
        console.log('친구 추가 알림 저장 오류 : ' + error);
      });
  };

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
          className='pl-2 rounded-lg w-full h-18 m-auto'
        />
        <button type='submit' className='w-16 h-18 m-auto'>
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
