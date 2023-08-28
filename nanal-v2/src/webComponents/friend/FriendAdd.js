import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios_api from '../../config/Axios';
import { onLogin } from '../../config/Login';

function FriendAdd() {
  const [friendList, setFriendList] = useState([]);

  const searchFriend = (e) => {
    e.preventDefault();
    const userIdx = e.target.searchId.value;

    axios_api
      .get(`search/user/${userIdx}`)
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
              title: '친구 추가',
              icon: 'success', // Alert 타입
              text: '요청이 완료되었습니다!', // Alert 내용
              width: '35%',
            })
            //   .then(function () {
            //   window.location.reload(true);
            // });
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
    <div className="w-84 h-[430px] overflow-auto">
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
