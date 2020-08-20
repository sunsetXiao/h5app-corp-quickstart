package com.dingtalk.h5app.quickstart.dto;

import com.dingtalk.h5app.quickstart.model.Company;
import com.dingtalk.h5app.quickstart.model.Industry;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CompanyDto {
    private Integer id;

    private String name;

//    private Industry industry;
    public CompanyDto() {

    }
    public CompanyDto(Company company) {
        this.id = company.getId();
        this.name = company.getName();
    }
}
