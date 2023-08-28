import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import imageCompression from 'browser-image-compression';
import axios_api from '../../../config/Axios';
import { onLogin } from '../../../config/Login';
import downArrow from '../../../src_assets/img/arrow_drop_down.png';
import upArrow from '../../../src_assets/img/arrow_drop_up.png';

const TuningProfile = () => {
  const [isClick, setIsClick] = useState(false);

  const changeClickTrue = () => {
    setIsClick(true);
  };
  const changeClickFalse = () => {
    setIsClick(false);
  };

  // const { state } = useLocation();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({});
  let currentName = useRef('');
  let currentInfo = useRef('');

  // 사용자 닉네임
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [isNickname, setIsNickname] = useState(true);

  const onChangeNickname = (e) => {
    currentName.current = e.target.value;

    if (currentName.current.length < 2 || currentName.current.length > 8) {
      setNicknameMessage('닉네임은 2글자 이상 8글자 이하로 입력해주세요!');
      setIsNickname(false);
    } else {
      setNicknameMessage('');
      setIsNickname(true);
    }
  };

  // 사용자 이미지 upload
  const formData = new FormData();
  const [imageFile, setImageFile] = useState(null);
  const [isImgChecked, setIsImgChecked] = useState(false);

  // 사용자 이미지 기본으로 되돌리기
  const onUploadBaseImage = (e) => {
    e.preventDefault();
    setIsImgChecked(true);
    setImageFile(null);
  };

  const handlingDataForm = async (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);

    // Blob 구성 준비
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i += 1) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ia], {
      type: 'image/jpeg',
    });
    const file = new File([blob], 'image.jpg');
    setImageFile(file);

    // formData.append('multipartFile', file);

    // return formData;
  };

  const actionImgCompress = async (fileSrc) => {
    // 이미지 압축하기

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      // 압축 결과
      const compressedFile = await imageCompression(fileSrc, options);

      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        const base64data = reader.result;
        // console.log(compressedFile.type);
        // console.log(base64data);
        handlingDataForm(base64data);
      };
    } catch (error) {
      console.log('이미지 압축 실패 : ' + error);
    }
  };

  const onUploadImage = (e) => {
    // e.preventDefault();

    if (!e.target.files) {
      return;
    }

    setIsImgChecked(true);
    actionImgCompress(e.target.files[0]);

    // setIsImgChecked(true);
    // setImageFile(e.target.files[0]);
    // console.log(e.target.files[0]);
  };

  // 사용자 프로필 소개글
  const [infoMessage, setInfoMessage] = useState('');
  const [isInfo, setIsInfo] = useState(true);

  const onChangeInfo = (e) => {
    currentInfo.current = e.target.value;

    const maxByte = 150; //최대 100바이트
    const text_val = currentInfo.current; //입력한 문자
    const text_len = text_val.length; //입력한 문자수

    let totalByte = 0;
    for (let i = 0; i < text_len; i++) {
      const each_char = text_val.charAt(i);
      const uni_char = escape(each_char); //유니코드 형식으로 변환
      if (uni_char.length > 4) {
        // 한글 : 2Byte
        totalByte += 2;
      } else {
        // 영문,숫자,특수문자 : 1Byte
        totalByte += 1;
      }
    }

    if (totalByte > maxByte) {
      setInfoMessage('75자까지 입력 가능해요!');
      setIsInfo(false);
    } else {
      setInfoMessage('');
      setIsInfo(true);
    }
  };

  const userUpdate = (e) => {
    e.preventDefault();

    if (isNickname === true && isInfo === true) {
      axios_api
        .put('user/profile', {
          nickname: currentName.current,
          introduction: currentInfo.current,
        })
        .then(({ data }) => {
          if (data.statusCode === 200) {
            if (data.data.responseMessage === '회원 정보 수정 성공') {
              // 이미지를 변경하는 경우
              if (isImgChecked === true) {
                formData.append(
                  'value',
                  new Blob([JSON.stringify({})], {
                    type: 'application/json',
                  })
                );

                if (imageFile === null) {
                  formData.append('multipartFile', null);
                } else {
                  formData.append('multipartFile', imageFile);
                }

                // 이미지 업로드
                axios_api
                  .put('file/s3', formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    },
                  })
                  .then(({ data }) => {
                    if (data.statusCode === 200) {
                      if (data.data.responseMessage === '그림 저장 성공') {
                        navigate(`/MyPage`, {
                          replace: true,
                        });
                      }
                    } else {
                      console.log('그림 저장 오류 : ');
                      console.log(data.statusCode);
                      console.log(data.data.responseMessage);
                    }
                  })
                  .catch(({ error }) => {
                    console.log('그림 저장 오류 : ' + error);
                  });
              } else {
                // 이미지를 변경하지 않는 경우
                navigate(`/MyPage`, {
                  replace: true,
                });
              }
            } else if (data.data.responseMessage === '사용 불가') {
              // Swal.fire({
              //   icon: 'warning',
              //   text: '이미 사용중인 닉네임입니다.',
              //   width: '30%',
              // }).then(function () {
              //   setNickName(originName);
              //   // toggleProfileMenu();
              // });
              // openModal();
              alert('이미 사용중인 닉네임입니다.');
            }
          } else {
            console.log('회원 정보 수정 오류: ');
            console.log(data.statusCode);
            console.log(data.data.responseMessage);
          }
        })
        .catch((error) => {
          console.log('회원 정보 수정 오류: ' + error);
        });
    } else {
      Swal.fire({
        icon: 'warning',
        text: '닉네임을 다시 확인해주세요.',
        width: '60%',
      }).then(function () {});
    }
  };

  useEffect(() => {
    onLogin();
    axios_api
      .get('user/profile')
      .then(({ data }) => {
        if (data.statusCode === 200) {
          if (data.data.responseMessage === '회원 정보 조회 성공') {
            setProfile(data.data.profile);
            currentName.current = data.data.profile.nickname;
            currentInfo.current = data.data.profile.introduction;
          } else {
            console.log('회원 정보 조회 오류: ');
            console.log(data.statusCode);
            console.log(data.data.responseMessage);
          }
        }
      })
      .catch((error) => {
        console.log('회원 정보 조회 오류: ' + error);
      });
  }, []);

  if (isClick === false) {
    return (
      <div
        className='box-border flex justify-between h-12 font-bold rounded-lg indent-4 bg-lime-200/75'
        onClick={changeClickTrue}
      >
        <div className='self-center'>프로필 수정</div>
        <img src={downArrow} className='self-center mr-3' />
      </div>
    );
  } else {
    return (
      <div>
        <div
          className='box-border flex justify-between h-12 mb-1 rounded-lg indent-4 bg-emerald-200/75'
          onClick={() => {
            changeClickFalse();
          }}
        >
          <div className='self-center font-bold'>프로필 수정</div>
          <img src={upArrow} className='self-center mr-3' />
        </div>
        <div id='user-Update mx-1'>
          <form className='px-4'>
            <div id='user-nickname-div'>
              <label htmlFor='user-nickname' className='text-sm'>
                💙 닉네임 :
              </label>
              <input
                type='text'
                id='user-nickname'
                defaultValue={currentName.current || ''}
                onChange={onChangeNickname}
                className='font-medium m-0.5 mx-1 px-1 p-0.5 text-sm rounded-lg'
              ></input>
              <p className='text-xs text-rose-500'>{nicknameMessage}</p>
            </div>
            <div id='user-image' className='my-2'>
              <p className='text-sm'>💙 프로필 이미지 </p>
              <div className='flex'>
                <img
                  src={profile.img}
                  alt='profile'
                  className='inline-block w-20 h-20 p-1 mr-3 rounded-md'
                ></img>
                <div className='flex'>
                  <p className='my-2'>
                    <input
                      type='file'
                      accept='image/*'
                      onChange={onUploadImage}
                      className='inline-block w-full text-sm text-slate-500 file:text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-violet-100 file:text-violet-700 hover:file:bg-violet-200'
                    />
                    <button
                      type='button'
                      className='inline-block px-4 py-2 my-2 text-xs font-semibold border-0 rounded-full bg-violet-100 text-violet-500 hover:bg-violet-200'
                      onClick={onUploadBaseImage}
                    >
                      기본 이미지로 선택하기
                    </button>
                  </p>
                </div>
              </div>
            </div>
            <div id='user-introduction-div'>
              <p htmlFor='user-name' className='text-sm'>
                💙 프로필 소개글 :
              </p>
              <textarea
                type='text'
                id='user-name'
                defaultValue={currentInfo.current || ''}
                onChange={onChangeInfo}
                className='font-medium m-0.5 p-1 h-28 rounded-md text-sm w-full'
              ></textarea>
              <p className='text-xs text-rose-600'>{infoMessage}</p>
            </div>

            <button
              className='hover:bg-sky-700 bg-cyan-600 text-white px-2.5 py-1 rounded-3xl m-auto block text-sm'
              onClick={userUpdate}
            >
              수정하기
            </button>
          </form>
        </div>
      </div>
    );
  }
};

export default TuningProfile;
