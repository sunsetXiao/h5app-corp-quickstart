package com.dingtalk.h5app.quickstart.dto.company;

import com.dingtalk.h5app.quickstart.dto.poi.POICreateInput;
import com.dingtalk.h5app.quickstart.model.Company;
import com.dingtalk.h5app.quickstart.model.staicdata.CompanyType;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Optional;

@Getter
@Setter
@ToString
public class CompanyUpdateInput {
    private Integer id;

    private String name;
    private Integer industry_id;
    private Integer city_id;
    private String description;
    private String note;
    private CompanyType type;
    private String projectName;
    private String targetRegion;
    private String field;
    private String revenue;
    private String financing;
    private String team;
    private String carrier;
    private String output_tax;
    private String investment;

    private POICreateInput poi;
}
