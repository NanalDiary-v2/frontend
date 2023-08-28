import { Routes, Route } from 'react-router-dom';
import LogoHome from '../mobileComponents/LogoHome.js';
import Calendar from '../mobileComponents/Calendaar.js';
import BookCase from '../mobileComponents/BookCase.js';
import SignIn from '../mobileComponents/account/SignIn.js';
import SignUp from '../mobileComponents/account/SignUp.js';
import KakaoLogin from '../mobileComponents/account/KaKaoLogin.js';
import DiaryCreate from '../mobileComponents/diary/DiaryCreate';
import DiaryList from '../mobileComponents/diary/DiaryList';
import DiaryUpdate from '../mobileComponents/diary/DiaryUpdate.js';
import DiaryDetail from '../mobileComponents/diary/DiaryDetail';
import BookmarkList from '../mobileComponents/diary/BookmarkList';
import GroupCreate from '../mobileComponents/group/GroupCreate';
import GroupList from '../mobileComponents/group/GroupList';
import GroupDetail from '../mobileComponents/group/GroupDetail';
import GroupSetting from '../mobileComponents/group/GroupSetting';
import GroupUpdate from '../mobileComponents/group/GroupUpdate';
import FriendList from '../mobileComponents/friend/FriendList';
import FriendDetail from '../mobileComponents/friend/FriendDetail';
import FriendAdd from '../mobileComponents/friend/FriendAdd';
import AlarmList from '../mobileComponents/another/AlarmList.js';
// import AlarmItem from '../components/another/AlarmItem.js';
import MyPage from '../mobileComponents/mypage/MyPage.js';
import Tuning from '../mobileComponents/mypage/setting/Tuning';
import RecycleBin from '../mobileComponents/another/RecycleBin';
import Search from '../mobileComponents/another/SearchList';
import NotFound from '../mobileComponents/another/NotFound.js';

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
