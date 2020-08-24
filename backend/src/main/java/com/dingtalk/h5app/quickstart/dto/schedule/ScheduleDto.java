package com.dingtalk.h5app.quickstart.dto.schedule;

import com.dingtalk.h5app.quickstart.dto.company.CompanyDto;
import com.dingtalk.h5app.quickstart.model.Schedule;
import com.dingtalk.h5app.quickstart.model.staicdata.ScheduleStatus;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
public class ScheduleDto {
    private Integer id;
    private String name;
    private String note;
    private Date deadline;
    private Date completeAt;
    private ScheduleStatus status;
    private CompanyDto company;

    public ScheduleDto() {

    }

    public ScheduleDto(Schedule schedule) {
        this(schedule, "");
    }

    public ScheduleDto(Schedule schedule, String ignore) {
        this.id = schedule.getId();
        this.name = schedule.getName();
        this.note = schedule.getNote();
        this.deadline = schedule.getDeadline();
        this.completeAt = schedule.getCompleteAt();
        this.status = schedule.getStatus();

        if (ignore != "company") {
            this.company = new CompanyDto(schedule.getCompany());
        }
    }
}
