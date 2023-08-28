import React, { useEffect, useState } from 'react';
import axios_api from '../../config/Axios';
import { onLogin } from '../../config/Login';
import DiaryItem from '../diary/DiaryItem';

function SearchList() {
  const [searchList, setSearchList] = useState([]);

  const searchDiary = (e) => {
    e.preventDefault();
    const content = e.target.searchDiary.value;

    axios_api
      .get(`search/diary/${content}`)
      .then(({ data }) => {
        if (data.statusCode === 200) {
          if (data.data.responseMessage === '일기 조회 성공') {
            setSearchList(data.data.diaryInfo);
            // console.log(data.data.diaryInfo);
          } else {
            console.log('일기 조회 오류 : ');
            console.log(data.statusCode);
            console.log(data.data.responseMessage);
          }
        }
      })
      .catch(({ error }) => {
        console.log('일기 조회 오류 : ' + error);
      });
  };

  useEffect(() => {
    onLogin();
  }, []);

  return (
    <div>
      <p className='box-border flex justify-around h-20 p-4 w-70'>
        찾고자 하는 일기의 내용을 <br />
        입력 후 검색해주세요
      </p>
      <form
        onSubmit={searchDiary}
        className='grid grid-cols-2 m-auto h-18 w-70'
      >
        <input
          type='text'
          id='searchDiary'
          className='pl-2 rounded-lg w-full h-18 m-auto'
        ></input>
        <button type='submit' className='w-16 h-18 m-auto'>
          검색하기
        </button>
      </form>
      <hr className='mx-auto my-5 text-center border-dashed border-1 border-slate-800 w-80' />
      <div>
        {searchList &&
          searchList.map((diary, idx) => (
            <DiaryItem
              key={idx}
              isToggle={3}
              groupIdx={diary.groupIdx}
              {...diary}
            />
          ))}
      </div>
    </div>
  );
}

export default SearchList;
