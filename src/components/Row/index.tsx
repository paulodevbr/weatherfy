import styled from 'styled-components/native';

interface RowProps {
  full?: boolean;
  withSpaceBetween?: boolean;
  width?: string;
  height?: string;
}

export const Row = styled.View<RowProps>`
  ${props => (props.height ? `height: ${props.height};` : '')}
  ${props => (props.width ? `width: ${props.width};` : '')}
  ${props => (props.full ? 'width: 100%;' : '')}
  flex-direction: row;
  align-items: center;
  ${props => (props.withSpaceBetween ? 'justify-content: space-between;' : '')}
`;
