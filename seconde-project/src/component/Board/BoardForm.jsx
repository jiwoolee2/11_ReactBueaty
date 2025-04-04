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
import axios from "axios";

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
  },[]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedTypes = ["image/jpg","image/jpeg","image/jpng","image/gif"]
    const maxSize = 1024 * 1024 * 10;

    if(selectedFile && !allowedTypes.includes(selectedFile.type)){
      alert("sisibalds");
      return;
    }

    if(selectedFile && selectedFile.size > maxSize) {
      alert("너무 큰 파일 올리지 마라 혼꾸녕");
      return;
    }

    setFile(selectedFile);
  }

  const handleInsertBoard = (e) => {
    e.preventDefault("use strict");
    

    if(!boardTitle || !boardContent){
      alert("제목고 ㅏ내용은 꼭꼮 입력해주시기 발바니다!");
      return;
    }

    const formData = new FormData();
    formData.append("boardTitle",boardTitle);
    formData.append("boardContent",boardContent);
    if(file) {
      formData.append("file",file);
    }

    axios.post('http://localhost/boards',formData,{
      headers : {
        Authorization : `Bearer ${accessToken}`,
        "Content-Type" : "multipart/form-data",
      },
    }).then(result => {
      if(result.status === 201) {
        alert("성공");
        navi("/boards");
      }
    })
    .catch((error) => {
      console.error(error);
    })
  }

  return (
    <Container>
      <Form onSubmit={handleInsertBoard}>
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
        <Input type="file" id="file" accept="image/*" onChange={handleFileChange}/>
        <ImageContainer>
          <ImagePreview alt="미리보기" />
        </ImageContainer>
        <Button>작성하기</Button>
      </Form>
    </Container>
  );
};
export default BoardForm;