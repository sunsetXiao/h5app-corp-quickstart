package com.dingtalk.h5app.quickstart.dto;

import com.dingtalk.h5app.quickstart.model.Company;
import com.dingtalk.h5app.quickstart.model.staicdata.CompanyType;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CompanyDto {
//    private String name;
//    private Integer industry_id;
//    private Integer city_id;
//    private String description;
//    private String note;
//    private CompanyType type;
//    private String projectName;
//    private String targetRegion;
//    private String field;
//    private String revenue;
//    private String financing;
//    private String team;
//    private String carrier;
//    private String output_tax;
//    private String investment;
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
