import { useState, useRef, useEffect } from 'react';
import bell from '../src_assets/img/bell.svg';
import logo from '../src_assets/img/nanalLogo.svg';
import Tuning from '../webComponents/setting/Tuning';
import AlarmList from '../webComponents/another/AlarmList';
// import { Link } from 'react-router-dom';
import { onLogin } from '../config/Login';
import axios_api from '../config/Axios';

function Nav({ setHomeState }) {
  // Logo 누르면 캘린더페이지 보여주게 해줄 녀석.

  const [useAlarm, setUseAlarm] = useState(true);
  const userProfile = {
    days: window.localStorage.getItem('profileDays'),
    img: window.localStorage.getItem('profileImg'),
    introduction: window.localStorage.getItem('profileIntroduction'),
    nickname: window.localStorage.getItem('profileNickname'),
  };
  let menuRef = useRef(null);
  const [isToggle, setIsToggle] = useState(false);
  const toggleProfileMenu = () => {
    if (isAlarmToggle === true) {
      setIsAlarmToggle(false);
    }
    setIsToggle((isToggle) => !isToggle);
  };

  const [checkAlarm, setCheckAlarm] = useState(true);

  useEffect(() => {
    function handleOutside(e) {
      // current.contains(e.target) : 컴포넌트 특정 영역 외 클릭 감지를 위해 사용
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsToggle(false);
        // console.log("profile===ref");
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
    };
  }, [menuRef]);

  let alarmRef = useRef(null);
  const [isAlarmToggle, setIsAlarmToggle] = useState(false);
  const toggleAlarmMenu = () => {
    if (isToggle === true) {
      setIsToggle(false);
    }
    setIsAlarmToggle((isAlarmToggle) => !isAlarmToggle);
  };
  useEffect(() => {
    function handleOutside(e) {
      // current.contains(e.target) : 컴포넌트 특정 영역 외 클릭 감지를 위해 사용
      if (alarmRef.current && !alarmRef.current.contains(e.target)) {
        setIsAlarmToggle(false);
        // console.log("alarm===ref");
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
    };
  }, [alarmRef]);
  // console.log(isAlarmToggle)

  useEffect(() => {
    onLogin();
    axios_api
      .get('notification/check')
      .then(({ data }) => {
        if (data.statusCode === 200) {
          setCheckAlarm(null);
          if (data.data.responseMessage === '알림 조회 성공') {
            setCheckAlarm(data.data.check);
          }
        } else {
          console.log('새 알림 여부 확인 오류 : ');
          console.log(data.statusCode);
          console.log(data.data.responseMessage);
        }
      })
      .catch(({ error }) => console.log('새 알림 여부 확인 오류 : ' + error));
  }, []);

  return (
    <div>
      <nav className='flex justify-between h-16 m-auto space-x-4'>
        <div
          className='w-24 h-16 py-1 pr-1 my-auto font-medium rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-900'
          onClick={() => setHomeState([true, false, false, false, false])}
        >
          <img src={logo} alt='logo' />
        </div>
        <div className='m-auto'>
          <p>나날과 함께한지 {userProfile.days}일 째 되는 날입니다.</p>
        </div>
        <div className='flex items-center m-auto'>
          {/* Alarm */}
          <div
            ref={alarmRef}
            onClick={toggleAlarmMenu}
            className='relative cursor-pointer'
          >
            <img src={bell} className='w-6 h-6 my-3' alt='bell' />
            {/* {useAlarm === true ? (
              <span className='absolute flex w-3 h-3 -right-2 top-2'>
                <span className='absolute inline-flex w-3 h-3 rounded-full opacity-75 animate-ping bg-sky-400'></span>
                <span className='relative inline-flex w-3 h-3 rounded-full bg-sky-500'></span>
              </span>
            ) : null} */}
            {checkAlarm === true ? (
              <span className='absolute flex w-3 h-3 -right-2 top-2'>
                <span className='absolute inline-flex w-2 h-2 rounded-full opacity-75 animate-ping bg-sky-300'></span>
                <span className='relative inline-flex w-2 h-2 rounded-full bg-sky-400'></span>
              </span>
            ) : null}
          </div>
          {isAlarmToggle && (
            <div
              ref={alarmRef}
              className='absolute right-40 inset-y-[48px] rounded-md box-border border border-black w-80 h-[500px] z-40 bg-slate-100 grid grid-cols-1 justify-items-center overflow-auto'
            >
              <AlarmList
                setUseAlarm={setUseAlarm}
                toggleAlarmMenu={toggleAlarmMenu}
              />
            </div>
          )}

          {/* ProfileMenu */}
          <div
            ref={menuRef}
            className='w-8 h-8 ml-5 overflow-hidden rounded-full cursor-pointer'
            onClick={toggleProfileMenu}
          >
            {userProfile.img !== null && (
              <img src={userProfile.img} alt='usere-profile-img' />
            )}
          </div>
          {isToggle && (
            <div
              ref={menuRef}
              className='absolute right-40 inset-y-[48px] rounded-md box-border border border-black w-72 h-[500px] z-40 bg-slate-100 grid grid-cols-1 justify-items-center'
            >
              <div className='w-40 h-40 my-5 overflow-hidden rounded-full'>
                <img src={userProfile.img} alt='user-profile-img' />
              </div>
              <p className='justify-self-start indent-[28px]'>
                닉네임 : {userProfile.nickname}
              </p>
              {userProfile.introduction === null ? (
                <div className='truncate justify-self-start indent-[28px] w-60'>
                  아직 작성된 소개글이 없습니다.
                </div>
              ) : (
                <p className='truncate justify-self-start indent-[28px] w-60'>
                  {userProfile.introduction}
                </p>
              )}
              <Tuning toggleProfileMenu={toggleProfileMenu} />
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Nav;
