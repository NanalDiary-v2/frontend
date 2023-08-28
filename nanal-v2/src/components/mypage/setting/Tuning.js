import { useEffect } from 'react';
import { onLogin } from '../../../config/Login';
import ThemeSetting from './ThemeSetting';
import TuningProfile from '../profile/TuningProfile';
import TuningUserInfo from '../profile/TuningUserInfo';

const Tuning = () => {
  const tuningStyle =
    'box-border flex justify-between h-12 font-bold rounded-lg indent-4 bg-lime-200/75';

  useEffect(() => {
    onLogin();
  }, []);

  return (
    <div className='grid grid-cols-1 gap-4 mt-4 place-content-evenly'>
      {/* 유저정보 (프로필) 수정*/}
      <TuningProfile />
      {/* 유저정보 (비밀번호, 회원탈퇴) 수정 */}
      <TuningUserInfo />
      {/* PDF 미구현 */}
      <div className={tuningStyle}>
        <div className='self-center'>PDF로 내보내기</div>
      </div>
      {/* 테마설정 미구현 */}
      <ThemeSetting />
      {/* <hr className='my-4 w-80 border-slate-500/75' /> */}
    </div>
  );
};

export default Tuning;
