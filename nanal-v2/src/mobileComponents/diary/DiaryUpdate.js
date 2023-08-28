import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios_api from '../../config/Axios';
import { onLogin } from '../../config/Login';
import Swal from 'sweetalert2';
import spinner from '../../src_assets/img/emotion/spinner.gif';

function DiaryUpdate() {
  const location = useLocation();
  const [group, setGroup] = useState('개인');
  const navigate = useNavigate();

  // 수정된 날짜, 일기, 기존 그룹 리스트 데이터
  const [localDate, setLocalDate] = useState(
    location.state.diaryDetail.diaryDate
  );
  const [localContent, setLocalContent] = useState(
    location.state.diaryDetail.content
  );
  const localConetRef = useRef();

  // 체크된 그룹을 넣어줄 배열
  const originGroupList = location.state.originGroupList;
  const [checkedList, setCheckedList] = useState(originGroupList);

  // 수정 취소 버튼 클릭 시 실행되는 함수
  const handleQuitEdit = () => {
    // setLocalDate(location.state.diaryDate);
    // setLocalContent(location.state.diaryDetail.content);
    // navigate(-1);
    navigate('/Diary/Detail', {
      state: {
        diaryIdx: location.state.diaryDetail.diaryIdx,
        diarydate: changeDate,
        groupIdx: location.state.groupIdx,
        isToggle: location.state.isToggle,
      },
      replace: true,
    });
  };

  const changeDate = localDate.split('-');
  // 로딩 체크
  const [loaded, setLoaded] = useState(false);

  // 수정 버튼 클릭 시 실행되는 함수
  const updateDiary = () => {
    // 유효성 검사 후 포커싱
    if (localContent.length < 2 || localContent.length > 300) {
      localConetRef.current.focus();
      Swal.fire({
        icon: 'error', // Alert 타입
        title: '일기 수정 실패', // Alert 제목
        text: '일기는 2자 이상 300자 이하로 작성해주세요.', // Alert 내용
      });
      return;
    } else {
      setLoaded(true);
      onLogin();
      axios_api
        .put('diary', {
          diaryIdx: location.state.diaryDetail.diaryIdx,
          content: localContent,
          diaryDate: localDate,
          groupIdxList: checkedList,
        })
        .then(({ data }) => {
          if (data.statusCode === 200) {
            if (data.data.responseMessage === '일기 수정 성공') {
              setLoaded(false);
              navigate('/Diary/Detail', {
                state: {
                  diaryIdx: location.state.diaryDetail.diaryIdx,
                  diarydate: changeDate,
                  groupIdx: location.state.groupIdx,
                  isToggle: location.state.isToggle,
                },
                replace: true,
              });
            }
          } else {
            console.log('일기 수정 오류: ');
            console.log(data.statusCode);
            console.log(data.data.responseMessage);
          }
        })
        .catch(({ error }) => {
          console.log('일기 수정 오류: ' + error);
        });
    }
  };

  // input 태그가 체크된 경우 실행되는 함수 = 다중 선택 가능
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
            if (checkedList.length !== 0) {
              setGroup('그룹');
              setShow(true);
            }
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
    <div className='h-auto min-h-full pb-5'>
      <div>
        {loaded ? (
          <>
            <div className='flex flex-col justify-center items-center w-[344px] h-screen'>
              <img src={spinner} alt='emotion_gif' className='w-16 h-16' />
              <p className='my-2 text-xl font-bold animate-bounce text-rose-500'>
                달리가 그림을 만드는 중...
              </p>
            </div>
          </>
        ) : (
          <>
            <h2 className='my-5 text-lg font-bold text-center'>
              일기 수정하기
            </h2>
            {/* 날짜 선택란 */}
            <div>
              <input
                className='p-2 rounded-lg cursor-pointer bg-slate-300/50'
                value={localDate}
                onChange={(e) => setLocalDate(e.target.value)}
                type='date'
              />
              {/* 일기 내용 작성란 */}
              <div>
                <textarea
                  className='w-full h-40 px-2 py-2 my-2 rounded-lg bg-slate-300/50'
                  name='content'
                  ref={localConetRef}
                  value={localContent}
                  onChange={(e) => {
                    setLocalContent(e.target.value);
                  }}
                />
              </div>
            </div>
            {/* 그룹 여부 선택란 */}
            <div className='mt-2'>
              <h4 className='my-2 text-lg font-bold'>공개 범위 설정</h4>
              <input
                className='cursor-pointer'
                id='private'
                type='radio'
                value='개인'
                checked={group === '개인'}
                onChange={(e) => setGroup(e.target.value)}
                onClick={() => {
                  setShow(false);
                  setCheckedList([]);
                }}
              />
              <label className='ml-2 mr-4 cursor-pointer' htmlFor='private'>
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
              <label className='ml-2 cursor-pointer' htmlFor='group'>
                그룹
              </label>
              <div className='flex flex-wrap justify-between'>
                {isShow ? (
                  <>
                    {groupList.map((groupItem, idx) => {
                      return (
                        <div
                          key={idx}
                          className='bg-[#F7F7F7] border-2 border-solid border-slate-400 rounded-lg m-1 mb-3 p-2 w-[47%]'
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
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
            {/* 수정 취소 및 수정 완료 버튼 */}
            <footer className='relative flex justify-between px-1 pb-5 translate-y-full'>
              <button
                className='hover:bg-slate-300 bg-slate-300/50 rounded-xl px-2.5 py-1 block'
                onClick={handleQuitEdit}
              >
                수정 취소
              </button>
              <button
                className='hover:bg-sky-700 bg-cyan-600 text-white px-2.5 py-1 rounded-xl block'
                onClick={updateDiary}
              >
                수정 완료
              </button>
            </footer>
          </>
        )}
      </div>
    </div>
  );
}

export default DiaryUpdate;
