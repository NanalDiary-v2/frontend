import { useEffect } from 'react';
import { onLogin } from '../../config/Login';
import { removeCookie } from '../../config/Cookie';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import TuningProfile from './TuningProfile';
import TuningUserInfo from "./TuningUserInfo";

const Tuning = ({ toggleProfileMenu }) => {
  useEffect(() => {
    onLogin();
  }, []);
  const navigate = useNavigate();
  const onLogout = () => {
    const denyToken = removeCookie('accessToken');

    // token 값이 없어졌다면?
    if (denyToken === undefined) {
      Swal.fire({
        title: '로그아웃',
        icon: 'success',
        text: '로그아웃 했어요!',
        width: '30%',
      }).then(function () {
        // window.location.replace('/');
        navigate(`/`, {
          replace: true,
        });
        window.localStorage.clear();
        window.location.reload();
      });
    } else {
      console.log('로그아웃 실패====');
    }
    // console.log(denyToken)
  };

  return (
    <div className='grid w-64 grid-cols-1 gap-1 mb-5 place-content-evenly'>
      <TuningProfile toggleProfileMenu={toggleProfileMenu} />
      {/* PDF 미구현 */}
      <TuningUserInfo />
      {/* <div className='box-border flex justify-between h-12 font-bold rounded-lg cursor-not-allowed indent-4 bg-lime-400/75'>
        <div className='self-center'>회원 정보 수정</div>
      </div> */}
      {/* 테마설정 미구현 */}
      {/* <div className='box-border flex justify-between h-12 font-bold rounded-lg cursor-not-allowed indent-4 bg-lime-400/75'>
        <div className='self-center'>테마 설정</div>
      </div> */}
      {/* <hr className='my-4 w-80 border-slate-500/75' /> */}
      <div
        className='box-border flex justify-between h-12 font-bold rounded-lg cursor-pointer indent-4 bg-lime-400/75'
        onClick={onLogout}
      >
        <p className='self-center'>로그아웃</p>
      </div>
    </div>
  );
};

export default Tuning;
