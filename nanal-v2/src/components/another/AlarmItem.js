import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios_api from '../../config/Axios';

// 친구 등록 = friend
// 그룹 초대 = group/join
// 새 글 알림 = 해당 글로 이동
// 새 댓글 알림 = 해달 글로 이동

function AlarmItem({
  content,
  noticeType,
  requestDiaryIdx,
  requestGroupIdx,
  requestUserIdx,
  noticeIdx,
}) {
  // 새 글이나 댓글은 해당 글로 이동 시켜줘야함.
  let navigate = useNavigate();

  // 친구 등록 성공.
  const addFriend = () => {
    axios_api
      .post('friend', {
        friendIdx: requestUserIdx,
      })
      .then(({ data }) => {
        if (data.statusCode === 200) {
          if (data.data.responseMessage === '친구 등록 성공') {
            checkAlarm(0);
            // Swal.fire({
            //   icon: 'success', // Alert 타입
            //   text: '친구 등록에 수락했어요!', // Alert 내용
            //   width: '65%',
            // }).then(function () {
            //   window.location.reload(true);
            // });
            // navigate(`/Friend/List`);
          } else if (data.data.responseMessage === '이미 친구로 등록됨') {
            checkAlarm();
            Swal.fire({
              icon: 'info', // Alert 타입
              text: '이미 친구에요!', // Alert 내용
              width: '65%',
            }).then(function () {
              window.location.reload(true);
            });
          }
        } else {
          console.log('친구 등록 오류: ');
          console.log(data.statusCode);
          console.log(data.data.responseMessage);
        }
      })
      .catch(({ error }) => {
        console.log('친구 등록 오류: ' + error);
      });
  };

  //그룹 초대 성공.
  const addGroup = () => {
    axios_api
      .post('group/join', {
        groupIdx: requestGroupIdx,
      })
      .then(({ data }) => {
        if (data.statusCode === 200) {
          if (data.data.responseMessage === '그룹 가입 성공') {
            checkAlarm(1);
            // Swal.fire({
            //   icon: 'success', // Alert 타입
            //   text: '그룹 가입에 수락했어요!', // Alert 내용
            //   width: '65%',
            // }).then(function () {
            //   window.location.reload(true);
            // });
            // navigate(`/Group/List`);
          } else if (data.data.responseMessage === '이미 가입한 그룹') {
            checkAlarm();
            Swal.fire({
              icon: 'info', // Alert 타입
              text: '이미 처리된 사항이에요!', // Alert 내용
              width: '65%',
            }).then(function () {
              //window.location.reload(true);
            });
          }
        } else {
          console.log('그룹 가입 오류: ');
          console.log(data.statusCode);
          console.log(data.data.responseMessage);
        }
      })
      .catch(({ error }) => {
        console.log('그룹 가입 오류: ' + error);
      });
  };

  //알람 읽음 처리
  const checkAlarm = (index) => {
    axios_api
      .get(`notification/${noticeIdx}`)
      .then(({ data }) => {
        if (data.statusCode === 200) {
          if (data.data.responseMessage === '알림 조회 성공') {
            if (index === 0) {
              Swal.fire({
                icon: 'success', // Alert 타입
                text: '친구 등록에 수락했어요!', // Alert 내용
                width: '80%',
              }).then(function () {
                window.location.reload(true);
              });
            } else if (index === 1) {
              Swal.fire({
                icon: 'success', // Alert 타입
                text: '그룹 가입에 수락했어요!', // Alert 내용
                width: '80%',
              }).then(function () {
                window.location.reload(true);
              });
            } else {
              window.location.reload(true);
            }
          }
        } else {
          console.log('알림 조회 오류: ');
          console.log(data.statusCode);
          console.log(data.data.responseMessage);
        }
      })
      .catch(({ error }) => {
        console.log('알림 조회 오류: ' + error);
      });
  };

  //알람 읽음 처리 후 해당 글로.
  const linkedDiary = (e) => {
    axios_api
      .get(`notification/${noticeIdx}`)
      .then(({ data }) => {
        if (data.statusCode === 200) {
          if (data.data.responseMessage === '알림 조회 성공') {
            navigate('/Diary/Detail', {
              state: {
                diaryIdx: requestDiaryIdx,
                groupIdx: requestGroupIdx,
                isToggle: 2,
              },
              replace: true,
            });
          }
        } else {
          console.log('알림 읽음 처리 오류: ');
          console.log(data.statusCode);
          console.log(data.data.responseMessage);
        }
      })
      .catch(({ error }) => {
        console.log('알림 읽음 처리 오류: ' + error);
      });
  };

  if (noticeType === 0) {
    return (
      <div className='mb-3'>
        <hr className='my-1 border-dashed border-stone-800' />
        <div className='my-1 text-left'>
          <p>
            <span className='mr-2 font-bold'>[친구 초대]</span>
            {/* <span className='border-b-[#b0e0e6] border-solid border-b-2 shadow-[#b0e0e6]'> */}
            <span className='rounded-md bg-gradient-to-t from-yellow-200'>
              {content}
            </span>
            <span className='mr-2'>님으로부터</span>
            <span className='mr-2 rounded-md bg-gradient-to-t from-green-100'>
              친구 등록
            </span>
            <span className='mr-2'>요청이에요.</span>
          </p>
          {/* <button className='grid content-start'>X</button> */}
        </div>
        <div className='flex justify-end'>
          <button
            onClick={() => {
              addFriend();
              // checkAlarm();
            }}
            className='bg-cyan-500 text-white px-2.5 py-1 rounded-3xl m-auto mx-3 inline-block'
          >
            수락
          </button>
          <button
            type='button'
            onClick={checkAlarm}
            className='bg-rose-500 text-white px-2.5 py-1 rounded-3xl m-auto mx-3 inline-block'
          >
            거절
          </button>
        </div>
      </div>
    );
  } else if (noticeType === 1) {
    let content_text = content.split(',');
    return (
      <div className='my-3'>
        <hr className='my-2 border-dashed border-stone-800' />
        <div className='my-1 text-left'>
          <p>
            <span className='mr-2 font-bold'>[그룹 초대]</span>
            <span className='rounded-md bg-gradient-to-t from-yellow-200'>
              {content_text[0]}
            </span>
            <span className='mr-2'>님이</span>
            <span className='mr-2 rounded-md bg-gradient-to-t from-green-100'>
              {content_text[1]}
            </span>
            <span className='mr-2'>그룹 일기장에</span>
            <span className='mr-2'>초대했어요.</span>
          </p>
          {/* <button className='grid content-start'>X</button> */}
        </div>
        <div className='flex justify-end'>
          <button
            onClick={() => {
              addGroup();
              // checkAlarm();
            }}
            className='bg-cyan-500 text-white px-2.5 py-1 rounded-3xl m-auto mx-3 inline-block'
          >
            수락
          </button>
          <button
            type='button'
            onClick={checkAlarm}
            className='bg-rose-500 text-white px-2.5 py-1 rounded-3xl m-auto mx-3 inline-block'
          >
            거절
          </button>
        </div>
      </div>
    );
  } else if (noticeType === 2) {
    let content_text = content.split(',');
    return (
      <div className='my-3'>
        <hr className='my-2 border-dashed border-stone-800' />
        <div className='my-1 text-left'>
          <p>
            <span className='mr-2 font-bold'>[새글 알림]</span>
            <span className='rounded-md bg-gradient-to-t from-yellow-200'>
              {content_text[0]}
            </span>
            <span className='mr-2'>님이</span>
            <span className='mr-2 rounded-md bg-gradient-to-t from-green-100'>
              {content_text[1]}
            </span>
            <span className='mr-2'>그룹에</span>
            <span className='mr-2'>새 글을</span>
            <span className='mr-2'>등록했어요.</span>
          </p>
        </div>
        <div className='flex justify-end'>
          <button
            onClick={checkAlarm}
            className='bg-teal-500 text-white px-2.5 py-1 rounded-3xl m-auto mx-3 inline-block'
          >
            확인
          </button>
          <button
            onClick={linkedDiary}
            className='bg-teal-500 text-white px-2.5 py-1 rounded-3xl m-auto mx-3 inline-block'
          >
            바로가기
          </button>
        </div>
      </div>
    );
  } else if (noticeType === 3) {
    let content_text = content.split(',');
    return (
      <div className='my-3'>
        <hr className='my-2 border-dashed border-stone-800' />
        <div className='my-1 text-left'>
          <p>
            <span className='mr-2 font-bold'>[댓글 알림]</span>
            <span className='rounded-md bg-gradient-to-t from-yellow-200'>
              {content_text[0]}
            </span>
            <span className='mr-2'>님의</span>
            <span className='mr-2'>일기에</span>
            <span className='rounded-md bg-gradient-to-t from-green-200'>
              {content_text[1]}
            </span>
            <span className='mr-2'>님이</span>
            <span className='mr-2'>새 댓글을</span>
            <span className='mr-2'>작성했어요.</span>
          </p>
          {/* <button className='grid content-start'>X</button> */}
        </div>
        <div className='flex justify-end'>
          <button
            onClick={checkAlarm}
            className='bg-teal-500 text-white px-2.5 py-1 rounded-3xl m-auto mx-3 inline-block'
          >
            확인
          </button>
          <button
            onClick={linkedDiary}
            className='bg-teal-500 text-white px-2.5 py-1 rounded-3xl m-auto mx-3 inline-block'
          >
            바로가기
          </button>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

export default AlarmItem;
