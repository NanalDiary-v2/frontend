import { Link } from 'react-router-dom';

function BookmarkItem({
  diaryIdx,
  diaryDate,
  content,
  emo,
  nickname,
  picture,
}) {
  return (
    <Link
      to={'/Diary/Detail'}
      state={{ diaryIdx: diaryIdx, diaryDate: diaryDate }}
    >
      <div className='relative my-5 group'>
        <img
          src={picture}
          alt='DALL:E2'
          className='absolute inset-0 object-cover p-1 rounded-lg group-hover:opacity-50'
        />
        <div className='transition-all transform translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0'>
          <div className='p-2'>
            <p className='text-sm truncate ... font-bold mt-10'>{content}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BookmarkItem;
