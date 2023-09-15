import React, { useState, useEffect, useRef } from 'react';
import axios_api from '../config/Axios';
import { onLogin } from '../config/Login';
import Swal from 'sweetalert2';
import nmg from '../src_assets/img/bookmark-name/name-mark-green.svg';
import diaryImgGreen from '../src_assets/img/diary-img/diary-img-green.svg';
import spinner from '../src_assets/img/emotion/spinner.gif';

const DiaryNew = ({ today, changeHomeStateZero }) => {
  // 날짜, 일기, 그룹여부 데이터 받기
  const [date, setDate] = useState(today);
  const [content, setContent] = useState('');
  const [group, setGroup] = useState('개인');

  // 로딩 체크
  const [loaded, setLoaded] = useState(false);
  // 포커싱 기능
  const contentRef = useRef();

  // 리셋 함수
  const resetData = () => {
    setDate(today);
    setContent('');
    setGroup('개인');
  };

  // 작성완료 버튼 누르면 실행되는 함수 - axios 사용해서 백s엔드와 통신
  const handleSubmit = (e) => {
    e.preventDefault();
    // 유효성 검사 후 포커싱
    if (content.length < 2 || content.length > 300) {
      contentRef.current.focus();
      Swal.fire({
        icon: 'error', // Alert 타입
        title: '일기 저장 실패', // Alert 제목
        text: '일기는 300자 이하로 작성해주세요.', // Alert 내용
        width: '35%',
      });
      return;
    } else {
      setLoaded(true);
      onLogin();
      axios_api
        .post('diary', {
          // 날짜 데이터도 전달하기
          diaryDate: date,
          // 선택한 그룹은 배열 형태로 전달해야 함
          groupIdxList: checkedList,
          content: content,
        })
        .then(({ data }) => {
          if (data.statusCode === 200) {
            if (data.data.responseMessage === '일기 생성 성공') {
              const diaryIdx = data.data.diary.diaryIdx;

              setLoaded(false);

              axios_api
                .post('/notification/diary', {
                  request_diary_idx: diaryIdx,
                  request_group_idx: checkedList,
                })
                .then(({ data }) => {
                  if (data.statusCode === 200) {
                    if (data.data.responseMessage === '알림 저장 성공') {
                      // 저장 후 일기 데이터 초기화
                      setContent('');
                      setGroup('private');

                      Swal.fire({
                        icon: 'success',
                        text: '작성하신 일기가 작성 완료됐습니다.',
                        width: '35%',
                      });
                      changeHomeStateZero();
                    }
                  } else {
                    console.log('알림 저장 오류: ');
                    console.log(data.statusCode);
                    console.log(data.data.responseMessage);
                  }
                })
                .catch(({ error }) => {
                  console.log('알림 저장 오류: ' + error);
                });
            }
          } else {
            console.log('일기 생성 오류: ');
            console.log(data.statusCode);
            console.log(data.data.responseMessage);
          }
        })
        .catch(({ error }) => {
          console.log('일기 생성 오류: ', error);
        });
    }
  };

  // 체크된 그룹을 넣어줄 배열
  const [checkedList, setCheckedList] = useState([]);
  // input 태그가 체크된 경우 실행되는 함수
  const onChecked = (checked, id) => {
    if (checked) {
      setCheckedList([...checkedList, id]);
    } else {
      setCheckedList(checkedList.filter((el) => el !== id));
    }
  };

  // 그룹 리스트 데이터 가져오기
  const [groupList, setGroupList] = useState([]);

  useEffect(() => {
    onLogin();
    axios_api
      .get('group/list/0')
      .then(({ data }) => {
        if (data.statusCode === 200) {
          setGroupList(null);
          if (data.data.responseMessage === '그룹 리스트 조회 성공') {
            setGroupList(data.data.groupList);
          }
        } else {
          console.log('그룹 리스트 불러오기 오류: ');
          console.log(data.statusCode);
          console.log(data.data.responseMessage);
        }
      })
      .catch(({ error }) => {
        console.log('그룹 리스트 불러오기 오류: ' + error);
      });
  }, []);

  // 그룹 리스트 보여줄지 말지
  const [isShow, setShow] = useState(false);

  return (
    <div>
      {loaded ? (
        <>
          <div className='flex flex-col items-center justify-center h-screen'>
            <img src={spinner} alt='emotion_gif' className='w-32 h-32' />
            <p className='my-2 text-2xl font-bold animate-bounce text-rose-500'>
              달리가 그림을 만드는 중...
            </p>
          </div>
        </>
      ) : (
        <>
          <div className='absolute w-[1440px] mx-auto'>
            <p className='absolute z-30 left-[330px] inset-y-36'>일기쓰기</p>
            <img src={nmg} className='absolute z-20 left-60 inset-y-28' />
            <img
              src={diaryImgGreen}
              className='absolute w-[1280px] z-10 left-12 top-8'
            />

            {/* 그룹 여부 선택란 */}
            <div className='absolute z-20 mt-2 left-52 inset-y-56'>
              <p className='my-1 mb-2 text-xl font-bold'>공개 범위 설정</p>
              <input
                className='cursor-pointer'
                id='private'
                type='radio'
                value='개인'
                checked={group === '개인'}
                onChange={(e) => setGroup(e.target.value)}
                onClick={() => setShow(false)}
              />
              <label
                className='ml-2 mr-4 text-lg cursor-pointer'
                htmlFor='private'
              >
                개인
              </label>
              <input
                className='cursor-pointer'
                id='group'
                type='radio'
                value='그룹'
                checked={group === '그룹'}
                onChange={(e) => setGroup(e.target.value)}
                onClick={() => setShow(true)}
              />
              <label className='ml-2 text-lg cursor-pointer' htmlFor='group'>
                그룹
              </label>
              {isShow ? (
                <>
                  <div className='overflow-auto h-60'>
                    {groupList.map((groupItem, idx) => {
                      return (
                        <div
                          key={idx}
                          className='bg-[#F7F7F7] border-2 border-solid border-slate-400 rounded-lg m-1 mb-3 p-2 w-[200px]'
                        >
                          <label
                            htmlFor={groupItem.groupDetail.groupIdx}
                            className='mr-2 cursor-pointer'
                          >
                            {groupItem.groupDetail.groupName}
                          </label>
                          <input
                            className='cursor-pointer'
                            type='checkbox'
                            id={groupItem.groupDetail.groupIdx}
                            checked={
                              checkedList.includes(
                                groupItem.groupDetail.groupIdx
                              )
                                ? true
                                : false
                            }
                            onChange={(e) => {
                              onChecked(
                                e.target.checked,
                                groupItem.groupDetail.groupIdx
                              );
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>

            <div>
              <form className='absolute z-20 min-h-full mt-20 w-[720px] right-[200px] top-24'>
                {/* 날짜 선택란 */}
                <div className='text-xl'>
                  <input
                    className='p-2 my-1 text-xl rounded-lg cursor-pointer bg-slate-300/50'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    type='date'
                  />
                  {/* 일기 내용 작성란 */}
                  <div>
                    <textarea
                      className='w-full px-2 py-2 my-2 text-lg rounded-lg h-60 bg-slate-300/50'
                      placeholder='오늘의 하루는 어땠나요?'
                      name='content'
                      ref={contentRef}
                      value={content}
                      onChange={(e) => {
                        setContent(e.target.value);
                      }}
                    />
                  </div>
                </div>

                {/* 작성 취소 및 완료 버튼 */}
                <div className='relative flex justify-between px-1 pb-5'>
                  <input
                    className='hover:bg-slate-300 bg-slate-300/50 rounded-xl px-2.5 py-1 block font-bold cursor-pointer text-lg mt-4'
                    type='reset'
                    onClick={resetData}
                    value='초기화'
                  />
                  <button
                    className='hover:bg-cyan-600 bg-cyan-500 text-white px-2.5 py-1 rounded-xl block font-bold text-lg mt-4'
                    onClick={handleSubmit}
                  >
                    작성 완료
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DiaryNew;
