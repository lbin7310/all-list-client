import ReactDOM from 'react-dom';

// 생성한 모달을 APP 외부 Dom 에 뿌려주는 역할을 하는 파일
// children은 <ModalPortal><Modal />></ModalPortal> 처럼 ModalPortal 내부에 들어올 Modal을 의미함

const ModalPortal = ({ children }) => {
  // public/index.html 돔트리 안에 'id=modal을 값을 불러옴'
  const el = document.getElementById('modal');
  // ReactDom.createPortal( 만들어준 컴포넌트를 , el 위치에 뿌리겠다!)
  return ReactDOM.createPortal(children, el);
};

export default ModalPortal;