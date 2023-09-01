import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios_api from '../../config/Axios';
import { onLogin } from '../../config/Login';
import { BrowserView, MobileView } from 'react-device-detect';
import { isMobile } from 'react-device-detect';

function FriendDetail(userIdx) {
  const { state } = useLocation();

  const [friend, setFriend] = useState([]);
  const [imgList, setImgList] = useState([]);

  const userId = isMobile ? state.friendIdx : userIdx.userIdx;

  useEffect(() => {
    onLogin();

    axios_api
      .get(`/friend/${userId}`)
      .then(({ data }) => {
        if (data.statusCode === 200) {
          setFriend(null);
          if (data.data.responseMessage === '친구 조회 성공') {
            setFriend(data.data.friend);
            setImgList(data.data.diary);
          }
        } else {
          console.log('친구 상세 보기 오류: ');
          console.log(data.statusCode);
          console.log(data.data.responseMessage);
        }
      })
      .catch(({ error }) => {
        console.log('친구 상세 보기 오류: ' + error);
      });
  }, []);

  return (
    <div>
      <MobileView>
        <div>
          <div>
            <div className='flex mt-5 justify-evenly'>
              <img
                src={friend.img}
                className='p-1 rounded-full w-28 h-28'
              ></img>
              <div className='p-1 my-auto font-bold'>
                <p className=''>
                  <span className='mr-1.5 text-2xl'>{friend.nickname}</span>
                  <span>님의</span>
                </p>
                <p className='my-0.5'>일기장</p>
              </div>
            </div>
            <div className='flex justify-between p-1 my-3'>
              <p>{friend.introduction}</p>
            </div>
          </div>
          <hr className='my-2 border-dashed border-slate-400/75 w-65' />
          <div className=''>
            {imgList.map((image) => {
              return (
                <img
                  src={image.imgUrl}
                  key={image.diaryIdx}
                  alt='FriendDiary'
                  className='inline-block m-1 mx-1.5 rounded-lg w-[102px]'
                ></img>
              );
            })}
          </div>
        </div>
      </MobileView>
      <BrowserView>
        <div>
          <div className='flex mt-5 justify-evenly'>
            <img
              src={friend.img}
              className='p-1 rounded-full w-28 h-28'
              alt='friend-img'
            ></img>
            <div className='p-1 my-auto font-bold'>
              <p className=''>
                <span className='mr-1.5 text-2xl'>{friend.nickname}</span>
                <span>님의</span>
              </p>
              <p className='my-0.5'>일기장</p>
            </div>
          </div>
          <div className='flex justify-between my-3'>
            <p>{friend.introduction}</p>
          </div>
          <hr className='my-2 border-dashed border-slate-400/75 w-65' />
          <div className='h-56 overflow-auto'>
            {imgList.map((image) => {
              return (
                <img
                  src={image.imgUrl}
                  key={image.diaryIdx}
                  alt='FriendDiary'
                  className='inline-block m-1 mx-1.5 rounded-lg w-[102px]'
                />
              );
            })}
          </div>
        </div>
      </BrowserView>
    </div>
  );
}

export default FriendDetail;
