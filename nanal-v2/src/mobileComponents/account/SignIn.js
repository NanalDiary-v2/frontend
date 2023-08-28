import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios_api from '../../config/Axios';
import { setCookie } from '../../config/Cookie';
import nanal from '../../src_assets/img/나날1.jpeg';
import kakao from '../../src_assets/img/kakao_login_medium_narrow.png';

function SignIn() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState('');
  const [userPw, setPw] = useState('');

  const kakaoLogin = 'https://i8d110.p.ssafy.io/nanal/user/oauth2/kakao';

  const onChangeId = (e) => {
    setUserId(e.target.value);
  };

  const onChangePw = (e) => {
    setPw(e.target.value);
  };

  // function onLoginSuccess(data) {
  //   const { accessToken } = data;

  //   setCookie('accessToken', accessToken, {
  //     path: '/',
  //     secure: true,
  //     // httpOnly: true,
  //     sameSite: 'none',
  //   });
  // }

  function onLoginSuccess(token) {
    const accessToken = token;

    setCookie('accessToken', accessToken, {
      path: '/',
      secure: true,
      // httpOnly: true,
      sameSite: 'none',
    });
  }

  const SignIn = (e) => {
    e.preventDefault();
    axios_api
      .post('/user/login', {
        userId: userId,
        password: userPw,
      })
      .then((response) => {
        const data = response.data;
        if (data.statusCode === 200) {
          if (data.data.responseMessage === '로그인 성공') {
            // console.log(data.data.token);
            // onLoginSuccess(data.data.token);
            onLoginSuccess(response.headers.get('accessToken'));
            // console.log(response.headers);
            // console.log(JSON.stringify(response.headers));
            // console.log(response.headers.get('accesstoken'));
            // console.log(response.headers.get('accessToken'));
            window.location.replace('/home');
            // navigate(`/home`, {
            //   replace: true,
            // });
          } else if (data.data.responseMessage === '로그인 실패') {
            // alert('아이디 또는 비밀번호를 다시 확인해주세요.');
            Swal.fire({
              icon: 'warning',
              text: '아이디 또는 비밀번호를 다시 확인해주세요.',
              width: '75%',
            }).then(function () {
              setUserId('');
              setPw('');
            });
          } else if (data.data.responseMessage === '회원을 찾을 수 없음') {
            // alert('회원이 아닙니다. 회원 가입을 해주세요.');
            Swal.fire({
              icon: 'warning',
              text: '회원이 아닙니다. 회원 가입을 해주세요.',
              width: '75%',
            }).then(function () {
              setUserId('');
              setPw('');
            });
          }
        } else {
          console.log('로그인 오류: ');
          console.log(data.statusCode);
          console.log(data.data.responseMessage);
        }
      })
      .catch(({ error }) => {
        console.log('로그인 오류: ' + error);
      });
  };

  return (
    <div className='flex justify-center mt-10'>
      <div className='box-border p-4 w-80 border-[1px] border-gray-500 border-solid'>
        <img src={nanal} className='place-self-center' />
        <h1 className='flex justify-center m-3 font-bold tracking-wider text-center'>
          SignIn to 나날🤗
        </h1>
        <div id='sign-in-form' className='justify-between my-2 text-center 1'>
          <form action='' onSubmit={SignIn}>
            <div className='m-1'>
              <label htmlFor='user-id'>ID &nbsp;&nbsp;: </label>
              <input
                type='text'
                id='user-id'
                placeholder='아이디'
                onChange={onChangeId}
                value={userId}
                className='w-48 p-0.5 mb-2 rounded-lg'
              />
              <br />
            </div>
            <div className='m-1'>
              <label htmlFor='user-password'>Pw : </label>
              <input
                type='password'
                id='user-password'
                placeholder='비밀번호'
                onChange={onChangePw}
                value={userPw}
                className='w-48 p-0.5 mb-2 rounded-lg'
              />
            </div>
            <div className='justify-between m-1 mt-2 text-center'>
              <button
                type='submit'
                className='bg-teal-500 text-white px-2.5 py-1 mx-3 rounded-3xl inline-block'
              >
                Sign In
              </button>
              <Link
                to='/SignUp'
                className='bg-teal-500 text-white px-2.5 py-1 mx-3 rounded-3xl inline-block'
              >
                SignUp
              </Link>
            </div>
          </form>
        </div>
        <div className='mt-4 text-center'>
          <button
            type='button'
            onClick={() => {
              window.open(kakaoLogin);
            }}
          >
            <img src={kakao} alt='카카오 로그인' className='w-full h-[45px]' />
          </button>
        </div>
        {/* <div className='mt-4'>
          <p className='text-xs text-center'>
            아이디와 비밀번호를 까먹으셨다면 soyeon@gmail.com으로 연락주세요!
          </p>
        </div> */}
      </div>
    </div>
  );
}

export default SignIn;
