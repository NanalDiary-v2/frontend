import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import axios_api from '../../config/Axios';
import { onLogin } from '../../config/Login';
import Modal from '../modal/Modal';

const TuningProfile = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const [profile, setProfile] = useState({});
  let originName = '';
  let currentName = useRef('');
  let currentInfo = useRef('');

  // 사용자 닉네임
  const [nickName, setNickName] = useState('');
  const [nickNameMessage, setNickNameMessage] = useState('');
  const [isNickname, setIsNickname] = useState(true);

  const nickNameMessageCss = isNickname === true ? '' : 'text-rose-600';

  const onChangeNickName = (e) => {
    currentName.current = e.target.value;
    setNickName(currentName.current);

    if (currentName.current.length < 2 || currentName.current.length > 8) {
      setNickNameMessage('닉네임은 2글자 이상 8글자 이하로 입력해주세요!');
      setIsNickname(false);
    } else {
      setNickNameMessage('');
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

  const onUploadImage = (e) => {
    // e.preventDefault();

    if (!e.target.files) {
      return;
    }

    setIsImgChecked(true);
    setImageFile(e.target.files[0]);
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
                        axios_api
                          .get('user/profile')
                          .then(({ data }) => {
                            if (data.statusCode === 200) {
                              if (
                                data.data.responseMessage ===
                                '회원 정보 조회 성공'
                              ) {
                                // console.log(data.data.profile);
                                window.localStorage.setItem(
                                  'profileDays',
                                  data.data.profile.days
                                );
                                window.localStorage.setItem(
                                  'profileImg',
                                  data.data.profile.img
                                );
                                window.localStorage.setItem(
                                  'profileIntroduction',
                                  data.data.profile.introduction
                                );
                                window.localStorage.setItem(
                                  'profileNickname',
                                  data.data.profile.nickname
                                );
                                window.location.reload();
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
                        closeModal();
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
                console.log('이미지를 변경하지 않는 경우');
                axios_api
                  .get('user/profile')
                  .then(({ data }) => {
                    console.log(data);
                    if (data.statusCode === 200) {
                      if (data.data.responseMessage === '회원 정보 조회 성공') {
                        // console.log(data.data.profile);
                        // console.log('회원 정보 조회 성공');
                        window.localStorage.setItem(
                          'profileDays',
                          data.data.profile.days
                        );
                        window.localStorage.setItem(
                          'profileImg',
                          data.data.profile.img
                        );
                        window.localStorage.setItem(
                          'profileIntroduction',
                          data.data.profile.introduction
                        );
                        window.localStorage.setItem(
                          'profileNickname',
                          data.data.profile.nickname
                        );
                        // 여긴데... 흠...
                        window.location.reload();
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
                // console.log('안녕하세요');
                // openModal();
                closeModal();
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
      // Swal.fire({
      //   icon: 'warning',
      //   text: '닉네임을 다시 확인해주세요.',
      //   width: '60%',
      // }).then(function () {});
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
            originName = data.data.profile.nickname;
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
  return (
    <React.Fragment>
      <div
        className='box-border flex justify-between h-12 font-bold rounded-lg cursor-pointer indent-4 bg-lime-400/75'
        onClick={openModal}
      >
        <div className='self-center'>프로필 수정</div>
      </div>
      <Modal
        open={modalOpen}
        close={closeModal}
        header={
          <div className='box-border flex justify-between h-12 mb-1 rounded-lg indent-4 bg-emerald-200/75'>
            <div className='self-center font-bold'>프로필 수정</div>
          </div>
        }
      >
        <div>
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
                  onChange={(e) => {
                    onChangeNickName(e);
                  }}
                  className='font-medium m-0.5 mx-1 px-1 p-0.5 text-sm rounded-lg'
                ></input>
                <p className={`text-xs ${nickNameMessageCss}`}>
                  {nickNameMessage}
                </p>
              </div>
              <div id='user-image' className='my-2'>
                <p className='text-sm'>💙 프로필 이미지 </p>
                <div className='flex'>
                  <img
                    src={profile.img}
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
                <label htmlFor='user-name' className='text-sm'>
                  💙 프로필 소개글 :
                </label>
                <textarea
                  type='text'
                  id='user-name'
                  defaultValue={currentInfo.current || ''}
                  onChange={onChangeInfo}
                  className='font-medium m-0.5 w-full h-28 rounded-md text-sm border border-teal-600 indent-2 p-1'
                ></textarea>
                <p className='text-xs'>{infoMessage}</p>
              </div>
              <div className='flex justify-end'>
                <button
                  className='hover:bg-sky-700 bg-cyan-600 text-white px-2.5 py-1 rounded-3xl my-auto mr-5 block text-sm'
                  onClick={userUpdate}
                >
                  수정하기
                </button>
                <button
                  className='hover:bg-red-700 bg-red-500 text-white px-2.5 py-1 rounded-3xl my-auto block text-sm'
                  onClick={closeModal}
                >
                  닫기
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
  // return (

  // );
};

export default TuningProfile;
