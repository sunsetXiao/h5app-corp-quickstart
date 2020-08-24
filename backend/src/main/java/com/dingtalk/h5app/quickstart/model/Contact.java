package com.dingtalk.h5app.quickstart.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Table(name = "contact")
@Setter
@Getter
@Entity
public class Contact {
    //          "ADDRESS": "深圳市南山区软件产业基地",
    //         "COMPANY": "深圳市李乔科技有限公司",
    //         "NAME": "李乔",
    //         "MPHONE": "861333567890",
    //         "PHONE": "01087654321",
    //         "POSITION": "CEO",
    //         "IMAGE": "http://www.taobao.com/xxx.jpg",
    //         "dt_tranfer": "BusinessCard",
    //         "request_id": "20161206144554_efd40582d477a29df2e3bc62c260cdae"
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;

    private String address;

    @Column(nullable = false)
    private String name;
    private String mobile;
    private String phone;
    private String position;
    private String image;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(
            name = "company_contact",
            joinColumns = @JoinColumn(name = "contact_id"),
            inverseJoinColumns = @JoinColumn(name = "company_id"))
    private List<Company> companyList;
}
