import {useState} from 'react';
import VisuallyHidden from '@reach/visually-hidden';
import * as G from 'styles/common-styles';
import * as S from './styles';

function LoginForm({onSubmit, title, close}) {
  const [infos, setInfos] = useState({
    username: '',
    password: '',
  });
  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(infos);
  };
  const handleChange = event => {
    const {id, value} = event.target;
    setInfos({...infos, [id]: value});
  };
  const {username, password} = infos;

  return (
    <>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <S.CircleButton onClick={close}>
          <VisuallyHidden>Close</VisuallyHidden>
          <span aria-hidden>×</span>
        </S.CircleButton>
      </div>
      <h3 style={{textAlign: 'center', fontSize: '2em'}}>{title}</h3>
      <S.Form onSubmit={handleSubmit}>
        <S.FormGroup>
          <label htmlFor="username">Username:</label>
          <G.Input id="username" value={username} onChange={handleChange} />
        </S.FormGroup>
        <S.FormGroup>
          <label htmlFor="password">Password:</label>
          <G.Input
            id="password"
            type="password"
            value={password}
            onChange={handleChange}
          />
        </S.FormGroup>
        <div>
          <G.Button type="submit">{title}</G.Button>
        </div>
      </S.Form>
    </>
  );
}

export default LoginForm;
