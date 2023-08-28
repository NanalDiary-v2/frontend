import React, { useState } from 'react';
import nmr from '../src_assets/img/bookmark-name/name-mark-red.svg';
import diaryImgRed from '../src_assets/img/diary-img/diary-img-red.svg';
import Calendar from 'react-calendar';
import DiaryList from '../webComponents/diary/DiaryList';
import '../src_assets/css/Calendar.css';

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

const MyDiary = ({ changeHomeStateThree, setToday }) => {
  const [value, onChange] = useState(new Date());
  const checkedDate = toStringByFormatting(value);
  const diarydate = checkedDate.split('-');

  return (
    <div className='absolute w-[1440px] mx-auto'>
      <div className='absolute z-20 border-none inset-y-60 left-36'>
        <Calendar
          onChange={onChange}
          value={value}
          calendarType='ISO 8601'
          formatDay={(locale, date) =>
            date.toLocaleString('en', { day: 'numeric' })
          }
        />
      </div>
      <p className='absolute z-30 left-[330px] inset-y-36'>내 일기</p>
      <img src={nmr} alt='bg' className='absolute z-20 left-60 inset-y-28' />
      <img
        src={diaryImgRed}
        alt='bg'
        className='absolute w-[1280px] z-10 left-12 top-8'
      />

      <div className='absolute z-20 w-[720px] inset-y-32 right-40'>
        <DiaryList
          isToggle={0}
          curDate={checkedDate}
          diarydate={diarydate}
          changeHomeStateThree={changeHomeStateThree}
          setToday={setToday}
        />
      </div>
    </div>
  );
};

export default MyDiary;
