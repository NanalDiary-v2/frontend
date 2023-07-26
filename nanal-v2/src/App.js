import { BrowserView, MobileView } from 'react-device-detect';
import './App.css';
import React from 'react';

function App() {

  return (
    <div id='App'>

      <BrowserView>
        <div className='justify-center App'>
          웹 페이지 구성
        </div>
      </BrowserView>

      <MobileView>
        <div>
          모바일 페이지 구성
        </div>
      </MobileView>
    </div>
  );
}

export default App;