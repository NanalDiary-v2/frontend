import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import axios_api from '../../config/Axios';
import { onLogin } from '../../config/Login';

function GroupCreate() {
  const navigate = useNavigate();

  const [groupName, setGroupName] = useState('');
  const [groupTag, setGroupTag] = useState([]);
  const [tagNum, setTagNum] = useState(0);
  let [tagNew, setTagNew] = useState('');
  const [friendList, setFriendList] = useState([]);
  const [includeFriend, setIncludeFriend] = useState([]);
  const [includeFriendIdx, setIncludeFriendIdx] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  // 그룹명
  const [currentGMessage, setCurrentGMessage] = useState('');
  const [isCurrentGName, setIsCurrentGName] = useState(false);
  const onChangeName = (e) => {
    const currentName = e.target.value;
    setGroupName(e.target.value);

    if (currentName.length < 2 || currentName.length > 15) {
      setCurrentGMessage('그룹명은 2글자 이상, 14글자 이하로 입력해주세요!');
      setIsCurrentGName(false);
    } else {
      setCurrentGMessage('');
      setIsCurrentGName(true);
    }
  };

  // 태그명 작성 부분
  const [currentGTMessage, setCurrentGTMessage] = useState('');
  const [isCurrentGTName, setIsCurrentGTName] = useState(false);
  const onChangeTagNew = (e) => {
    const currentName = e.target.value;
    setTagNew(e.target.value);

    if (currentName.length < 2 || currentName.length > 10) {
      setCurrentGTMessage('태그명은 2글자 이상, 10글자 이하로 입력해주세요!');
      setIsCurrentGTName(false);
    } else {
      setCurrentGTMessage('');
      setIsCurrentGTName(true);
    }
  };

  // 그룹 태그 추가
  function addTag(e) {
    e.preventDefault();

    if (groupTag.length === 5) {
      alert('태그는 5개까지만 가능합니다.');
      setTagNew('');
    } else if (tagNew !== '' && isCurrentGTName === true) {
      let tagList = [...groupTag];
      tagList.push(tagNew);
      setGroupTag(tagList);
      setTagNew('');
    }
  }

  // 그룹 태그 제거
  const onChangeTagRemove = (id) => {
    // tag.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = tag.id 가 id 인 것을 제거함
    let tagList = [...groupTag];
    tagList.splice(id, 1);
    setGroupTag(tagList);
  };

  // 그룹 이미지 upload
  // const inputRef = useRef();
  const formData = new FormData();

  // const onUploadImage = (e) => {
  //   if (!e.target.files) {
  //     return;
  //   }
  //   // console.log(e.target.files[0]);
  //   formData.append('multipartFile', e.target.files[0]);
  // };

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
    // formData.append('multipartFile', file);
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

    actionImgCompress(e.target.files[0]);

    // setImageFile(e.target.files[0]);
    // console.log(e.target.files[0]);
  };

  // 초대할 사용자 추가
  const addFriend = (idx) => {
    if (!includeFriend.includes(friendList[idx])) {
      let addfriendList = [...includeFriend];
      addfriendList.push(friendList[idx]);
      setIncludeFriend(addfriendList);

      let addfriendListIdx = [...includeFriendIdx];
      addfriendListIdx.push(friendList[idx].userIdx);
      setIncludeFriendIdx(addfriendListIdx);
    }
  };

  // 초대할 사용자 제거
  const onChangeFRemove = (idx) => {
    let addfriendList = [...includeFriend];
    addfriendList.splice(idx, 1);
    setIncludeFriend(addfriendList);

    let addfriendListIdx = [...includeFriendIdx];
    addfriendListIdx.splice(idx, 1);
    setIncludeFriendIdx(addfriendListIdx);
  };

  // 그룹 생성 요청 함수
  const GroupCreate = (e) => {
    e.preventDefault();

    if (groupTag.length !== 5) {
      const len = 5 - groupTag.length;
      for (let i = 0; i < len; i++) {
        groupTag.push('');
      }
    }

    if (isCurrentGName === true) {
      axios_api
        .post('/group', {
          groupName: groupName,
          tags: groupTag,
        })
        .then(({ data }) => {
          if (data.statusCode === 200) {
            if (data.data.responseMessage === '그룹 생성 성공') {
              // console.log(data.data.groupDetail);
              // console.log(data.data.tags);

              const groupidx = data.data.groupDetail.groupIdx;
              // const headers = {
              //   Authorization: `Bearer ${getCookie('accessToken')}`,
              //   'Content-Type': 'multipart/form-data',
              // };
              const dataSet = { groupIdx: groupidx };
              formData.append(
                'value',
                new Blob([JSON.stringify(dataSet)], {
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
                .post('file/s3', formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                })
                .then(({ data }) => {
                  if (data.statusCode === 200) {
                    if (data.data.responseMessage === '그림 저장 성공') {
                      // console.log(data.data);
                      if (includeFriend.length !== 0) {
                        // 그룹에 추가할 친구가 있는 경우
                        axios_api
                          .post('notification/group', {
                            request_group_idx: [groupidx],
                            userIdx: includeFriendIdx,
                          })
                          .then(({ data }) => {
                            if (data.statusCode === 200) {
                              if (
                                data.data.responseMessage === '알림 저장 성공'
                              ) {
                                navigate(`/Group/Setting`, {
                                  state: { groupIdx: groupidx },
                                  replace: true,
                                });
                              }
                            } else {
                              console.log('알림 저장 오류 : ');
                              console.log(data.statusCode);
                              console.log(data.data.responseMessage);
                            }
                          })
                          .catch(({ error }) => {
                            console.log('알림 저장 오류 : ' + error);
                          });
                      } else {
                        navigate(`/Group/Setting`, {
                          state: { groupIdx: groupidx },
                          replace: true,
                        });
                      }
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
            }
          } else {
            console.log('그룹 생성 오류: ');
            console.log(data.statusCode);
            console.log(data.data.responseMessage);
          }
        })
        .catch(({ error }) => {
          console.log('그룹 생성 오류: ' + error);
        });
    }
  };

  useEffect(() => {
    onLogin();
    axios_api
      .get(`friend/list`)
      .then(({ data }) => {
        if (data.statusCode === 200) {
          setFriendList(null);
          if (data.data.responseMessage === '친구 리스트 조회 성공') {
            setFriendList(data.data.friendList);
          } else if (data.data.responseMessage === '데이터 없음') {
            setFriendList([]);
          }
        } else {
          console.log('친구 리스트 조회 오류: ');
          console.log(data.statusCode);
          console.log(data.data.responseMessage);
        }
      })
      .catch(({ error }) => {
        console.log('친구 리스트 조회 오류: ' + error);
      });
  }, []);

  return (
    <div id='group-Profile'>
      <h1 className='m-1 text-lg font-bold text-center'> 그룹 생성 </h1>
      <div id='group-create-form'>
        <p className='my-2 text-center'>✨ 그룹 프로필 ✨</p>
        {/* 그룹 이름 생성 */}
        <div id='group-name-div'>
          <label htmlFor='group-name'>그룹 이름 : </label>
          <input hidden='hidden' />
          <input
            type='text'
            id='group-name'
            onChange={onChangeName}
            className='p-1 m-0.5 font-bold rounded-lg'
          ></input>
          <p className='text-xs text-rose-600'>{currentGMessage}</p>
        </div>
        {/* 그룹 태그 생성 */}
        <div id='group-tag-div' className='mb-2'>
          <label htmlFor='group-tag'>그룹 태그 : </label>
          <input hidden='hidden' />
          <input
            type='text'
            id='group-tag'
            onChange={onChangeTagNew}
            value={tagNew}
            className='w-fit p-1 m-0.5 rounded-lg'
          />
          <button
            type='button'
            onClick={addTag}
            className='p-1 ml-3 rounded-xl bg-violet-100 text-violet-700'
          >
            추가
          </button>
          <p className='text-xs text-rose-600'>{currentGTMessage}</p>
          <p htmlFor='group-tag'>(5개까지 가능)</p>
          {groupTag.map((tagging, idx) => {
            return (
              <button
                type='button'
                onClick={() => {
                  setTagNum(idx);
                  onChangeTagRemove(idx);
                }}
                key={idx}
                className='items-center inline-block p-1 my-0.5 mr-4 space-y-3 rounded-lg bg-slate-200 hover:bg-blue-300'
              >
                #{tagging}
              </button>
            );
          })}
        </div>
        {/* 그룹 프로필 이미지 업로드 */}
        <div id='group-image-div'>
          <input
            type='file'
            accept='image/*'
            // ref={inputRef}
            onChange={onUploadImage}
            className='block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-100 file:text-violet-700 hover:file:bg-violet-200'
          />
        </div>
        {/* 그룹 친구 추가*/}
        <div id='group-user-div'>
          <p className='my-2 text-center'>✨ 추가 된 사용자 ✨</p>

          <div className='items-center justify-between mb-2 text-center'>
            {includeFriend.map((friendItem, idx) => {
              return (
                <div
                  key={idx}
                  className='items-center inline-block my-1 text-center w-36'
                >
                  <button
                    type='button'
                    onClick={() => {
                      onChangeFRemove(idx);
                    }}
                    className='px-2 rounded-lg bg-slate-200 hover:bg-blue-300'
                  >
                    {friendItem.nickname}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <button
          type='button'
          onClick={GroupCreate}
          className='hover:bg-sky-700 bg-cyan-600 text-white px-2.5 py-1 rounded-3xl m-auto block'
        >
          생성하기
        </button>
      </div>

      <div id='group-Friend'>
        <hr className='my-5 border-solid border-1 border-slate-800 w-80' />

        <p className='mb-0.5'>🤗 내 친구 목록 --------------------</p>

        <div className='items-center justify-between text-center'>
          {friendList.map((friendItem, idx) => {
            return (
              <div
                key={idx}
                className='items-center inline-block my-1 text-center w-36'
              >
                <button
                  type='button'
                  onClick={() => {
                    addFriend(idx);
                  }}
                  // className='items-center inline-block px-2 mx-auto my-1 rounded-lg bg-slate-100 hover:bg-blue-200'
                  className='px-2 rounded-lg bg-slate-200 hover:bg-blue-300'
                >
                  {friendItem.nickname}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default GroupCreate;

function getByteLength(strValue) {
  let byte = 0;
  for (var i = 0; i < strValue.length; i++) {
    const code = strValue.charCodeAt(0);

    if (code > 127) {
      byte += 2;
    } else if (code > 64 && code < 91) {
      byte += 2;
    } else {
      byte += 1;
    }
  }
  return byte;
}

// const instance = axios.create({
//   baseURL: `http://192.168.100.208:8080/nanal/`,
//   headers: {
//     'content-type': 'application/json;charset=UTF-8',
//     Authorization: `Bearer ${getCookie('accessToken')}`,
//     accept: 'application/json,',
//   },
// });

// const instances = {
//   createGroup: (data) =>
//     instance.post(`file/s3`, data, {
//       headers: {
//         'Content-Type': `multipart/form-data`,
//       },
//     }),
// };

// const Toast = Swal.mixin({
//   toast: true,
//   // position: 'center-center',
//   showConfirmButton: false,
//   timer: 500,
//   timerProgressBar: true,
//   didOpen: (toast) => {
//     toast.addEventListener('mouseenter', Swal.stopTimer);
//     toast.addEventListener('mouseleave', Swal.resumeTimer);
//   },
// });
