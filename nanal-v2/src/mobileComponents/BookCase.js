import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios_api from '../config/Axios';
import { onLogin } from '../config/Login';
import shelf from '../src_assets/img/shelf.png';
import joy from '../src_assets/img/emotion/emo_joy_s.png';
import calm from '../src_assets/img/emotion/emo_calm_s.png';
import nerv from '../src_assets/img/emotion/emo_nerv_s.png';
import ang from '../src_assets/img/emotion/emo_ang_s.png';
import emb from '../src_assets/img/emotion/emo_emb_s.png';
import sad from '../src_assets/img/emotion/emo_sad_s.png';
import nanalImg from '../src_assets/img/나날2.png';
import addIcon from '../src_assets/img/file_add_icon.png';
import ballpenIcon from '../src_assets/img/ballpen_icon.png';

function BookCase() {
  const navigate = useNavigate();

  const [Collocate, setCollocate] = useState(true);
  const [emotion, SetEmotion] = useState([]);
  const [emotionDisplay, SetEmotionDisplay] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const changeCollocate = () => {
    setCollocate((Collocate) => !Collocate);
  };

  // img태그가 갖는 공통 css 속성
  const emoCss = 'w-12 h-12 absolute'; // standart top-100, left-26
  const emoTextCss = 'w-12 absolute'; // standart top-100, left-26
  const joyCss =
    Collocate === true
      ? 'animate-bounce hover:animate-none top-24 right-12 cursor-pointer'
      : 'animate-pulse';
  const calmCss =
    Collocate === true
      ? 'animate-bounce hover:animate-none top-28 left-12 cursor-pointer'
      : 'animate-pulse';
  const nervCss =
    Collocate === true
      ? 'animate-bounce hover:animate-none top-72 left-20 cursor-pointer'
      : 'animate-pulse';
  const angCss =
    Collocate === true
      ? 'animate-bounce hover:animate-none top-1/2 right-8 cursor-pointer'
      : 'animate-pulse';
  const embCss =
    Collocate === true
      ? 'animate-bounce hover:animate-none top-3/4 right-20 cursor-pointer'
      : 'animate-pulse';
  const sadCss =
    Collocate === true
      ? 'animate-bounce hover:animate-none top-88 left-20 cursor-pointer'
      : 'animate-pulse';

  const emoMouseOut = () => {
    SetEmotionDisplay([false, false, false, false, false, false]);
  };

  const emoMouseOver = (emo) => {
    if (emo === 'joy' && emotion && emotion.joy.cnt > 0) {
      SetEmotionDisplay([true, false, false, false, false, false]);
    } else if (emo === 'calm' && emotion && emotion.calm.cnt > 0) {
      SetEmotionDisplay([false, true, false, false, false, false]);
    } else if (emo === 'nerv' && emotion && emotion.nerv.cnt > 0) {
      SetEmotionDisplay([false, false, true, false, false, false]);
    } else if (emo === 'ang' && emotion && emotion.ang.cnt > 0) {
      SetEmotionDisplay([false, false, false, true, false, false]);
    } else if (emo === 'emb' && emotion && emotion.emb.cnt > 0) {
      SetEmotionDisplay([false, false, false, false, true, false]);
    } else if (emo === 'sad' && emotion && emotion.sad.cnt > 0) {
      SetEmotionDisplay([false, false, false, false, false, true]);
    }
  };

  const [groupList, setGroupList] = useState([]);

  useEffect(() => {
    onLogin();
    axios_api
      .get('group/list/1')
      .then(({ data }) => {
        if (data.statusCode === 200) {
          setGroupList(null);
          if (data.data.responseMessage === '그룹 리스트 조회 성공') {
            setGroupList(data.data.groupList);
          }
        } else {
          console.log('그룹 리스트 불러오기 오류: ');
          console.log(data.statusCode);
          console.log(data.data.responseMessage);
        }
      })
      .catch(({ error }) => {
        console.log('그룹 리스트 불러오기 오류: ' + error);
      });
    axios_api
      .get('friend/emo')
      .then(({ data }) => {
        if (data.statusCode === 200) {
          SetEmotion(null);
          if (data.data.responseMessage === '감정 조회 성공') {
            SetEmotion(data.data.emotions);
            // console.log(data.data.emotions);
          } else if (data.data.responseMessage === '데이터 없음') {
            // console.log('데이터 없음');
          }
        } else {
          console.log('감정 조회 오류 : ');
          console.log(data.statusCode);
          console.log(data.data.responseMessage);
        }
      })
      .catch(({ error }) => {
        console.log('감정 조회 오류 : ' + error);
      });
  }, []);

  // 날짜를 'YYYY-MM-DD' 형태로 바꾸는 함수들
  const leftPad = (value) => {
    if (value >= 10) {
      return value;
    }
    return `0${value}`;
  };

  const toStringByFormatting = (value, delimeter = '-') => {
    const year = value.getFullYear();
    const month = leftPad(value.getMonth() + 1);
    const date = leftPad(value.getDate());

    return [year, month, date].join(delimeter);
  };

  return (
    <div>
      {/* bookshelf 마진처리 해야함!!! */}

      <div>
        {/* 첫번째 단 */}
        <div className='my-10'>
          {/* 사진 */}
          <div className='relative flex h-24 p-4 text-center w-60 top-5 left-10 justify-evenly'>
            {/* 내 전체 일기장 */}
            <div className='mx-5'>
              <Link
                to={'/Diary/List'}
                state={{
                  isToggle: 1,
                }}
                className='box-border relative grid items-center w-20 h-20 overflow-hidden text-center rounded-md border-zinc-400'
              >
                <img src={nanalImg} className='object-cover'></img>
              </Link>
            </div>
            {/* 일기 최신순 0번째 그룹 */}
            <div className='mx-5'>
              {groupList && groupList.length > 0 && (
                <Link
                  to={`/Group/Detail`}
                  state={{
                    groupIdx: groupList[0].groupDetail.groupIdx,
                    isToggle: 2,
                  }}
                  className='box-border relative grid items-center w-20 h-20 overflow-hidden text-center rounded-md border-zinc-400'
                >
                  <img
                    src={groupList[0].groupDetail.imgUrl}
                    className='object-cover'
                  ></img>
                </Link>
              )}
            </div>
          </div>
          {/* 책장 */}
          <img src={shelf} className='py-3 mx-auto w-72' />
        </div>

        {/* 두번째 단 */}
        <div className='my-10'>
          {/* 사진 */}
          <div className='relative flex h-24 p-4 text-center w-60 top-5 left-10 justify-evenly'>
            {/* 일기 최신순 1번째 그룹 */}
            <div className='mx-5'>
              {groupList && groupList.length > 1 && (
                <Link
                  to={`/Group/Detail`}
                  state={{
                    groupIdx: groupList[1].groupDetail.groupIdx,
                    isToggle: 2,
                  }}
                  className='box-border relative grid items-center w-20 h-20 overflow-hidden text-center rounded-md border-zinc-400'
                >
                  <img
                    src={groupList[1].groupDetail.imgUrl}
                    className='object-cover'
                  ></img>
                </Link>
              )}
            </div>
            {/* 일기 최신순 2번째 그룹 */}
            <div className='mx-5'>
              {groupList && groupList.length > 2 && (
                <Link
                  to={`/Group/Detail`}
                  state={{
                    groupIdx: groupList[2].groupDetail.groupIdx,
                    isToggle: 2,
                  }}
                  className='box-border relative grid items-center w-20 h-20 overflow-hidden text-center rounded-md border-zinc-400'
                >
                  <img
                    src={groupList[2].groupDetail.imgUrl}
                    className='object-cover'
                  ></img>
                </Link>
              )}
            </div>
          </div>
          {/* 책장 */}
          <img src={shelf} className='py-3 mx-auto w-72' />
        </div>

        {/* 세번째 단 */}
        <div className='my-10'>
          {/* 사진 */}
          <div className='relative flex h-24 p-4 text-center w-60 top-5 left-10 justify-evenly'>
            {/* 일기 최신순 3번째 그룹 */}
            <div className='mx-5'>
              {groupList && groupList.length > 3 && (
                <Link
                  to={`/Group/Detail`}
                  state={{
                    groupIdx: groupList[3].groupDetail.groupIdx,
                    isToggle: 2,
                  }}
                  className='box-border relative grid items-center w-20 h-20 overflow-hidden text-center rounded-md border-zinc-400'
                >
                  <img
                    src={groupList[3].groupDetail.imgUrl}
                    className='object-cover'
                  ></img>
                </Link>
              )}
            </div>
            {/* 그룹 리스트로 이동 */}
            <div className='mx-5'>
              <Link
                to='/Group/List'
                className='relative grid items-center w-12 h-12 mx-5 mt-2 text-center'
              >
                <img src={addIcon} className='m-auto mt-2' />
              </Link>
            </div>
          </div>
          {/* 책장 */}
          <img src={shelf} className='py-3 mx-auto w-72' />
        </div>
      </div>

      {/* 먼지 이미지 */}
      <div className='flex justify-center my-7 '>
        <img
          src={joy}
          className={`${emoCss} ${joyCss}`}
          onMouseOver={() => emoMouseOver('joy')}
          onMouseOut={emoMouseOut}
        />
        <img
          src={calm}
          className={`${emoCss} ${calmCss}`}
          onMouseOver={() => emoMouseOver('calm')}
          onMouseOut={emoMouseOut}
        />
        <img
          src={nerv}
          className={`${emoCss} ${nervCss}`}
          onMouseOver={() => emoMouseOver('nerv')}
          onMouseOut={emoMouseOut}
        />
        <img
          src={ang}
          className={`${emoCss} ${angCss}`}
          onMouseOver={() => emoMouseOver('ang')}
          onMouseOut={emoMouseOut}
        />
        <img
          src={emb}
          className={`${emoCss} ${embCss}`}
          onMouseOver={() => emoMouseOver('emb')}
          onMouseOut={emoMouseOut}
        />
        <img
          src={sad}
          className={`${emoCss} ${sadCss}`}
          onMouseOver={() => emoMouseOver('sad')}
          onMouseOut={emoMouseOut}
        />
        <div>
          {emotion && emotionDisplay[0] === true ? (
            <div
              className={`w-16 p-2 text-center rounded-lg bg-zinc-100 ${emoTextCss} ${joyCss}`}
            >
              {emotion && emotion.joy
                ? emotion.joy.nickname.map((name, idx) => {
                    return (
                      <p key={idx} className='py-0.5 text-xs truncate'>
                        {name}
                      </p>
                    );
                  })
                : null}
            </div>
          ) : null}
          {emotion && emotionDisplay[1] === true ? (
            <div
              className={`w-16 p-2 text-center rounded-lg bg-zinc-100 ${emoTextCss} ${calmCss}`}
            >
              {emotion && emotion.calm
                ? emotion.calm.nickname.map((name, idx) => {
                    return (
                      <p key={idx} className='py-0.5 text-xs truncate'>
                        {name}
                      </p>
                    );
                  })
                : null}
            </div>
          ) : null}
          {emotion && emotionDisplay[2] === true ? (
            <div
              className={`w-16 p-2 text-center rounded-lg bg-zinc-100 ${emoTextCss} ${nervCss}`}
            >
              {emotion && emotion.nerv
                ? emotion.nerv.nickname.map((name, idx) => {
                    return (
                      <p key={idx} className='py-0.5 text-xs truncate'>
                        {name}
                      </p>
                    );
                  })
                : null}
            </div>
          ) : null}
          {emotion && emotionDisplay[3] === true ? (
            <div
              className={`w-16 p-2 text-center rounded-lg bg-zinc-100 ${emoTextCss} ${angCss}`}
            >
              {emotion && emotion.ang
                ? emotion.ang.nickname.map((name, idx) => {
                    return (
                      <p key={idx} className='py-0.5 text-xs truncate'>
                        {name}
                      </p>
                    );
                  })
                : null}
            </div>
          ) : null}
          {emotion && emotionDisplay[4] === true ? (
            <div
              className={`w-16 p-2 text-center rounded-lg bg-zinc-100 ${emoTextCss} ${embCss}`}
            >
              {emotion && emotion.emb
                ? emotion.emb.nickname.map((name, idx) => {
                    return (
                      <p key={idx} className='py-0.5 text-xs truncate'>
                        {name}
                      </p>
                    );
                  })
                : null}
            </div>
          ) : null}
          {emotion && emotionDisplay[5] === true ? (
            <div
              className={`w-16 p-2 text-center rounded-lg bg-zinc-100 ${emoTextCss} ${sadCss}`}
            >
              {emotion && emotion.sad
                ? emotion.sad.nickname.map((name, idx) => {
                    return (
                      <p key={idx} className='py-0.5 text-xs truncate'>
                        {name}
                      </p>
                    );
                  })
                : null}
            </div>
          ) : null}
        </div>
        <button
          className='text-[12px] box-border rounded-full bg-slate-100/50 h-16 w-16 absolute'
          onClick={changeCollocate}
        >
          <p>
            {Collocate === true ? '감정 정령들 되돌리기' : '감정 정령들 보기'}
          </p>
        </button>
      </div>

      {/* 일기쓰러가기 버튼 */}
      <img
        src={ballpenIcon}
        onClick={() =>
          navigate('/Diary/Create', {
            state: { curDate: toStringByFormatting(new Date()) },
          })
        }
        className='fixed z-50 flex p-1 cursor-pointer w-9 bottom-10 right-10'
      ></img>
    </div>
  );
}

export default BookCase;
