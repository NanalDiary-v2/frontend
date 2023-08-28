import { useEffect } from 'react';
import ProfileForm from './profile/ProfileForm';
import Settings from './setting/Settings.js';
import { onLogin } from '../../config/Login';

function MyPage() {
  useEffect(() => {
    onLogin();
  }, []);

  return (
    <div>
      <ProfileForm />
      <hr className='my-6 border-slate-500/75 w-80' />
      <Settings />
    </div>
  );
}

export default MyPage;
