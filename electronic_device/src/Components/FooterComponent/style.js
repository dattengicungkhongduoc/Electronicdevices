import styled from 'styled-components';
import { Row, Col } from 'antd';


export const FooterContainer = styled.div`
    background-color: #001529;
    color: white;
    text-align: center;
    padding: 20px;
`;

export const FooterRow = styled(Row)`
    text-align: center;
    margin-top: 20px;
`;

export const FooterCol = styled(Col)`
    h3 {
        font-size: 18px;
        margin-bottom: 10px;
    }
    p {
        font-size: 14px;
        color: #6c757d;
    }
    svg {
        font-size: 24px;
        margin-right: 10px;
    }
`;


