import { styled } from "styled-components";

const StyledTable = styled.table`
  width: 100%;
  th {
    text-align: left;
    text-transform: uppercase;
    color: #8f466f;
    font-weight: bolder;
    font-size: 0.8rem;
  }
  td {
    border-top: 1px solid #f7e9f1;
  }
`;

export default function Table(props) {
  return <StyledTable {...props} />;
}
