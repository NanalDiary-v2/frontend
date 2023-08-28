import React from 'react';

function GroupItem({ item, setGroupIdx, setGroupCompo }) {
  return (
    <div onClick={() => { setGroupIdx(item.groupDetail.groupIdx); setGroupCompo([false, false, true, false, false]); }}>
      {/* <div
        to={`/Group/Detail`}
        state={{ groupIdx: item.groupDetail.groupIdx, isToggle: 2 }}
      > */}
        <div className='flex bg-[#F7F7F7] border-2 border-solid border-slate-400 rounded-lg m-1 mb-3 p-2'>
          <img
            src={item.groupDetail.imgUrl}
            className='inline-block w-1/4 p-1 rounded-lg h-1/4'
          ></img>
          <div className='inline-block px-1 m-1 break-words'>
            <p className='font-bold text-lg mb-0.5'>
              {item.groupDetail.groupName}
            </p>
            <div>
              {item.tags.map((tagging, idx) => {
                if (tagging.tag)
                  return (
                    <span key={idx} className='mr-1 text-sm break-all'>
                      #{tagging.tag}
                    </span>
                  );
                // return tagging.tag ? <span key={idx}>#{tagging.tag}</span> : <></>;
              })}
            </div>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
}

export default GroupItem;
