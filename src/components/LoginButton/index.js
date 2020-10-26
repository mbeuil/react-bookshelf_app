import LoginForm from 'components/LoginForm';
import * as G from 'styles/common-styles';
import * as S from './styles';

function LoginButton({type, method}) {
  const [isOpen, setIsOpen] = method;
  const dialogForm = `${type.toLowerCase()} form`;
  const variant = type === 'Login' ? 'primary' : 'secondary';
  const handleSubmit = formData => console.log(type, formData);
  const close = () => setIsOpen('none');

  return (
    <>
      <G.Button variant={variant} onClick={() => setIsOpen(type)}>
        {type}
      </G.Button>
      <S.Dialog aria-label={dialogForm} isOpen={isOpen === type}>
        <LoginForm onSubmit={handleSubmit} title={type} close={close} />
      </S.Dialog>
    </>
  );
}

export default LoginButton;
