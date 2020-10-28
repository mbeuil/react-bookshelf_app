import 'bootstrap/dist/css/bootstrap-reboot.css';
import '@reach/dialog/styles.css';
import {useState} from 'react';
import LoginButton from 'components/LoginButton';
import {Logo} from 'components/Logo';
import BookSearch from 'components/BookSearch';
import * as S from './styles';

function App() {
  const modal = useState('none');

  return (
    <S.AppContainer>
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <S.ButtosnContainer>
        <LoginButton type="Login" method={modal} />
        <LoginButton type="Register" method={modal} />
      </S.ButtosnContainer>
      <BookSearch />
    </S.AppContainer>
  );
}

export default App;
