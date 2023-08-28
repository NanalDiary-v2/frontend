import React, { useState } from 'react';
import nmy from '../src_assets/img/bookmark-name/name-mark-yellow.svg';
import diaryImgYellow from '../src_assets/img/diary-img/diary-img-yellow.svg';
import FList from './friend/FriendList';
import FriendAdd from './friend/FriendAdd';
import FriendDetail from './friend/FriendDetail';

const FriendList = () => {
  const [friendCompo, setFriendCompo] = useState([true, false, false]);
  const [userIdx, setUserIdx] = useState();

  return (
    <div className='absolute w-[1440px] mx-auto'>
      <p className='absolute z-30 left-[330px] inset-y-36'>친구 목록</p>
      <img src={nmy} className='absolute z-20 left-60 inset-y-28' />
      <img
        src={diaryImgYellow}
        className='absolute w-[1280px] z-10 left-12 top-8'
      />
      <div className='absolute z-20 left-36 inset-y-[216px]'>
        <FList setFriendAdd={setFriendCompo} setUserIdx={setUserIdx} />
      </div>
      {friendCompo[0] === true ? (
        <div className='absolute z-20 right-[360px] inset-y-72'>
          <p>선택된 메뉴가 없습니다.</p>
          <p>좌측에서 메뉴를 선택해 주세요.</p>
        </div>
      ) : friendCompo[1] === true ? (
        <div className='absolute z-20 right-80 inset-y-[104px]'>
          <FriendAdd />
        </div>
      ) : friendCompo[2] === true ? (
        <div className='absolute z-20 right-72 inset-y-28 w-[400px]'>
          <FriendDetail userIdx={userIdx} />
        </div>
      ) : (
        <div className='absolute z-20 right-[360px] inset-y-72'>
          <p>선택된 메뉴가 없습니다.</p>
          <p>좌측에서 메뉴를 선택해 주세요.</p>
        </div>
      )}
    </div>
  );
};

export default FriendList;
