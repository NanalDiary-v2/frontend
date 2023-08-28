import { useState, useRef, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import axios_api from '../../config/Axios';
import { getCookie } from '../../config/Cookie';
import { onLogin } from '../../config/Login';
import CommentDetail from './CommentDetail';

function CommentList({ diaryIdx, isToggle, groupIdx }) {
  const token = getCookie('accessToken');
  const userIdx = jwt_decode(token).userIdx;

  // 댓글 내용
  const [content, setContent] = useState('');
  // const onChange = (e) => setContent(e.target.value);
  // 포커싱 기능
  const commentRef = useRef();
  // 댓글 리스트 데이터 받기
  const [commentList, setCommentList] = useState([]);

  // 등록 버튼 누르면 실행되는 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.length < 1) {
      commentRef.current.focus();
      return;
    }
    axios_api
      .post('diary/comment', {
        diaryIdx: diaryIdx,
        groupIdx: groupIdx,
        content: content,
      })
      .then(({ data }) => {
        if (data.statusCode === 200) {
          if (data.data.responseMessage === '일기 댓글 저장 성공') {
            axios_api
              .post(`notification/comment`, {
                request_diary_idx: diaryIdx,
                request_group_idx: [groupIdx],
              })
              .then(({ data }) => {
                if (data.statusCode === 200) {
                  if (data.data.responseMessage === '알림 저장 성공') {
                    // 저장 후 댓글 데이터 초기화
                    // setContent('');
                    window.location.reload();
                  }
                } else {
                  console.log('새 댓글 알림 저장 실패 : ');
                  console.log(data.statusCode);
                  console.log(data.data.responseMessage);
                }
              })
              .catch(({ error }) => {
                console.log('새 댓글 알림 저장 실패 : ' + error);
              });
          }
        } else {
          console.log('일기 댓글 저장 오류: ');
          console.log(data.statusCode);
          console.log(data.data.responseMessage);
        }
      })
      .catch(({ error }) => {
        console.log('일기 댓글 저장 오류: ' + error);
      });
  };

  const arrAxios = [
    `diary/comment/${diaryIdx}`,
    `diary/comment/${diaryIdx}`,
    `diary/comment/${groupIdx}/${diaryIdx}`,
    `diary/comment/${groupIdx}/${diaryIdx}`,
  ];

  // 디테일 페이지에서 댓글 있으면 보여줘야 함
  // 일기 댓글 리스트 조회
  useEffect(() => {
    onLogin();
    axios_api
      .get(arrAxios[isToggle])
      .then(({ data }) => {
        if (data.statusCode === 200) {
          setCommentList(null);
          if (
            data.data.responseMessage ===
            '일기 그룹에 해당하는 댓글 리스트 조회 성공'
          ) {
            setCommentList(data.data.diaryComment);
          }
        } else {
          console.log('일기 그룹에 해당하는 댓글 리스트 불러오기 오류: ');
          console.log(data.statusCode);
          console.log(data.data.responseMessage);
        }
      })
      .catch(({ error }) => {
        console.log('일기 그룹에 해당하는 댓글 리스트 불러오기 오류: ' + error);
      });
  }, []);

  return (
    <div>
      <hr className='my-2 border-dashed border-slate-400/75 w-65' />
      {isToggle === 2 || isToggle === 3 ? (
        <form className='flex justify-end mx-auto my-3' onSubmit={handleSubmit}>
          <input
            type='text'
            ref={commentRef}
            placeholder='댓글을 입력하세요'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='p-1 px-1.5 rounded-md w-4/5'
          />
          <button
            type='submit'
            className='hover:bg-sky-700 bg-cyan-600 text-white px-2.5 py-1 ml-3  rounded-3xl'
          >
            등록
          </button>
        </form>
      ) : (
        <></>
      )}
      <div className='comments-body'>
        {commentList.map((comment, idx) => (
          <CommentDetail key={idx} item={comment} userIdx={userIdx} />
        ))}
      </div>
    </div>
  );
}

export default CommentList;
