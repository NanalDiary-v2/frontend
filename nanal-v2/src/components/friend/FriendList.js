import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios_api from '../../config/Axios';
import { onLogin } from '../../config/Login';
import FriendItem from './FriendItem';
import addIcon from '../../src_assets/img/user_add_icon.png';
import { BrowserView, MobileView } from 'react-device-detect';

function FriendList({ setFriendAdd, setUserIdx }) {
  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    onLogin();
    axios_api
      .get(`friend/list`)
      .then(({ data }) => {
        if (data.statusCode === 200) {
          setFriendList(null);
          if (data.data.responseMessage === '친구 리스트 조회 성공') {
            setFriendList(data.data.friendList);
          } else if (data.data.responseMessage === '데이터 없음') {
            // setFriendList(['아직은 친구가 없습니다.']);
            setFriendList([]);
          }
        } else {
          console.log('친구 리스트 조회 오류: ');
          console.log(data.statusCode);
          console.log(data.data.responseMessage);
        }
      })
      .catch(({ error }) => {
        console.log('친구 리스트 조회 오류: ' + error);
      });
  }, []);

  return (
    <div>
      <MobileView>
        <div>
          <div id='friend-list-title' className='mb-3'>
            <h1 className='inline m-1 font-bold'>친구 리스트 조회</h1>
            {/* <Link to='/Friend/Add'>
        <button type='button'>친구 추가하기</button>
      </Link> */}
            <Link to='/Friend/Add' className='inline-block float-right'>
              <img src={addIcon} className='w-[20px] h-[20px] mx-1.5' />
            </Link>
          </div>
          {friendList && friendList.length !== 0 ? (
            friendList.map((friendItem) => (
              <FriendItem key={friendItem.userIdx} item={friendItem} />
            ))
          ) : (
            <p className='text-lg text-center '>아직은 친구가 없습니다.</p>
          )}
        </div>
      </MobileView>
      <BrowserView>
        <div className='overflow-auto w-80 h-80'>
          <div id='friend-list-title' className='mb-2'>
            <h1 className='inline m-1 ml-2 font-bold'>친구 리스트 조회</h1>
            <div
              className='inline-block float-right'
              onClick={() => setFriendAdd([false, true, false])}
            >
              <img
                src={addIcon}
                className='w-[20px] h-[20px] mx-1.5'
                alt='add-icon'
              />
            </div>
          </div>
          {friendList.length !== 0 ? (
            friendList.map((friendItem) => (
              <FriendItem
                key={friendItem.userIdx}
                item={friendItem}
                setFriendAdd={setFriendAdd}
                setUserIdx={setUserIdx}
              />
            ))
          ) : (
            <p>아직은 친구가 없습니다.</p>
          )}
        </div>
      </BrowserView>
    </div>
  );
}

export default FriendList;
