import { useEffect, useState } from 'react';
import axios_api from '../../config/Axios';
import { onLogin } from '../../config/Login';
import TrashItem from './TrashItem';
import Swal from 'sweetalert2';

function RecycleBin() {
  // 휴지통 내 일기 데이터 받기
  const [trashDiary, setTrashDiary] = useState([]);

  const totalDelete = () => {
    axios_api
      .delete('diary/trashbin')
      .then(({ data }) => {
        if (data.statusCode === 200) {
          if (data.data.responseMessage === '일기 삭제 성공') {
            window.location.reload();
          }
        } else {
          console.log('일기 전체 삭제 오류');
          console.log(data.statusCode);
          console.log(data.data.responseMessage);
        }
      })
      .catch(({ error }) => {
        console.log('일기 전체 삭제 오류: ' + error);
      });
  };

  useEffect(() => {
    onLogin();
    axios_api
      .get('diary/trashbin')
      .then(({ data }) => {
        if (data.statusCode === 200) {
          // 초기화 필요!
          setTrashDiary(null);
          if (data.data.responseMessage === '일기 리스트 조회 성공') {
            setTrashDiary(data.data.diary); // 데이터는 response.data.data 안에 들어있음
          }
        } else {
          console.log('알림 리스트 조회 오류: ');
          console.log(data.statusCode);
          console.log(data.data.responseMessage);
        }
      })
      .catch(({ error }) => {
        console.log('알림 리스트 조회 오류: ' + error);
      });
  }, []);

  return (
    <div>
      <div className='flex justify-center my-2'>
        <button
          className='px-2 py-1 text-white bg-rose-600 rounded-xl'
          onClick={() => {
            Swal.fire({
              // title: `휴지통을 정말 비우시겠습니까?`,
              // text: '삭제하면 다시는 복구할 수 없습니다.',
              text: '휴지통을 정말 비우시겠습니까?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#d33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: '삭제',
              cancelButtonText: '취소',
            }).then((result) => {
              if (result.isConfirmed) {
                totalDelete();
              }
            });
          }}
        >
          전체 삭제
        </button>
      </div>
      <h4 className='py-2 font-bold text-center'>
        휴지통에 일기가 {trashDiary.length}개 있습니다.
      </h4>
      <div className='justify-between mt-5'>
        {trashDiary.map((diary, idx) => (
          <TrashItem key={idx} {...diary} />
        ))}
      </div>
    </div>
  );
}

export default RecycleBin;
