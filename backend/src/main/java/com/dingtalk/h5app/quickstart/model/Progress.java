package com.dingtalk.h5app.quickstart.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Table(name = "progress")
@Setter
@Getter
@Entity
public class Progress {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;

    private String content;

    private Integer percentage;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;
}
