// import { useState } from 'react';
import axios_api from '../../config/Axios';
import Swal from 'sweetalert2';

function TrashItem({ diaryIdx, diaryDate, content, emo, picture }) {
  const diarydate = diaryDate.split('-');
  // 일기 복구하기
  const recovery = () => {
    Swal.fire({
      title: `일기를 정말 복구하시겠습니까?`,
      text: '복구한 일기는 리스트에서 확인 가능합니다.',
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
    <div className='my-2'>
      <div className='flex p-2 m-1 mb-3 item-center w-[500px]'>
        <img src={picture} alt='DALL:E2' className='w-20 h-20 p-1 rounded-lg' />
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
          <p className='w-full mt-1 text-xl font-bold truncate'>{content}</p>
        </div>
      </div>
    </div>
  );
}

export default TrashItem;
