import styled from 'styled-components/native';

interface TextProps {
  opacity?: string;
  fontWeight?: string;
}

const TextSubtitle = styled.Text<TextProps>`
  font-size: 18px;
  color: #fff;
  ${props => (props.opacity ? `opacity: ${props.opacity};` : '')}
  ${props => (props.fontWeight ? `font-weight: ${props.fontWeight};` : '')}
`;

export default TextSubtitle;
