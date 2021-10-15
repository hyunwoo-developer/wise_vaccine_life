import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset};
  @font-face {
    font-family: 'SpoqaHanSansNeo-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SpoqaHanSansNeo-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'BMJUA';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMJUA.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
      font-family: 'Pretendard-Regular';
      src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
      font-weight: 400;
      font-style: normal;
  }
  html {
    font-size: 10px;
    font-family: Pretendard-Regular;
    
  };
  em {
    /* font-weight: bolder;
    color: orange */
    font-style: italic;
  };
  strong {
    font-weight: bolder
  };
.toast {
  color: #ffffff !important;
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 22px;
  height: 20px;
  width: 20rem;
  padding: 1rem;
  min-height: 2rem !important;
  display: flex;
  justify-content: center;
  border-radius: 8px !important;
}
.toast-info {
  background-color: rgba(33,33,33,0.8) !important;
}
.toast-warning {
  background-color: rgba(242,82,24,0.8) !important;
}
.toast-success {
  background-color: rgba(51,113,246,0.8) !important;
}
`;

export default GlobalStyles;
