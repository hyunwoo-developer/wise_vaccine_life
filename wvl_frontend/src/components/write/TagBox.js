import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import palette from "../../libs/styles/palette";

const TagBoxWrapper = styled.div`
    width: 100%;
    border-top: 1px solid ${palette.gray[2]};
    padding-top: 1rem;

    h4 {
        font-size: 1.5rem;
        font-weight: bolder;
        color: ${palette.gray[8]};
        margin-top: 0;
        margin-bottom: 0.5rem;
    }
`;

const TagForm = styled.form`
    border-radius: 1px;
    overflow: hidden;
    display: flex;
    width: 256px;
    border: 1px solid ${palette.gray[4]};
    input,
    button {
        outline: none;
        border: none;
        font-size: 1.2rem;
    }

    input {
        padding: 0.5rem;
        flex: 1;
    }

    button {
        cursor: pointer;
        padding-right: 1rem;
        padding-left: 1rem;
        border: none;
        background: ${palette.gray[8]};
        color: white;
        font-weight: bold;
        &:hover {
            background: ${palette.gray[6]};
        }
    }
`;

const Tag = styled.div`
    margin-right: 0.5rem;
    color: ${palette.gray[6]};
    cursor: pointer;
    font-size: 1.2rem;
    &:hover {
        opacity: 0.5;
    }
`;

const TagListBlock = styled.div`
    display: flex;
    margin-top: 0.5rem;
    min-height: 3rem;
`;

const TagItem = React.memo(({ tag, onRemove }) => (
    <Tag onClick={() => onRemove(tag)}>#{tag}</Tag>
));

const TagList = React.memo(({ tags, onRemove }) => (
    <TagListBlock>
        {tags.map((tag) => (
            <TagItem key={tag} tag={tag} onRemove={onRemove} />
        ))}
    </TagListBlock>
));

function TagBox({ onChangeTags, tags }) {
    const [input, setInput] = useState("");
    const [localTags, setLocalTags] = useState([]);

    const insertTag = useCallback(
        (tag) => {
            if (!tag) return;
            if (localTags.includes(tag)) return;
            const nextTags = [...localTags, tag];
            console.log(nextTags);
            setLocalTags(nextTags);
            onChangeTags(nextTags);
        },
        [localTags, onChangeTags]
    );

    const onRemove = useCallback(
        (tag) => {
            const nextTags = localTags.filter((t) => t !== tag);
            setLocalTags(nextTags);
            onChangeTags(nextTags);
        },
        [localTags, onChangeTags]
    );

    const onChange = useCallback(async (e) => {
        setInput(e.target.value); // setInput은 바로 적용되지 않는다
    }, []);

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            insertTag(input.trim());
            setInput("");
            console.log(input);
        },
        [input, insertTag]
    );

    useEffect(() => {
        setLocalTags(tags);
    }, [tags]);

    return (
        <TagBoxWrapper>
            <h4>태그</h4>
            <br />
            <TagForm onSubmit={onSubmit}>
                <input
                    placeholder="태그를 입력하세요"
                    value={input}
                    onChange={onChange}
                />
                <button type="submit">추가</button>
            </TagForm>
            <TagList tags={localTags} onRemove={onRemove} />
        </TagBoxWrapper>
    );
}

export default TagBox;
