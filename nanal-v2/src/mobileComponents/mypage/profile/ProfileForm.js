import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios_api from '../../../config/Axios';
import { onLogin } from '../../../config/Login';
// import emptyProfile from '../../../src_assets/img/emptyProfile.png';
// import DiaryTotalList from '../../diary/DiaryTotalList';

// username, userMassage, profile 받아와야함
function ProfileForm() {
  const navigate = useNavigate();

  // user profile
  const [userProfile, setUserProfile] = useState({
    days: 1,
    img: null,
    introduction: null,
    nickname: '',
  });

  //총 작성한 일기, 좋아하는 일기, 가입한지 N일째
  const [pStatus, setPStatus] = useState({});
  const changePStatus = (a, b) => {
    setPStatus({
      dCount: a,
      likeCount: b,
    });
  };

  // Mount 됐을 때 user
  useEffect(() => {
    onLogin();
    axios_api
      .get('user/profile')
      .then(({ data }) => {
        if (data.statusCode === 200) {
          if (data.data.responseMessage === '회원 정보 조회 성공') {
            // console.log(data.data.profile);
            setUserProfile(data.data.profile);
          }
        } else {
          console.log('회원 정보 오류: ');
          console.log(data.statusCode);
          console.log(data.data.responseMessage);
        }
      })
      .catch(({ error }) => {
        console.log('회원 정보 조회: ' + error);
      });
    // 총 작성한 일기 수
    axios_api
      .get('diary')
      .then(({ data }) => {
        if (data.statusCode === 200) {
          if (data.data.responseMessage === '일기 개수 조회 성공') {
            let daCount = data.data.diaryCount;
            // 좋아하는 일기
            axios_api.get('diary/bookmark').then(({ data }) => {
              // console.log(data)
              if (data.statusCode === 200) {
                if (
                  data.data.responseMessage === '일기 북마크 개수 조회 성공'
                ) {
                  let lCount = data.data.bookCount;
                  changePStatus(daCount, lCount);
                }
              } else {
                console.log('일기 개수 조회 오류: ');
                console.log(data.statusCode);
                console.log(data.data.responseMessage);
              }
            });
          } else {
            console.log('일기 북마크 개수 조회 오류: ');
            console.log(data.statusCode);
            console.log(data.data.responseMessage);
          }
        }
      })
      .catch(({ error }) => {
        console.log('일기 개수 조회: ' + error);
      });
  }, []);

  return (
    <div>
      <div className='flex mt-5 justify-evenly'>
        <img
          // src={Image}
          src={userProfile.img}
          className='p-1 rounded-full w-28 h-28'
        />
        <div className='mx-auto my-auto break-words w-65'>
          <p className='p-1 my-auto text-2xl font-bold break-all'>
            {userProfile.nickname}
          </p>
          <p>님의 일기장</p>
        </div>
      </div>
      <div className='box-border mx-auto mt-1 mb-10 break-words max-h-20 w-65 border-1'>
        {userProfile.introduction === null ? (
          <p>
            안녕하세요. 나날입니다.
            <br />
            프로필 소개글을 등록해주세요!ㅎㅎ
          </p>
        ) : (
          <p className='px-1.5 mx-auto break-all whitespace-pre-line w-80'>
            {userProfile.introduction}
          </p>
        )}
      </div>
      <div className='flex justify-between'>
        <p className='my-3 font-semibold'>
          나날과 함께한 {userProfile.days}일째 나날입니다.
        </p>
      </div>
      <div className='box-border flex justify-around h-24 p-4 rounded-lg w-80 bg-slate-300/50'>
        <div
          className='grid cursor-pointer content-evenly'
          onClick={() =>
            navigate('/Diary/List', {
              state: {
                isToggle: 1,
              },
            })
          }
        >
          <p className='text-center'>총 작성한 일기</p>
          <p className='font-bold text-center'>{pStatus.dCount}</p>
        </div>
        <div
          className='grid cursor-pointer content-evenly'
          onClick={() => navigate('/Diary/Bookmark/List')}
        >
          <p className='text-center'>좋아하는 일기</p>
          <p className='font-bold text-center'>{pStatus.likeCount}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;
