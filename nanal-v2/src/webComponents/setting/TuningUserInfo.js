import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios_api from '../../config/Axios';
import { removeCookie } from '../../config/Cookie';
import Modal from '../modal/Modal';

const TuningUserInfo = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  
  const [isClick, setIsClick] = useState(false);
  
  const [isPassConfirm, setIsPassConfirm] = useState(false);
  const [prevPassword, setPrevPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');
  
  useEffect(() => {
    setIsPassConfirm(false)
  },[modalOpen === false])

  const onChangePrevPassword = (e) => {
    const currentPrevPassword = e.target.value;
    setPrevPassword(currentPrevPassword);
  };
  const PrevAxiose = () => {
    axios_api
      .post('user/password', {
        password: prevPassword,
      })
      .then(({ data }) => {
        if (data.statusCode === 200) {
          // Swal.fire({
          //   icon: 'success',
          //   text: '비밀번호 확인완료!',
          //   width: '30%',
          // });
          alert('비밀번호 확인 완료!')
          setPassword('');
          setPrevPassword('');
          setIsPassConfirm(true);
        } else {
          // console.log('입력 조건 불일치 오류: ');
          // console.log(data.statusCode);
          // console.log(data.data.responseMessage);
        }
      })
      .catch(({ error }) => {
        console.log('비밀번호 확인 오류: ' + error);
      });
  }


  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[`~!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegExp.test(currentPassword)) {
      setPasswordMessage(
        '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!'
      );
    } else {
      setPasswordMessage('안전한 비밀번호 입니다.');
    }
  };

  const onChangePasswordConfirm = (e) => {
    const currentPasswordConfirm = e.target.value;
    setPasswordConfirm(currentPasswordConfirm);
    if (password !== currentPasswordConfirm) {
      setPasswordConfirmMessage('비밀번호가 틀렸습니다.');
    } else {
      setPasswordConfirmMessage('똑같은 비밀번호를 입력했습니다.');
    }
  };

  const changePassword = () => {
    if (
      passwordConfirmMessage === '똑같은 비밀번호를 입력했습니다.' &&
      passwordMessage === '안전한 비밀번호 입니다.'
    ) {
      axios_api
        .put('user/password', {
          password: password,
        })
        .then(({ data }) => {
          if (data.statusCode === 200) {
            if (data.data.responseMessage === '비밀번호 변경 성공') {
              Swal.fire({
                icon: 'success',
                text: '비밀번호가 변경되었습니다!',
                width: '30%',
              }).then(() => {
                setPassword('');
                setPasswordConfirm('');
                setIsPassConfirm(false);
                changeClickFalse();
              });
            }
          }
        })
        .catch(({ error }) => {
          console.log('비밀번호 확인 오류: ' + error);
        });
    } else {
      Swal.fire({
        icon: 'warning',
        text: '비밀번호를 다시 확인해주세요!',
        width: '30%',
      }).then(function () {});
    }
  };

  const signOut = (e) => {
    e.preventDefault();

    Swal.fire({
      title: '정말로 저희와 헤어지실 건가요?',
      text: '승인을 하면 탈퇴가 됩니다.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '승인',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        axios_api
          .delete('user/profile')
          .then(({ data }) => {
            if (data.statusCode === 200) {
              localStorage.clear();
              const denyToken = removeCookie('accessToken');

              // token 값이 없어졌다면?
              if (denyToken === undefined) {
                Toast.fire({
                  icon: 'success',
                  title: '그동안 이용해주셔서 감사합니다.',
                  width: '30%',
                }).then(function () {
                  // window.location.replace('/');
                  navigate(`/`, {
                    replace: true,
                  });
                  window.location.reload();
                });
              } else {
                console.log('회원 탈퇴 실패=====');
              }
            } else {
              console.log('회원 탈퇴 오류: ');
              console.log(data.statusCode);
              console.log(data.data.responseMessage);
            }
          })
          .catch(
            (error) => console.log('회원 탈퇴 오류: ' + error)
            //alert(err.response.data.message)
          );
      }
    });
  };

  const changeClickTrue = () => {
    setIsClick(true);
  };
  const changeClickFalse = () => {
    setIsClick(false);
  };
  return (
    <React.Fragment>
      <div
        className='box-border flex justify-between h-12 font-bold rounded-lg indent-4 bg-lime-200/75'
        onClick={() => { changeClickTrue(); openModal(); } }
      >
        <div className='self-center'>회원 정보 수정</div>
      </div>
      <Modal
        open={modalOpen}
        close={closeModal}
        header={
          <div className='box-border flex justify-between h-12 mb-1 rounded-lg indent-4 bg-emerald-200/75'>
            <div className='self-center font-bold'>회원 정보 수정</div>
          </div>
        }
      >
        {/* <div
          className='box-border flex justify-between h-12 rounded-lg indent-4 bg-emerald-200/75'
          onClick={() => {
            changeClickFalse();
            setIsPassConfirm(false);
            setPassword('');
            setPasswordConfirm('');
            setPasswordMessage('');
            setPasswordConfirmMessage('');
          }}
        >
          <div className='self-center font-bold'>회원 정보 수정</div>
        </div> */}
      
          <div>
            {isPassConfirm === false ? (
              <div>
                <div>
                  <p className='m-1 mx-3'>현재 비밀번호를 입력해주세요.</p>
                  <input
                    type='password'
                    value={prevPassword}
                    onChange={onChangePrevPassword}
                    className='w-[220px] m-1 border-b-2'
                  />
                </div>
                <div className="flex justify-end">
                  <button className='hover:bg-blue-800 bg-blue-600 text-white px-2.5 py-1 rounded-md my-auto mr-5 block text-sm'
                    onClick={PrevAxiose}
                  >확인</button>
                  <button
                    className='hover:bg-red-700 bg-red-500 text-white px-2.5 py-1 rounded-md my-auto block text-sm'
                    onClick={closeModal}
                  >
                    닫기
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="grid">
                  <div>
                    <p className='m-1 mx-3'>변경할 비밀번호를 입력해주세요.</p>
                    <input
                      type='password'
                      value={password}
                      onChange={onChangePassword}
                      className='w-[300px] m-1 border-b-2 '
                    />
                    <p className='w-4/5 m-1 mx-3 text-xs text-red-500 rounded-md'>
                      {passwordMessage}
                    </p>
                    <p className='m-1 mx-3 my-2'>
                      변경할 비밀번호를 한 번 더 입력해주세요.
                    </p>
                    <input
                      type='password'
                      value={passwordConfirm}
                      onChange={onChangePasswordConfirm}
                      className='w-[300px] m-1 border-b-2 '
                    />
                    <p className='w-4/5 m-1 mx-3 text-xs text-red-500 rounded-md'>
                      {passwordConfirmMessage}
                    </p>
                  </div>
                  
                </div>
                
                <div className="flex justify-between">
                  <button
                    className='float-right mt-2 pl-3 text-sm underline decoration-solid text-gray-500'
                    onClick={signOut}
                  >
                    회원 탈퇴
                  </button>
                  <div className="flex justify-end">
                    <button
                      type='button'
                      onClick={changePassword}
                      className='justify-self-end hover:bg-blue-800 bg-blue-500 text-white px-2.5 py-1 rounded-md my-1 block text-md'
                    >
                      비밀번호 변경
                    </button>
                    <button
                      className='hover:bg-red-700 bg-red-500 text-white pl-1 ml-3 py-1 rounded-md my-auto block text-md w-12'
                      onClick={closeModal}
                    >
                      닫기
                    </button>
                  </div>
                </div>
              </div>)}
          </div>
        
      </Modal>
    </React.Fragment>
  );
  // if (isClick === false) {
  //   return (
  //     <div
  //       className='box-border flex justify-between h-12 font-bold rounded-lg indent-4 bg-lime-200/75'
  //       onClick={changeClickTrue}
  //     >
  //       <div className='self-center'>회원 정보 수정</div>
  //       <img src={downArrow} className='self-center mr-3' />
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div>
  //       <div
  //         className='box-border flex justify-between h-12 rounded-lg indent-4 bg-emerald-200/75'
  //         onClick={() => {
  //           changeClickFalse();
  //           setIsPassConfirm(false);
  //           setPassword('');
  //           setPasswordConfirm('');
  //           setPasswordMessage('');
  //           setPasswordConfirmMessage('');
  //         }}
  //       >
  //         <div className='self-center font-bold'>회원 정보 수정</div>
  //         <img src={upArrow} className='self-center mr-3' />
  //       </div>
  //       <div>
  //         <div>
  //           {isPassConfirm === false ? (
  //             <div>
  //               <p className='m-1 mx-3'>현재 비밀번호를 입력해주세요.</p>
  //               <input
  //                 type='password'
  //                 value={prevPassword}
  //                 onChange={onChangePrevPassword}
  //                 className='w-4/5 px-2 m-1 mx-3 rounded-md'
  //               />
  //             </div>
  //           ) : (
  //             <div>
  //               <div>
  //                 <div>
  //                   <p className='m-1 mx-3'>변경할 비밀번호를 입력해주세요.</p>
  //                   <input
  //                     type='password'
  //                     value={password}
  //                     onChange={onChangePassword}
  //                     className='w-4/5 px-2 m-1 mx-3 rounded-md'
  //                   />
  //                   <p className='w-4/5 m-1 mx-3 text-xs text-red-500 rounded-md'>
  //                     {passwordMessage}
  //                   </p>
  //                   <p className='m-1 mx-3 my-2'>
  //                     변경할 비밀번호를 한 번 더 입력해주세요.
  //                   </p>
  //                   <input
  //                     type='password'
  //                     value={passwordConfirm}
  //                     onChange={onChangePasswordConfirm}
  //                     className='w-4/5 px-2 m-1 mx-3 rounded-md'
  //                   />
  //                   <p className='w-4/5 m-1 mx-3 text-xs text-red-500 rounded-md'>
  //                     {passwordConfirmMessage}
  //                   </p>
  //                 </div>
  //                 <button
  //                   type='button'
  //                   onClick={changePassword}
  //                   className='m-1 mx-3 font-bold'
  //                 >
  //                   비밀번호 변경
  //                 </button>
  //               </div>
  //               <button
  //                 className='float-right mt-2 text-sm underline decoration-solid'
  //                 onClick={signOut}
  //               >
  //                 회원 탈퇴
  //               </button>
  //             </div>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
};

export default TuningUserInfo;

const Toast = Swal.mixin({
  toast: true,
  // position: 'center-center',
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});
