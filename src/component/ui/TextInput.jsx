import React from "react";
import styled from "styled-components";

const StyledTextarea = styled.textarea`
    ${(props) =>
        props.width &&`
        width: calc(100% - ${props.width}px);
        `
    }
    ${(props) =>
        props.height &&
        `
        height: ${props.height}px;
    `}
    padding: 16px;
    font-size: 16px;
    line-height: 20px;
    margin-bottom:3px !important;
`;

function TextInput(props) {
    const { width, height, value, onChange } = props;

    return <StyledTextarea width={width} height={height} value={value} onChange={onChange}/>;
}

export default TextInput;
