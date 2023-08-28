import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Link, useNavigate } from 'react-router-dom';
import { setCookie } from '../../config/Cookie';

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

    if (token) {
      window.location.replace('/home');
    } else {
      window.location.replace('/');
    }
  }, []);
}

export default KaKaoLogin;
