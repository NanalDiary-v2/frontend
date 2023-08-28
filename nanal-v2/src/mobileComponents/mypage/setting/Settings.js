import { Link, useNavigate } from 'react-router-dom';
import { removeCookie } from '../../../config/Cookie';
import Swal from 'sweetalert2';
// import axios_api from './Axios';
import bookmarksRed from '../../../src_assets/img/bookmarksRed.png';
import groupYellow from '../../../src_assets/img/groupYellow.png';
import recycleBinImg from '../../../src_assets/img/recycleBin.png';
import logOutImg from '../../../src_assets/img/log-out.svg';
import settingImg from '../../../src_assets/img/cog.svg';

function Settings() {
  const navigate = useNavigate();

  const onLogout = () => {
    const denyToken = removeCookie('accessToken');

    // token 값이 없어졌다면?
    if (denyToken === undefined) {
      Swal.fire({
        icon: 'success',
        text: '로그아웃 했어요!',
        width: '80%',
      }).then(function () {
        window.location.replace('/');
        // navigate(`/`, {
        //   replace: true,
        // });
      });
    } else {
      console.log('로그아웃 실패====');
    }
  };

  return (
    <div>
      <div className='grid grid-cols-3 gap-6 mt-10 mb-14'>
        <Link to='/Group/List' className='grid content-evenly'>
          <img src={bookmarksRed} className='m-auto' />
          <p className='my-1 text-center'>그룹 관리</p>
        </Link>
        <Link to='/Friend/List' className='grid content-evenly'>
          <img src={groupYellow} className='m-auto' />
          <p className='my-1 text-center'>친구 목록</p>
        </Link>
        <Link to='/RecycleBin' className='grid content-evenly'>
          <img src={recycleBinImg} className='m-auto' />
          <p className='my-1 text-center'>휴지통</p>
        </Link>
      </div>
      <div className='grid grid-cols-2'>
        <div className='grid pl-4 content-evenly' onClick={onLogout}>
          <img src={logOutImg} className='w-10 h-10 m-auto' />
          <p className='my-1 ml-3 text-center'>로그아웃</p>
        </div>
        <Link to='/Tuning' className='grid pr-10 content-evenly'>
          <img src={settingImg} className='w-10 h-10 m-auto' />
          <p className='my-1 text-center'>설정</p>
        </Link>
      </div>
    </div>
  );
}

export default Settings;
