import {
  Container,
  Label,
  Title,
  Input,
  ImagePreview,
  Form,
  ImageContainer,
  Button,
} from "../styles/Styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BoardForm = () => {


  const navi = useNavigate();
  const [boardTitle, setBoardTitle] = useState("");
  const [boardContent, setBoardContent] = useState("");
  const [memberName, setMemberName] = useState("");
  const [file, setFile] = useState(null);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    if(!localStorage.getItem("accessToken")){
      alert("괘씸하다");
      navi("login");
    } else {
      setMemberName(localStorage.getItem("memberName"));
      setAccessToken(localStorage.getItem("accessToken"));
    }
  })


  return (
    <Container>
      <Form>
        <Title>게시글 작성이야용</Title>
        <Label>제목</Label>
        <Input type="text" placeholder="제목을 입력하세요"
        onChange={(e) => setBoardTitle(e.target.value)} />
        <Label>내용</Label>
        <Input type="text" placeholder="내용을 입력하세요" 
        onChange={(e) => setBoardContent(e.target.value)}/>
        <Label>작성자</Label>
        <Input type= {memberName} readOnly style={{backgroundColor:"lightgray"}}/>
        <Label>파일첨부</Label>
        <Input type="file" />
        <ImageContainer>
          <ImagePreview src="" alt="미리보기" />
        </ImageContainer>
        <Button>작성하기</Button>
      </Form>
    </Container>
  );
};
export default BoardForm;