package com.dingtalk.h5app.quickstart.model;

import com.dingtalk.h5app.quickstart.model.staicdata.City;
import com.dingtalk.h5app.quickstart.model.staicdata.CompanyType;
import com.dingtalk.h5app.quickstart.model.staicdata.Industry;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Table(name = "company")
@Setter
@Getter
@Entity
public class Company {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @ManyToOne(fetch = FetchType.LAZY, optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name = "industry_id", nullable = false)
    private Industry industry;

    @ManyToOne(fetch = FetchType.LAZY, optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name = "city_id", nullable = false)
    private City city;

    // 公司简介
    private String description;

    // 备注信息
    private String note;

    // 科技类 产业类
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CompanyType type;

    // 科技类：项目名称，意向区域，产品及应用领域，营收，融资历史，团队规模。
    // 产业类：项目名称，意向区域，产品及应用领域，载体需求，产值税收，投资强度。

    private String projectName;
    private String targetRegion;
    private String field;

    private String revenue;
    private String financing;
    private String team;

    private String carrier;
    private String output_tax;
    private String investment;
}
