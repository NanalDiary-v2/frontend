import React, { useEffect, useState } from 'react';
import axios_api from '../../config/Axios';
import { onLogin } from '../../config/Login';
import DiaryList from '../diary/DiaryList';
import settingIcon from '../../src_assets/img/setting_icon.png';

function GroupDetail({ groupIdx, setGroupCompo }) {
  const [groupDetail, setGroupDetail] = useState('');
  const [groupTag, setGroupTag] = useState([]);
  // console.log('제일밖')

  useEffect(() => {
    onLogin();
    // console.log('밖')
    axios_api
      .get(`/group/${groupIdx}`)
      .then(({ data }) => {
        // console.log('안')
        // console.log(data.data);
        if (data.statusCode === 200) {
          setGroupDetail(null);
          setGroupTag(null);
          if (data.data.responseMessage === '그룹 조회 성공') {
            setGroupDetail(data.data.groupDetail);
            setGroupTag(data.data.tags);
          }
        } else {
          console.log(data.statusCode);
          console.log(data.data.responseMessage);
        }
      })
      .catch(({ error }) => {
        console.log('그룹 상세 보기 오류: ' + error);
      });
  }, [groupIdx]);

  return (
    <div className='absolute z-20 w-[720px] inset-y-20 -top-20 -left-40'>
      <div
        onClick={() => {
          setGroupCompo([false, false, false, true, false]);
        }}
      >
        <img src={settingIcon} className='w-[20px] h-[20px] mx-1.5' />
      </div>
      <div className='text-center'>
        <p className='mx-1 text-2xl font-bold'>{groupDetail.groupName}</p>
        {groupTag.map((tagging, idx) => {
          return (
            <span
              key={idx}
              className='inline-block p-1 mx-1 my-1 text-xs break-all rounded-lg bg-stone-200 hover:bg-blue-200'
            >
              #{tagging.tag}&nbsp;
            </span>
          );
        })}
      </div>
      {/* 일기 리스트 */}
      <DiaryList groupIdx={groupIdx} isToggle={2} />
    </div>
  );
}

export default GroupDetail;
