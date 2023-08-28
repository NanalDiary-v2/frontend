import React, { useEffect } from 'react';
import axios_api from '../../config/Axios';
import { useNavigate } from 'react-router-dom';
// import { Link, useNavigate } from 'react-router-dom';
import { setCookie } from '../../config/Cookie';
import { ConsoleView } from 'react-device-detect';
import { onLogin } from '../../config/Login';

function KaKaoLogin() {
  const navigate = useNavigate();
  const getUrlParameter = (name) => {
    // 쿼리 파라미터에서 값을 추출해주는 함수
    let search = window.location.search;
    let params = new URLSearchParams(search);
    return params.get(name);
  };

  useEffect(() => {
    const token = getUrlParameter('accessToken');
    const accessToken = token;
    setCookie('accessToken', accessToken, {
      path: '/',
      secure: true,
      // httpOnly: true,
      sameSite: 'none',
    });

    // console.log('토큰 파싱' + token);
    // console.log(token);
    if (accessToken !== undefined) {
      onLogin();
      axios_api
        .get('user/profile')
        .then(({ data }) => {
          if (data.statusCode === 200) {
            if (data.data.responseMessage === '회원 정보 조회 성공') {
              // console.log(data.data.profile);
              window.localStorage.setItem(
                'profileDays',
                data.data.profile.days
              );
              window.localStorage.setItem('profileImg', data.data.profile.img);
              window.localStorage.setItem(
                'profileIntroduction',
                data.data.profile.introduction
              );
              window.localStorage.setItem(
                'profileNickname',
                data.data.profile.nickname
              );
              navigate(`/home`, {
                replace: true,
              });
              window.location.reload();
            }
          } else {
            console.log('회원 정보 오류: ');
            console.log(data.statusCode);
            console.log(data.data.responseMessage);
          }
        })
        .catch(({ error }) => {
          console.log('회원 정보 조회: ' + error);
        });
    }
    if (token) {
      // console.log('로컬 스토리지에 토큰 저장 ' + token);
      // navigate(`/home`, {
      //   replace: true,
      // });
      // window.location.replace('/home');
    } else {
      // return <Link to={'/'}></Link>;
      // navigate(`/`, {
      //   replace: true,
      // });
      // window.location.replace('/');
    }
  }, []);
}

export default KaKaoLogin;
