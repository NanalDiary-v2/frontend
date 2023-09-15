import { Link } from 'react-router-dom';
import { BrowserView, MobileView } from 'react-device-detect';

function DiaryItem({
  isToggle,
  groupIdx,
  diaryIdx,
  diaryDate,
  nickname,
  emo,
  picture,
  content,
  groupName,
}) {
  const diarydate = diaryDate.split('-');

  return (
    <>
      <MobileView>
        <Link
          to={`/Diary/Detail`}
          state={{
            diaryIdx: diaryIdx,
            isToggle: isToggle,
            groupIdx: groupIdx,
          }}
        >
          <div className='flex items-center p-2 m-0.5 w-[328px]'>
            <img src={picture} alt='DALL:E2' className='w-20 h-20 p-1 rounded-2xl' />
            <div className='w-full px-1 m-1 text-sm text-right truncate'>
              <div>
                <p>
                  {isToggle !== 3 ? (
                    <img src={emo} alt='emotion' className='inline-block w-6 h-6 mb-1 mr-2' />
                  ) : (
                    <></>
                  )}
                  {isToggle === 1 ? (
                    <span className='text-sm'>
                      {diarydate[0]}년 {diarydate[1]}월 {diarydate[2]}일
                    </span>
                  ) : (
                    <span className='text-sm'>
                      {diarydate[1]}월 {diarydate[2]}일
                    </span>
                  )}
                </p>
              </div>
              <div>
                {isToggle === 2 ? <span className='font-bold'>{nickname}</span> : <></>}
                {isToggle === 3 ? (
                  <div className='justify-end text-right'>
                    <span className='w-6 mr-3 font-bold text-right h-6mb-1'>{groupName}</span>
                    <span className='text-right'>{nickname}</span>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <p className='block truncate'>{content}</p>
            </div>
          </div>
        </Link>
      </MobileView>

      <BrowserView>
        <Link
          to={`/Diary/Detail`}
          state={{
            diaryIdx: diaryIdx,
            isToggle: isToggle,
            groupIdx: groupIdx,
            diaryDate: diaryDate,
          }}
        >
          <div className='flex items-center justify-center p-2 m-1 ml-6'>
            {isToggle !== 0 ? (
              <img src={picture} alt='DALL:E2' className='w-32 h-32 p-1 rounded-lg' />
            ) : (
              <img
                src={picture}
                alt='DALL:E2'
                className='w-28 h-28 p-1 rounded-lg hover:translate-y-2'
              />
            )}
            <div className='w-3/4 px-1 m-1 text-right'>
              <p className='flex justify-end'>
                <img src={emo} alt='Emotion' className='w-8 h-8 mr-3' />
                {isToggle === 1 ? (
                  <span>
                    {diarydate[0]}년 {diarydate[1]}월 {diarydate[2]}일
                  </span>
                ) : (
                  <span className='text-lg'>
                    {diarydate[0]}년 {diarydate[1]}월 {diarydate[2]}일
                  </span>
                )}
              </p>
              <p>{isToggle === 2 ? <span>{nickname}</span> : <></>}</p>
              <p className='block font-bold truncate text-lg'>{content}</p>
            </div>
          </div>
        </Link>
      </BrowserView>
    </>
  );
}

export default DiaryItem;
