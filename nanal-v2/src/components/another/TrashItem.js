import { BrowserView, MobileView, isMobile } from 'react-device-detect';
import axios_api from '../../config/Axios';
import Swal from 'sweetalert2';

function TrashItem({ diaryIdx, diaryDate, content, picture, emo }) {
  // 일기 복구하기

  const diarydate = diaryDate.split('-');

  const recovery = () => {
    Swal.fire({
      text: '일기를 복구하실 건가요?',
      text: isMobile ? '' : '복구한 일기는 리스트에서 확인 가능합니다.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '복구',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        axios_api
          .put(`diary/trashbin/${diaryIdx}`)
          .then(({ data }) => {
            if (data.statusCode === 200) {
              if (data.data.responseMessage === '일기 복구 성공') {
                window.location.reload();
              }
            } else {
              console.log('일기 복구 실패 : ');
              console.log(data.statusCode);
              console.log(data.data.responseMessage);
            }
          })
          .catch(({ error }) => {
            console.log('일기 복구 오류: ' + error);
          });
      }
    });
  };

  return (
    <div>
      <MobileView>
        <div className='my-2'>
          <div className='flex p-2 m-1 mb-3 item-center'>
            <img
              src={picture}
              alt='DALL:E2'
              className='w-16 h-16 p-1 rounded-lg hover:translate-y-2'
            />
            <div className='w-9/12 px-1 m-1 text-sm '>
              <div className='flex items-center justify-evenly'>
                <img src={emo} alt='Emotion' className='w-6 h-6' />
                <span className='text-sm'>{diaryDate}</span>
                <button
                  className='bg-cyan-600  text-white px-2.5 py-1 rounded-xl '
                  onClick={recovery}
                >
                  복구
                </button>
              </div>
              <p className='w-11/12 pr-16 mt-1 font-bold text-right truncate'>
                {content}
              </p>
            </div>
          </div>
        </div>
      </MobileView>
      <BrowserView>
        <div className='my-2'>
          <div className='flex p-2 m-1 mb-3 item-center w-[500px]'>
            <img
              src={picture}
              alt='DALL:E2'
              className='w-20 h-20 p-1 rounded-lg'
            />
            <div className='w-3/4 px-1 m-1 text-sm '>
              <div className='flex justify-between mb-1'>
                <span className='text-xl'>
                  {diarydate[0]}년 {diarydate[1]}월 {diarydate[2]}일
                </span>
                <button
                  className='bg-cyan-500 hover:bg-cyan-600 text-white px-2.5 py-1 rounded-xl text-xl font-bold'
                  onClick={recovery}
                >
                  복구
                </button>
              </div>
              <p className='w-full mt-1 text-xl font-bold truncate'>
                {content}
              </p>
            </div>
          </div>
        </div>
      </BrowserView>
    </div>
  );
}

export default TrashItem;
