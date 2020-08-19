package com.dingtalk.h5app.quickstart.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Proxy;

import javax.persistence.*;
import java.util.Set;

@Entity
@Setter
@Getter
@Table(name = "industry")
public class Industry {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    private String name;

    // 暂时设置为以及父目录
    private String category;

    @OneToMany(mappedBy = "industry", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Company> companies;

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
//    public String getCategory() { return category; }
//
//    public void setCategory(String category) { this.category = category; }
//
//    public Set<Company> getCompanies() { return companies; }
//
//    public void setCompanies(Set<Company> companies) { this.companies = companies; }
}
