import React from "react";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";

const NavSearchRoundBox = styled.div`
  border: 1px solid #555555;
  padding: 0.1rem 0;
  display: flex;
  align-items: center;
  border-radius: 4px;
`;

const NavSearchInput = styled.input`
  flex: 1;
  border: none;
  width: 13rem;

  &:focus {
    outline: none;
  }
`;

const SearchInputWrap = styled.div`
  position: relative;
  margin-right: 1rem;
`;

const NavStyledIcon = styled.div`
  font-size: 2rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #555555;

  & + & {
    margin-left: 1rem;
  }
`;
function SearchBox() {
  return (
    <NavSearchRoundBox>
      <NavSearchInput
        name="search"
        // value={searchInfo.search}
        // onChange={onChangeInput}
      />
      <NavStyledIcon>
        <AiOutlineSearch />
      </NavStyledIcon>
    </NavSearchRoundBox>
  );
}

export default SearchBox;
