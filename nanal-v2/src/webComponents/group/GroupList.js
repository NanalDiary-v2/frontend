import React, { useState, useEffect } from 'react';
import axios_api from '../../config/Axios';
import { onLogin } from '../../config/Login';
import GroupItem from './GroupItem';
import addIcon from '../../src_assets/img/group_add_icon.png';
import downarrow from '../../src_assets/img/arrow_drop_down.png';
import uparrow from '../../src_assets/img/arrow_drop_up.png';

function GroupList({ setGroupCompo, setGroupIdx }) {
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
    <div id='group-list' className='pr-2 overflow-auto w-80 h-80'>
      <div id='group-list-title' className='mb-2'>
        <h1 className='inline m-1 ml-2 font-bold'>그룹 리스트</h1>
        <ul
          onClick={() => {
            setView(!view);
          }}
          className='inline-block'
        >
          {/* view가 true면 올리는 아이콘, false면 내리는 아이콘 보여줌 */}
          {view ? (
            <div className='w-3 h-3 mt-1 ml-2'>
              <img src={uparrow} className='w-full h-full' />
            </div>
          ) : (
            <div className='w-3 h-3 mt-1 ml-2'>
              <img src={downarrow} className='w-full h-full' />
            </div>
          )}
          {/* view가 true일 때만 Dropdown 컴포넌트 렌더링 */}
          {view && (
            <div className='p-2 text-center bg-white rounded-lg absolute border-[4px] border-blue-400/75'>
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
        <div
          className='inline-block float-right pl-5 ml-5'
          onClick={() => setGroupCompo([false, true, false, false, false])}
        >
          <img src={addIcon} className='w-[22px] h-[22px] mx-1.5' />
        </div>
      </div>
      {groupList.map((groupItem) => (
        <GroupItem
          key={groupItem.groupDetail.groupIdx}
          item={groupItem}
          setGroupIdx={setGroupIdx}
          setGroupCompo={setGroupCompo}
        />
      ))}
    </div>
  );
}

export default GroupList;
