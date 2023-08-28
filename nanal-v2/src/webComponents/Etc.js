import { useState } from 'react';
import nmb from '../src_assets/img/bookmark-name/name-mark-blue.svg';
import diaryImgBlue from '../src_assets/img/diary-img/diary-img-blue.svg';
import DiaryList from './diary/DiaryList';
import BookmarkList from './diary/BookmarkList';
import TrashCan from './another/TrashCan';

function Etc() {
  const [etcCompo, setEtcCompo] = useState([true, false, false, false]);

  return (
    <div className='absolute w-[1440px] mx-auto'>
      <img src={nmb} alt='bg' className='absolute z-20 left-60 inset-y-28' />
      <img
        src={diaryImgBlue}
        alt='bg'
        className='absolute w-[1280px] z-10 left-12 top-8'
      />
      <div className='absolute z-20 left-72 inset-y-[216px]'>
        <div className='flex flex-col content-center'>
          <button
            className='mt-5 p-2 text-lg font-bold text-center rounded-lg cursor-pointer right-20 bg-violet-100 hover:bg-blue-400 whitespace-nowrap'
            onClick={() => setEtcCompo([false, true, false, false])}
          >
            전체 일기
          </button>
          <button
            className='mt-2 p-2 text-lg font-bold text-center rounded-lg cursor-pointer right-20 bg-violet-100 hover:bg-blue-400 whitespace-nowrap'
            onClick={() => setEtcCompo([false, false, true, false])}
          >
            북마크
          </button>
          <button
            className='mt-2 p-2 text-lg font-bold text-center rounded-lg cursor-pointer right-20 bg-violet-100 hover:bg-blue-400 whitespace-nowrap'
            onClick={() => setEtcCompo([false, false, false, true])}
          >
            휴지통
          </button>
        </div>
        <div className='absolute z-20 right-40 inset-y-28 w-[600px]'>
          <DiaryList setEtcCompo={setEtcCompo} />
        </div>
      </div>
      {etcCompo[0] === true ? (
        <div>
          <p className='absolute z-30 left-[330px] inset-y-36'>기타</p>
          <div className='absolute z-20 right-[360px] inset-y-72'>
            <p>선택된 메뉴가 없습니다.</p>
            <p>좌측에서 메뉴를 선택해 주세요.</p>
          </div>
        </div>
      ) : etcCompo[1] === true ? (
        <div>
          <p className='absolute z-30 left-[330px] inset-y-36'>전체 일기</p>
          <div className='absolute z-20 w-[720px] inset-y-32 right-40'>
            <DiaryList isToggle={1} setEtcCompo={setEtcCompo} />
          </div>
        </div>
      ) : etcCompo[2] === true ? (
        <div>
          <p className='absolute z-30 left-[330px] inset-y-36'>북마크</p>
          <div className='absolute z-20 right-40 inset-y-28 w-[600px]'>
            <BookmarkList setEtcCompo={setEtcCompo} />
          </div>
        </div>
      ) : etcCompo[3] === true ? (
        <div>
          <p className='absolute z-30 left-[330px] inset-y-36'>휴지통</p>
          <div className='absolute z-20 right-40 inset-y-28 w-[600px]'>
            <TrashCan setEtcCompo={setEtcCompo} />
          </div>
        </div>
      ) : (
        <div className='absolute z-20 right-[360px] inset-y-72'>
          <p>선택된 메뉴가 없습니다.</p>
          <p>좌측에서 메뉴를 선택해 주세요.</p>
        </div>
      )}
    </div>
  );
}

export default Etc;
