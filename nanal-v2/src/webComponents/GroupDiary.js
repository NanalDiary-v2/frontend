import nmo from '../src_assets/img/bookmark-name/name-mark-orange.svg';
import diaryImgOrange from '../src_assets/img/diary-img/diary-img-orange.svg';
import React, { useState } from 'react';
import GroupList from './group/GroupList';
import GroupCreate from './group/GroupCreate';
import GroupDetail from './group/GroupDetail';
import GroupSetting from './group/GroupSetting';
import GroupUpdate from './group/GroupUpdate';

const GroupDiary = () => {
  const [groupCompo, setGroupCompo] = useState([
    true,
    false,
    false,
    false,
    false,
  ]);
  const [groupIdx, setGroupIdx] = useState();

  return (
    <div className='absolute w-[1440px] mx-auto'>
      <p className='absolute z-30 left-[330px] inset-y-36'>그룹일기</p>
      <img src={nmo} className='absolute z-20 left-60 inset-y-28' />
      <img
        src={diaryImgOrange}
        className='absolute w-[1280px] z-10 left-12 top-8'
      />
      <div className='absolute z-20 left-36 inset-y-[216px]'>
        <GroupList setGroupCompo={setGroupCompo} setGroupIdx={setGroupIdx} />
      </div>
      {groupCompo[0] === true ? (
        <div className='absolute z-20 right-[360px] inset-y-72'>
          <p>선택된 메뉴가 없습니다.</p>
          <p>좌측에서 메뉴를 선택해 주세요.</p>
        </div>
      ) : groupCompo[1] === true ? (
        <div className='absolute z-20 right-80 inset-y-[120px] w-[400px]'>
          <GroupCreate
            setGroupCompo={setGroupCompo}
            setGroupIdx={setGroupIdx}
          />
        </div>
      ) : groupCompo[2] === true ? (
        <div className='absolute z-20 right-80 inset-y-52 w-[400px]'>
          {/* <p>hihihihi</p> */}
          <GroupDetail groupIdx={groupIdx} setGroupCompo={setGroupCompo} />
        </div>
      ) : groupCompo[3] === true ? (
        <div className='absolute z-20 right-60 inset-y-28'>
          <GroupSetting groupIdx={groupIdx} setGroupCompo={setGroupCompo} />
        </div>
      ) : groupCompo[4] === true ? (
        <div className='absolute z-20 right-40 inset-y-28 w-[600px]'>
          <GroupUpdate groupIdx={groupIdx} setGroupCompo={setGroupCompo} />
        </div>
      ) : (
        <div className='absolute z-20 right-[360px] inset-y-72'>
          <p>선택된 메뉴가 없습니다.</p>
          <p>좌측에서 메뉴를 선택해 주세요.</p>
          <p>좌측에서 메뉴를 선택해 주세요.</p>
        </div>
      )}
    </div>
  );
};

export default GroupDiary;
