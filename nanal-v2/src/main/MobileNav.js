import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios_api from '../config/Axios';
import { onLogin } from '../config/Login';
import bell from '../src_assets/img/bell.svg';
import logo from '../src_assets/img/home-alt.svg';
import profile from '../src_assets/img/person_FILL0.png';
import close from '../src_assets/img/close.svg';
import downarrow from '../src_assets/img/arrow_drop_down.png';
import uparrow from '../src_assets/img/arrow_drop_up.png';
import search from '../src_assets/img/search_icon_1.png';

function Nav({ changeIsBookCase }) {
  // useNavigate == 뒤로가기나 앞으로가기를 위한 react 내장 객체
  const navigate = useNavigate();
  // Home 의 정보를 알려줄 로케이션 변수 정의.
  // location.pathname === '/' 이 경우 현재 위치가 홈이다.
  const location = useLocation();
  // Home 옆의 화살표 토글
  const [isToggle, setToggle] = useState(true);
  const [checkAlarm, setCheckAlarm] = useState(true);

  const toggleMenu = () => {
    setToggle((isToggle) => !isToggle);
  };
  const changeBookCase = (e) => {
    changeIsBookCase(e);
  };

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
      <nav className='flex justify-between m-auto space-x-4 w-80'>
        <div className='flex items-center'>
          <Link
            to='/home'
            className='w-8 h-8 py-1 my-1 font-medium rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-900'
          >
            <img src={logo} />
          </Link>
          {location.pathname === '/home' ? (
            <div>
              {isToggle ? (
                <div className='w-3 h-3 mt-2'>
                  <img
                    src={downarrow}
                    onClick={() => toggleMenu()}
                    className='w-full h-full'
                  />
                </div>
              ) : (
                <div>
                  <div className='w-3 h-3 mt-2'>
                    <img
                      src={uparrow}
                      onClick={() => toggleMenu()}
                      className='w-full h-full'
                    />
                  </div>
                  <div className='absolute z-0 grid content-center w-24 h-20 grid-cols-1'>
                    <button
                      className='p-1 text-white bg-slate-500 '
                      onClick={() => {
                        toggleMenu();
                        changeBookCase(false);
                      }}
                    >
                      캘린더
                    </button>
                    <button
                      className='p-1 text-white bg-sky-700 '
                      onClick={() => {
                        toggleMenu();
                        changeBookCase(true);
                      }}
                    >
                      책장
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
        <div className='flex items-center m-auto'>
          <Link to='/Search'>
            <img src={search} className='w-[18px] h-[18px] my-3 mx-2.5' />
          </Link>
          <Link to='/Alarm'>
            <div className='relative mx-2.5'>
              <img src={bell} className='w-6 h-6 my-3 ml-2.5' />
              {checkAlarm === true ? (
                <span className='absolute flex w-3 h-3 -right-2 -top-0'>
                  <span className='absolute inline-flex w-2 h-2 rounded-full opacity-75 animate-ping bg-sky-300'></span>
                  <span className='relative inline-flex w-2 h-2 rounded-full bg-sky-400'></span>
                </span>
              ) : null}
            </div>
          </Link>
          {location.pathname === '/home' ? (
            <Link to='/MyPage' className='ml-2.5 w-[36px]'>
              <img src={profile} className='w-[30px] h-[30px]' />
            </Link>
          ) : (
            <img
              src={close}
              className='ml-2.5 w-9 h-9'
              onClick={() => {
                navigate(-1);
              }}
            />
          )}
        </div>
      </nav>
    </div>
  );
}

export default Nav;
