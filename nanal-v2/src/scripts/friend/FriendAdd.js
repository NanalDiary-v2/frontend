import { useState } from 'react';
import axios_api from '../../config/Axios';
import Swal from 'sweetalert2';

function FriendAddScript() {
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
}

export default FriendAddScript;
