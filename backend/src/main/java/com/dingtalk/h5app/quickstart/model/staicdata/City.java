package com.dingtalk.h5app.quickstart.model.staicdata;

import com.dingtalk.h5app.quickstart.model.Company;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Table(name = "city")
@Setter
@Getter
@Entity
public class City {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;
    @Column(unique = true)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "province_id", nullable = false)
    private Province province;

    @OneToMany(mappedBy = "city", fetch = FetchType.LAZY)
    private List<Company> companies;
}
