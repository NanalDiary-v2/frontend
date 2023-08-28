import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios_api from '../../config/Axios';
import { onLogin } from '../../config/Login';
import FriendItem from '../friend/FriendItem';

function GroupSetting({ groupIdx, setGroupCompo }) {
  // const { state } = useLocation();
  const navigate = useNavigate();

  const [groupDetail, setGroupName] = useState('');
  const [groupTag, setGroupTag] = useState([]);

  const [friendList, setFriendList] = useState([{}]);

  const deleteGroup = (e) => {
    e.preventDefault();

    Swal.fire({
      // title: '그룹을 정말 나가실 건가요?',
      title: '그룹 나가기',
      text: '그룹을 정말 나가실 건가요?',
      icon: 'warning',
      reverseButtons: true, // 버튼 순서 거꾸로
      showCancelButton: true,
      confirmButtonColor: '#0891b2',
      cancelButtonColor: '#e11d48',
      confirmButtonText: '확인',
      cancelButtonText: '취소',
      width: '30%',
    }).then((result) => {
      if (result.isConfirmed) {
        // 확인(예) 버튼 클릭 시 이벤트
        axios_api
          .delete(`group/${groupIdx}`)
          .then(({ data }) => {
            console.log(data);
            if (data.statusCode === 200) {
              if (data.data.responseMessage === '그룹 탈퇴 성공') {
                Swal.fire({
                  title: '그룹 나가기',
                  text: '그룹을 탈퇴하셨습니다.',
                  icon: 'success',
                  confirmButtonColor: '#0891b2',
                  confirmButtonText: '확인',
                  width: '30%',
                }).then(() => {
                  navigate('/home');
                  window.location.reload();
                  // reload 해줘야 한당...
                });
              }
            } else {
              console.log('그룹 탈퇴 오류: ');
              console.log(data.statusCode);
              console.log(data.data.responseMessage);
            }
          })
          .catch(({ error }) => {
            console.log('그룹 탈퇴 오류: ' + error);
          });
      }
    });
  };

  useEffect(() => {
    onLogin();
    axios_api
      .get(`/group/${groupIdx}`)
      .then(({ data }) => {
        if (data.statusCode === 200) {
          setGroupName(null);
          setGroupTag(null);
          if (data.data.responseMessage === '그룹 조회 성공') {
            setGroupName(data.data.groupDetail);
            setGroupTag(data.data.tags);

            const groupidx = data.data.groupDetail.groupIdx;

            axios_api
              .get(`group/user/${groupidx}`)
              .then(({ data }) => {
                if (data.statusCode === 200) {
                  setFriendList(null);
                  if (data.data.responseMessage === '그룹 유저 조회 성공') {
                    setFriendList(data.data.groupUserList);
                  } else if (data.data.responseMessage === '데이터 없음') {
                    setFriendList(['아직은 친구가 없습니다.']);
                  }
                } else {
                  console.log('그룹 유저 조회 오류: ');
                  console.log(data.statusCode);
                  console.log(data.data.responseMessage);
                }
              })
              .catch(({ error }) => {
                console.log('그룹 유저 조회 오류: ' + error);
              });
          }
        } else {
          console.log(data.statusCode);
          console.log(data.data.responseMessage);
        }
      })
      .catch(({ error }) => {
        console.log('그룹 상세 보기 오류: ' + error);
      });
  }, []);

  return (
    <div className='justify-center text-center w-[500px] h-[420px] overflow-auto pr-2'>
      {/* <h1 className='text-center'>그룹 상세 페이지</h1> */}

      <div className='justify-center w-full my-2 text-center'>
        <div className='my-3'>
          <img
            src={groupDetail.imgUrl}
            className='inline-block p-1 rounded-md w-28 h-28'
          ></img>
          <p className='inline-block ml-5 text-2xl font-bold text-center'>
            {groupDetail.groupName}
          </p>
        </div>
        <div className='my-1 mb-2 break-words'>
          {groupTag.map((tagging, idx) => {
            return (
              <span
                key={idx}
                className='items-center inline-block p-1 mx-2 my-1 text-xs break-all rounded-lg bg-slate-200 hover:bg-blue-300'
              >
                #{tagging.tag}
              </span>
            );
          })}
        </div>
        <div className='flex justify-center'>
          <div
            onClick={() => setGroupCompo([false, false, false, false, true])}
          >
            <button className='bg-cyan-600 text-white px-2 py-1 rounded-3xl m-auto mx-5 inline-block'>
              수정하기
            </button>
          </div>
          <button
            type='button'
            className='bg-rose-600 text-white px-2 py-1 rounded-3xl m-auto mx-5 inline-block'
            onClick={deleteGroup}
          >
            탈퇴하기
          </button>
        </div>
        <hr className='mx-auto my-5 border-solid border-1 border-slate-800 w-80' />
      </div>

      {friendList[0] === '아직은 친구가 없습니다.' ? (
        <p>아직은 그룹에 친구가 없습니다.</p>
      ) : (
        <div>
          <p className='pb-2'>그룹에 가입된 친구 목록 입니다.</p>
          {friendList.map((friendItem, idx) => (
            <FriendItem key={idx} item={friendItem} />
          ))}
        </div>
      )}
    </div>
  );
}

export default GroupSetting;
