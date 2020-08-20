package com.dingtalk.h5app.quickstart.model.staicdata;

import com.dingtalk.h5app.quickstart.model.Company;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Table(name = "province")
@Setter
@Getter
@Entity
public class Province {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true)
    private String name;

    @OneToMany(mappedBy = "province", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<City> cities;
}
