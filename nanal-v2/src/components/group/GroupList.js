import React, { useState, useEffect } from 'react';
import axios_api from '../../config/Axios';
import { onLogin } from '../../config/Login';
import { Link } from 'react-router-dom';
import GroupItem from './GroupItem';
import addIcon from '../../src_assets/img/group_add_icon.png';
import downarrow from '../../src_assets/img/arrow_drop_down.png';
import uparrow from '../../src_assets/img/arrow_drop_up.png';

function GroupList() {
  const [view, setView] = useState(false);
  const [groupList, setGroupList] = useState([]);

  const bringGroupList = (index) => {
    axios_api
      .get(`group/list/${index}`)
      .then(({ data }) => {
        if (data.statusCode === 200) {
          setGroupList(null);
          if (data.data.responseMessage === '그룹 리스트 조회 성공') {
            setGroupList(data.data.groupList);
            // console.log(data.data.groupList);
          }
        } else {
          console.log(data.statusCode);
          console.log(data.data.responseMessage);
        }
      })
      .catch(({ error }) => {
        console.log('그룹 리스트 불러오기 오류: ' + error);
      });
  };

  const groupListReload = (index) => {
    bringGroupList(index);
  };

  useEffect(() => {
    onLogin();
    // bringGroupList(0);
    axios_api
      .get(`group/list/0`)
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
  }, []);

  return (
    <div id='group-list'>
      <div id='group-list-title' className='mb-3'>
        <h1 className='inline m-1 font-bold'>그룹 리스트</h1>
        <ul
          onClick={() => {
            setView(!view);
          }}
          className='absolute inline-block'
        >
          {/* view가 true면 올리는 아이콘, false면 내리는 아이콘 보여줌 */}
          {view ? (
            <div className='w-3 h-3 m-1'>
              <img src={uparrow} className='w-full h-full' />
            </div>
          ) : (
            <div className='w-3 h-3 m-1'>
              <img src={downarrow} className='w-full h-full' />
            </div>
          )}
          {/* view가 true일 때만 Dropdown 컴포넌트 렌더링 */}
          {view && (
            <div className='p-2 text-center bg-white rounded-lg'>
              <li className='py-0.5'>
                <button
                  type='button'
                  onClick={() => groupListReload(0)}
                  className='font-bold'
                >
                  가나다 순
                </button>
              </li>
              <hr className='border-gray-500 border-1' />
              <li className='py-0.5'>
                <button
                  onClick={() => groupListReload(1)}
                  className='font-bold'
                >
                  최신 일기 순
                </button>
              </li>
            </div>
          )}
        </ul>
        {/* <Link to='/Group/Create'>
        <button>그룹 생성하기</button>
      </Link> */}
        <Link to='/Group/Create' className='inline-block float-right'>
          <img src={addIcon} className='w-[22px] h-[22px] mx-1.5' />
        </Link>
      </div>
      {groupList.map((groupItem) => (
        <GroupItem key={groupItem.groupDetail.groupIdx} item={groupItem} />
      ))}
    </div>
  );
}

export default GroupList;
