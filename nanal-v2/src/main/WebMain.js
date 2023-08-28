import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { getCookie } from '../config/Cookie';
import Etc from '../webComponents/Etc';
import LogoHome from '../webComponents/LogoHome';
import MyDiary from '../webComponents/MyDiary';
import GroupDiary from '../webComponents/GroupDiary';
import FriendList from '../webComponents/FriendList';
import DiaryNew from '../webComponents/DiaryNew';
import SignUp from '../webComponents/account/SignUp';
import SignIn from '../webComponents/account/SignIn';
import DiaryDetail from '../webComponents/diary/DiaryDetail';
import DiaryUpdate from '../webComponents/diary/DiaryUpdate';
import KaKaoLogin from '../webComponents/account/KaKaoLogin';
import NotFound from '../webComponents/another/NotFound';
import bmkRR from '../src_assets/img/bookmark/bookmark-red-red.svg';
import bmkRW from '../src_assets/img/bookmark/bookmark-red-white.svg';
import bmkOO from '../src_assets/img/bookmark/bookmark-orange-orange.svg';
import bmkOW from '../src_assets/img/bookmark/bookmark-orange-white.svg';
import bmkYY from '../src_assets/img/bookmark/bookmark-yellow-yellow.svg';
import bmkYW from '../src_assets/img/bookmark/bookmark-yellow-white.svg';
import bmkGG from '../src_assets/img/bookmark/bookmark-green-green.svg';
import bmkGW from '../src_assets/img/bookmark/bookmark-green-white.svg';
import bmkBB from '../src_assets/img/bookmark/bookmark-blue-blue.svg';
import bmkBW from '../src_assets/img/bookmark/bookmark-blue-white.svg';

const getStringDate = (date) => {
  // 대한민국의 offset을 수동으로 추가한 뒤 날짜 전달
  const offset = date.getTimezoneOffset() * 60000;
  const dateOffset = new Date(date.getTime() - offset);
  return dateOffset.toISOString().slice(0, 10);
};

const AppMain = ({ homeState, setHomeState }) => {
  const [today, setToday] = useState(getStringDate(new Date()));
  const accessToken = getCookie('accessToken');

  const changeHomeStateZero = () => {
    setHomeState([true, false, false, false, false]);
  };
  const changeHomeStateOne = () => {
    setHomeState([false, true, false, false, false]);
  };
  const changeHomeStateTwo = () => {
    setHomeState([false, false, true, false, false]);
  };
  const changeHomeStateThree = () => {
    setHomeState([false, false, false, true, false]);
  };
  const changeHomeStateFour = () => {
    setHomeState([false, false, false, false, true]);
  };

  return (
    <div>
      <Routes>
        <Route path='/' element={<LogoHome />}></Route>
        {homeState[0] === true ? (
          <Route
            path='/home'
            element={
              <MyDiary
                changeHomeStateThree={changeHomeStateThree}
                setToday={setToday}
              />
            }
          ></Route>
        ) : homeState[1] === true ? (
          <Route path='/home' element={<GroupDiary />}></Route>
        ) : homeState[2] === true ? (
          <Route path='/home' element={<FriendList />}></Route>
        ) : homeState[3] === true ? (
          <Route
            path='/home'
            element={
              <DiaryNew
                today={today}
                changeHomeStateZero={changeHomeStateZero}
              />
            }
          ></Route>
        ) : homeState[4] === true ? (
          <Route path='/home' element={<Etc />}></Route>
        ) : null}
        <Route path='/SignIn' element={<SignIn />}></Route>
        <Route path='/SignUp' element={<SignUp />}></Route>
        <Route path='/Diary/Detail' element={<DiaryDetail />}></Route>
        <Route path='/Diary/Edit' element={<DiaryUpdate />}></Route>
        <Route path='/kakaoLogin' element={<KaKaoLogin />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
      {accessToken !== undefined ? (
        <div className='w-[1440px] relative'>
          {homeState[0] === true ? (
            <img src={bmkRR} className='absolute z-0 right-[60px] top-28' />
          ) : (
            <Link to='/home' onClick={changeHomeStateZero}>
              <img src={bmkRW} className='absolute z-0 right-[60px] top-28' />
            </Link>
          )}
          {homeState[1] === true ? (
            <img src={bmkOO} className='absolute z-0 right-[60px] top-48' />
          ) : (
            <Link to='/home' onClick={changeHomeStateOne}>
              <img src={bmkOW} className='absolute z-0 right-[60px] top-48' />
            </Link>
          )}
          {homeState[2] === true ? (
            <img
              src={bmkYY}
              className='absolute z-0 right-[60px] top-[272px]'
            />
          ) : (
            <Link to='/home' onClick={changeHomeStateTwo}>
              <img
                src={bmkYW}
                className='absolute z-0 right-[60px] top-[272px]'
              />
            </Link>
          )}
          {homeState[3] === true ? (
            <img
              src={bmkGG}
              className='absolute z-0 right-[60px] top-[352px]'
            />
          ) : (
            <Link to='/home' onClick={changeHomeStateThree}>
              <img
                src={bmkGW}
                className='absolute z-0 right-[60px] top-[352px]'
              />
            </Link>
          )}
          {homeState[4] === true ? (
            <img
              src={bmkBB}
              className='absolute z-0 right-[60px] top-[432px]'
            />
          ) : (
            <Link to='/home' onClick={changeHomeStateFour}>
              <img
                src={bmkBW}
                className='absolute z-0 right-[60px] top-[432px]'
              />
            </Link>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default AppMain;
