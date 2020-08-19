package com.dingtalk.h5app.quickstart.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Proxy;
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

//    public Integer getId() {
//        return id;
//    }
//
//    public void setId(Integer id) {
//        this.id = id;
//    }
//
//    public String getName() { return name; }
//
//    public void setName(String name) { this.name = name; }
//
//    @ManyToOne(fetch = FetchType.LAZY, optional = false, cascade = CascadeType.ALL)
//    public Industry getIndustry() { return industry; }
//
//    public void setIndustry(Industry industry) { this.industry = industry; }
}
