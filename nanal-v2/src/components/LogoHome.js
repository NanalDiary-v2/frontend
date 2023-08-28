import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCookie } from '../config/Cookie';
import nanal from '../src_assets/img/나날1.jpeg';

const LogoHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 토큰이 있는 상태에서 '/' 이 경로로
    const accessToken = getCookie('accessToken');
    if (accessToken !== undefined) {
      // window.location.replace('/home');
      navigate(`/home`, {
        replace: true,
      });
    }
  }, []);

  return (
    <div className='grid grid-cols-1 mt-20 place-items-center'>
      <img
        src={nanal}
        alt='logo'
        className='border rounded-lg w-60 h-60 border-amber-800'
      />
      <Link to='/SignIn'>
        <div>
          <button className='px-4 py-2 mt-20 text-base font-semibold border rounded-full border-violet-400 bg-violet-100 text-violet-500 hover:bg-violet-200'>
            로그인
          </button>
        </div>
      </Link>
      <Link to='/SignUp'>
        <div>
          <button className='px-4 py-2 my-2 text-base font-semibold border rounded-full border-violet-400 bg-violet-100 text-violet-500 hover:bg-violet-200'>
            회원가입
          </button>
        </div>
      </Link>
    </div>
  );
};

export default LogoHome;
