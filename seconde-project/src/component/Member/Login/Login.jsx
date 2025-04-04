import { useState ,useContext} from "react";
import { Button, Container, Form, Input, Title } from "../../styles/Styles";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navi = useNavigate();
  const [msg,setMsg] = useState();
  const [memberId,setMemberId] = useState();
  const [memberPw,setMemberPw] = useState();
  const {auth,login} = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();  // form태그 submit버튼 기본이벤트 제거


  const regxep = /^[a-zA-Z0-9]+$/;
  if (!regxep.test(memberId)){
    setMsg("아이디값이 유효하지 않습니다.");
    return;
  }



  axios.post("http://localhost/auth/login",{
    memberId : memberId,
    memberPw : memberPw
  }).then(result => {
    console.log(result);
    if(result.status === 200){
      alert('로그인에 성공하셨습니다~');
      setTimeout(()=>{
      navi(-1);
    },1000);}

    const {memberId,memberName,memberNo,accessToken,refreshToken} = result.data;
    login(memberNo,memberId,memberName,accessToken,refreshToken);
    // result 담는 방법 
    /* localStorage.setItem("memberId",memberId);  // 브라우저 꺼도 유지됨
    localStorage.setItem("memberName",memberName);  
    localStorage.setItem("memberNo",memberNo); 
    localStorage.setItem("accessToken",accessToken);  
    localStorage.setItem("refreshToken",refreshToken);   */
    // sessionStorage.setItem; => 브라우저 끄면 날아감
  }).catch((error) => {
    console.log(error);
    
    alert(error.response.data['error-message']);
    // alert(error.response.data.memberId);
  });
}



  return (
    <>
      <Container height="300px">
        <Form onSubmit={handleLogin}>
          <Title>로그인</Title>
          <Input onChange={e =>setMemberId(e.target.value)} type="text" placeholder="아이디를 입력해주세요." required />
          <label style={{fontSize:"13px",color:"crimson"}}>{msg}</label>
          <Input
            onChange={e =>setMemberPw(e.target.value)}
            type="password"
            placeholder="비밀번호를 입력해주세요."
            required
          />
          <Button type="submit">즐거운 로그인하기</Button>
        </Form>
      </Container>
    </>
  );
};
export default Login;