import { Routes, Route } from 'react-router-dom';
import LogoHome from '../components/LogoHome.js';
import Calendar from '../components/Calendaar.js';
import BookCase from '../components/BookCase.js';
import SignIn from '../components/account/SignIn.js';
import SignUp from '../components/account/SignUp.js';
import KakaoLogin from '../components/account/KaKaoLogin.js';
import DiaryCreate from '../components/diary/DiaryCreate';
import DiaryList from '../components/diary/DiaryList';
import DiaryUpdate from '../components/diary/DiaryUpdate.js';
import DiaryDetail from '../components/diary/DiaryDetail';
import BookmarkList from '../components/diary/BookmarkList';
import GroupCreate from '../components/group/GroupCreate';
import GroupList from '../components/group/GroupList';
import GroupDetail from '../components/group/GroupDetail';
import GroupSetting from '../components/group/GroupSetting';
import GroupUpdate from '../components/group/GroupUpdate';
import FriendList from '../components/friend/FriendList';
import FriendDetail from '../components/friend/FriendDetail';
import FriendAdd from '../components/friend/FriendAdd';
import AlarmList from '../components/another/AlarmList.js';
// import AlarmItem from '../components/another/AlarmItem.js';
import MyPage from '../components/mypage/MyPage.js';
import Tuning from '../components/mypage/setting/Tuning';
import RecycleBin from '../components/another/RecycleBin';
import Search from '../components/another/SearchList';
import NotFound from '../components/another/NotFound.js';

const AppMain = ({ isBookCase }) => {
  return (
    <Routes>
      <Route path='/' element={<LogoHome />}></Route>
      {isBookCase ? (
        <Route path='/home' element={<BookCase />}></Route>
      ) : (
        <Route path='/home' element={<Calendar />}></Route>
      )}
      <Route path='/SignUp' element={<SignUp />}></Route>
      <Route path='/SignIn' element={<SignIn />}></Route>
      <Route path='/kakaoLogin' element={<KakaoLogin />}></Route>
      <Route path='/Diary/Create' element={<DiaryCreate />}></Route>
      <Route path='/Diary/List' element={<DiaryList />}></Route>
      <Route path='/Diary/Edit' element={<DiaryUpdate />}></Route>
      <Route path='/Diary/Detail' element={<DiaryDetail />}></Route>
      <Route path='/Group/Create' element={<GroupCreate />}></Route>
      <Route path='/Diary/Bookmark/List' element={<BookmarkList />}></Route>
      <Route path='/Group/List' element={<GroupList />}></Route>
      <Route path='/Group/Detail' element={<GroupDetail />}></Route>
      <Route path='/Group/Setting' element={<GroupSetting />}></Route>
      <Route path='/Group/Update' element={<GroupUpdate />}></Route>
      <Route path='/Friend/List' element={<FriendList />}></Route>
      <Route path='/Friend' element={<FriendDetail />}></Route>
      <Route path='/Friend/Add' element={<FriendAdd />}></Route>
      <Route path='/Alarm' element={<AlarmList />}></Route>
      <Route path='/Tuning' element={<Tuning />}></Route>
      <Route path='/MyPage' element={<MyPage />}></Route>
      <Route path='/RecycleBin' element={<RecycleBin />}></Route>
      <Route path='/Search' element={<Search />}></Route>
      <Route path='*' element={<NotFound />}></Route>
    </Routes>
  );
};

export default AppMain;
