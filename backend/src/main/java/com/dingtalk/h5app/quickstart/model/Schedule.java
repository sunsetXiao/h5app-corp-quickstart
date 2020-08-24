package com.dingtalk.h5app.quickstart.model;

import com.dingtalk.h5app.quickstart.model.staicdata.ScheduleStatus;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Table(name = "schedule")
@Setter
@Getter
@Entity
public class Schedule {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String note;
    @Temporal(TemporalType.DATE)
    private Date deadline;
    @Temporal(TemporalType.DATE)
    private Date completeAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ScheduleStatus status;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;
}
