import styled from 'styled-components/native';

interface TextProps {
  opacity?: string;
  fontWeight?: string;
}

const TextTitle = styled.Text<TextProps>`
  font-size: 26px;
  color: #fff;
  ${props => (props.opacity ? `opacity: ${props.opacity};` : '')}
  ${props => (props.fontWeight ? `font-weight: ${props.fontWeight};` : '')}
`;

export default TextTitle;
