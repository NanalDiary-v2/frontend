import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import axios_api from '../../config/Axios';
import { onLogin } from '../../config/Login';
import DiaryList from '../diary/DiaryList';
import settingIcon from '../../src_assets/img/setting_icon.png';
import ballpenIcon from '../../src_assets/img/ballpen_icon.png';

function GroupDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [groupDetail, setGroupDetail] = useState('');
  const [groupTag, setGroupTag] = useState([]);

  useEffect(() => {
    onLogin();
    axios_api
      .get(`/group/${state.groupIdx}`)
      .then(({ data }) => {
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
  }, []);

  // 날짜를 'YYYY-MM-DD' 형태로 바꾸는 함수들
  const leftPad = (value) => {
    if (value >= 10) {
      return value;
    }
    return `0${value}`;
  };

  const toStringByFormatting = (value, delimeter = '-') => {
    const year = value.getFullYear();
    const month = leftPad(value.getMonth() + 1);
    const date = leftPad(value.getDate());

    return [year, month, date].join(delimeter);
  };

  return (
    <div className='text-center'>
      <Link
        to={`/Group/Setting`}
        state={{ groupIdx: groupDetail.groupIdx }}
        className='inline-block float-right'
      >
        <img src={settingIcon} className='w-[20px] h-[20px] mx-1.5' />
      </Link>
      <div>
        <p className='mb-1 text-2xl font-bold text-center'>
          {groupDetail.groupName}
        </p>

        {groupTag.map((tagging, idx) => {
          if (tagging.tag)
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
      {/* 일기쓰러가기 버튼 */}
      <img
        src={ballpenIcon}
        onClick={() =>
          navigate('/Diary/Create', {
            state: {
              groupIdx: state.groupIdx,
              curDate: toStringByFormatting(new Date()),
            },
          })
        }
        className='fixed z-50 flex w-10 p-1 cursor-pointer bottom-10 right-10'
      ></img>
      <hr className='mx-auto mt-5 border-dashed w-80 border-1 border-slate-400' />
      {/* 일기 리스트 */}
      <DiaryList isToggle={state.isToggle} groupIdx={state.groupIdx} />
    </div>
  );
}

export default GroupDetail;
