import React from "react";
import styled from "styled-components";
import palette from "../../libs/styles/palette";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditorWrapper = styled.div`
    padding-top: 2rem;
    padding-bottom: 3rem;
`;

const TitleInput = styled.input`
    font-size: 2rem;
    font-weight: bolder;
    outline: none;
    padding-bottom: 0.5rem;
    border: none;
    border-bottom: 1px solid ${palette.gray[4]};
    margin-bottom: 2rem;
    width: 100%;
    box-sizing: border-box;
`;

const QuillWrapper = styled.div`
    .ql-editor {
        padding: 1rem 0;
        text-indent: 10px;
        min-height: 320px;
        font-size: 1.5rem;
        line-height: 1.5;
        background-color: white;
    }
    .ql-editor.ql-blank:before {
        left: 0px;
    }
`;

function Editor({ onChangeField, body, title }) {
    const modules = {
        toolbar: [
            //[{ 'font': [] }],
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            ["link", "image"],
            [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
            ["clean"],
        ],
    };

    const formats = [
        //'font',
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "align",
        "color",
        "background",
    ];

    const onChangeBody = (body) => {
        onChangeField({ key: "body", value: body });
    };

    const onChangeTitle = (e) => {
        onChangeField({ key: "title", value: e.target.value });
    };

    return (
        <EditorWrapper>
            <TitleInput
                value={title}
                onChange={onChangeTitle}
                placeholder="제목을 입력하세요"
            />
            <QuillWrapper>
                <ReactQuill
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    value={body || ""}
                    onChange={(content, delta, source, editor) =>
                        onChangeBody(editor.getHTML())
                    }
                />
            </QuillWrapper>
        </EditorWrapper>
    );
}

export default Editor;
