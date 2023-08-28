import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios_api from '../../config/Axios';
import { onLogin } from '../../config/Login';
import DiaryItem from './DiaryItem';

function DiaryList({
  isToggle,
  curDate,
  groupIdx,
  diarydate,
  changeHomeStateThree,
  setToday,
}) {
  const { state } = useLocation();
  const today = curDate;

  if (state !== null) {
    isToggle = state.isToggle;
  }

  const arrAxios = [
    `diary/list/date/${curDate}`,
    `diary/list/user`,
    `diary/list/${groupIdx}`,
  ];

  // 일기 데이터 받기
  const [diaryList, setDiaryList] = useState([]);
  // 해당 날짜의 일기 유무에 따라 보여질 화면 다름
  const [isShow, setIsShow] = useState(true);
  // console.log("무한 로딩")
  useEffect(() => {
    onLogin();
    axios_api
      .get(arrAxios[isToggle])
      .then(({ data }) => {
        if (data.statusCode === 200) {
          // 초기화 필요!
          setDiaryList(null);
          if (data.data.responseMessage === '일기 리스트 조회 성공') {
            setDiaryList(data.data.diary);

            if (data.data.diary.length !== 0) {
              setIsShow(true);
            } else {
              setIsShow(false);
            }
          }
        } else {
          console.log('일기 리스트 조회 오류: ');
          console.log(data.statusCode);
          console.log(data.data.responseMessage);
        }
      })
      .catch(({ error }) => {
        console.log('일기 리스트 불러오기 오류: ', error);
      });
  }, [groupIdx || curDate]);

  return (
    <div>
      {isToggle === 0 ? (
        isShow === true ? (
          <p className='text-2xl font-bold text-center'>
            {diaryList.length}개의 일기가 있습니다.
          </p>
        ) : (
          <div className='text-center'>
            <p className='mt-40 text-2xl font-bold'>
              {diarydate[0]}년 {diarydate[1]}월 {diarydate[2]}일의 일기는
              없습니다.
            </p>

            <div
              className='mt-5'
              onClick={() => {
                changeHomeStateThree();
                setToday(today);
              }}
            >
              <button className='p-2 text-lg font-bold text-center rounded-lg cursor-pointer right-20 bg-violet-100 text-violet-700 whitespace-nowrap'>
                일기 쓰러 가기
              </button>
            </div>
          </div>
        )
      ) : isToggle === 1 ? (
        <p className='my-5 text-2xl font-bold text-center'>
          내가 쓴 일기 개수는 총 {diaryList.length}개 입니다.
        </p>
      ) : (
        <></>
      )}
      <div className='my-2'>
        <div className='overflow-y-auto h-96'>
          {diaryList.map((diary) => (
            <DiaryItem
              key={diary.diaryIdx}
              isToggle={isToggle}
              groupIdx={groupIdx}
              {...diary}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
