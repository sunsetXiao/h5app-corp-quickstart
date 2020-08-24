package com.dingtalk.h5app.quickstart.dto.schedule;

import com.dingtalk.h5app.quickstart.model.staicdata.ScheduleStatus;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
public class ScheduleUpdateInput {
    private Integer id;
    private String name;
    private String note;
    private Date deadline;
    private Date completeAt;
    private ScheduleStatus status;
    private Integer company_id;
}
