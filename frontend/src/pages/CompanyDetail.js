import React from 'react';

import './CompanyDetail.css';

class CompanyDetail extends React.Component {
    render() {
        return (
            <div style={{ position: "fixed" ,width: '100%', top: 0 }}>
                <div className="header">
                    <div className="header-title"> 企业1 </div>
                    <div className="header-content"> 字段1 </div>
                    <div className="header-content"> 字段1 </div>
                    <div className="header-content"> 字段1 </div>
                </div>
                <div className="body">
                    kk
                </div>
            </div>
        );
    }
}

export default CompanyDetail;