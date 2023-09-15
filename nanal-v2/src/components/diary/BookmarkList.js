import { useState, useEffect } from 'react';
import axios_api from '../../config/Axios';
import { onLogin } from '../../config/Login';
import BookmarkItem from './BookmarkItem';
import { BrowserView, MobileView } from 'react-device-detect';

function BookmarkList() {
  // 좋아하는 일기 데이터 받기
  const [favoriteDiary, setFavoriteDiary] = useState([]);

  useEffect(() => {
    onLogin();
    axios_api
      .get('diary/bookmark/list')
      .then(({ data }) => {
        if (data.statusCode === 200) {
          setFavoriteDiary(null);
          if (data.data.responseMessage === '일기 북마크 리스트 조회 성공') {
            setFavoriteDiary(data.data.BookmarkList);
          }
        } else {
          console.log(data.statusCode);
          console.log(data.data.responseMessage);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <MobileView>
        <div>
          <h4 className='my-5 font-bold text-center'>
            좋아하는 일기 개수는 총 {favoriteDiary.length}개 입니다.
          </h4>
          <div className='grid grid-cols-3 gap-3'>
            {favoriteDiary.map((pictures, idx) => (
              <BookmarkItem key={idx} {...pictures} />
            ))}
          </div>
        </div>
      </MobileView>

      <BrowserView>
        <div>
          <p className='absolute inset-y-12 left-20 font-bold text-2xl'>
            좋아하는 일기 개수는 총 {favoriteDiary.length}개 입니다.
          </p>
          <div className='grid grid-cols-3 gap-3 overflow-auto h-96 absolute inset-y-20 right-12'>
            {favoriteDiary.map((pictures, idx) => (
              <BookmarkItem key={idx} {...pictures} />
            ))}
          </div>
        </div>
      </BrowserView>
    </>
  );
}

export default BookmarkList;
