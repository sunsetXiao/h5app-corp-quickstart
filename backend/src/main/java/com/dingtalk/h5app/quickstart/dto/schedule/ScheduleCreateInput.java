package com.dingtalk.h5app.quickstart.dto.schedule;

import com.dingtalk.h5app.quickstart.model.Company;
import com.dingtalk.h5app.quickstart.model.staicdata.ScheduleStatus;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@ToString
public class ScheduleCreateInput {
    private String name;
    private String note;
    private Date deadline;
//    private Date completeAt;
//    private ScheduleStatus status;
    private Integer company_id;
}
