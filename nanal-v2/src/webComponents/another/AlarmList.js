import React, { useEffect, useState } from 'react';
import axios_api from '../../config/Axios';
import { onLogin } from '../../config/Login';
import AlarmItem from './AlarmItem';

function AlarmList({ setUseAlarm, toggleAlarmMenu }) {
  const [isAlarmList, setIsAlarmList] = useState([]);

  // DB에서 알람 리스트 다 땡겨와야함.
  // noticeType
  // 0 : 친구 초대
  // 1 : 그룹 초대
  // 2 : 새 글
  // 3 : 새 댓글
  useEffect(() => {
    onLogin();
    axios_api
      .get('notification')
      .then(({ data }) => {
        if (data.statusCode === 200) {
          setIsAlarmList(null);
          if (data.data.responseMessage === '알림 조회 성공') {
            setIsAlarmList(data.data.notice);
          }
        } else {
          console.log('알림 리스트 조회 오류: ');
          console.log(data.statusCode);
          console.log(data.data.responseMessage);
        }
      })
      .catch(({ error }) => {
        console.log('알림 리스트 조회 오류: ' + error);
      });
  }, []);

  useEffect(() => {
    if (isAlarmList.length > 0) {
      setUseAlarm(true);
    } else {
      setUseAlarm(false);
    }
  }, [isAlarmList]);

  //알람은 최근 30일 것까지만...
  return (
    <div className='w-full text-center'>
      <p className='mx-auto my-5 text-xl font-bold text-center'>알람 목록 🔔</p>
      <div className='grid justify-center grid-cols-1'>
        {isAlarmList.length === 0 ? (
          <div className='my-4 text-lg'>
            <p>도착한 알림이 없어요!</p>
          </div>
        ) : (
          <div className='mx-1'>
            {isAlarmList.map((ar) => (
              <AlarmItem
                key={ar.noticeIdx}
                toggleAlarmMenu={toggleAlarmMenu}
                {...ar}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AlarmList;
