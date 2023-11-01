import styled from "styled-components";

export const TxtContainer = styled.div<{ layout_coluna: boolean }>`
  width: 100%;
  margin: 0px 10px;
  max-height: 176px;
`;

export const ImgContainer = styled.div<{ url: string, layout_coluna: boolean }>`
  display: flex;
  justify-content: end;
  width: ${(props) => (props.layout_coluna ? "100%" : '9em')};
  height: ${(props) => (props.layout_coluna ? "266px" : '14em')};
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${(props) =>
    `https://image.tmdb.org/t/p/w500/${props.url}`});
  background-size: cover;
  border-radius: 5px 10px 5px 10px;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.14);
  flex-shrink: 0;
`;

export const StyledH3 = styled.h3`
  display: flex;
  align-items: center;
  margin: 0px;
`;
export const StyleIconLinha = {
  alignSelf: 'end',
  width: '30px'
};


export const StyleIconColuna = {
  margin : '0px 5px'
};

export const filmeColuna = {
  maxWidth: "180px",
  maxHeight: "440px",
};

export const filmeLinha = {
  display: "flex",
  alignItems: "center",
  maxWidth: "100%",
  maxHeight: "440px",
  margin: "15px 0px",
  gap:"16px",
};
