import { Link } from 'react-router-dom';

function DiaryItem({
  isToggle,
  groupIdx,
  nickname,
  diaryIdx,
  diaryDate,
  content,
  picture,
  emo,
}) {
  const diarydate = diaryDate.split('-');

  return (
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
          <img
            src={picture}
            alt='DALL:E2'
            className='w-32 h-32 p-1 rounded-lg'
          />
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
  );
}

export default DiaryItem;
