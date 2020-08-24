package com.dingtalk.h5app.quickstart.dto.company;

import com.dingtalk.h5app.quickstart.dto.contact.ContactDto;
import com.dingtalk.h5app.quickstart.dto.progress.ProgressDto;
import com.dingtalk.h5app.quickstart.dto.schedule.ScheduleDto;
import com.dingtalk.h5app.quickstart.model.Company;
import com.dingtalk.h5app.quickstart.model.Contact;
import com.dingtalk.h5app.quickstart.model.Progress;
import com.dingtalk.h5app.quickstart.model.Schedule;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
public class CompanyDto {
//    private String name;
//    private Integer industry_id;
//    private Integer city_id;
//    private String description;
//    private String note;
//    private CompanyType type;
//    private String projectName;
//    private String targetRegion;
//    private String field;
//    private String revenue;
//    private String financing;
//    private String team;
//    private String carrier;
//    private String output_tax;
//    private String investment;
    private Integer id;
    private String name;
    private String industry_name;
    private String city_name;
    private String province_name;
    private String description;
    private String note;
    private String type;
    private String targetRegion;
    private String field;
    private String revenue;
    private String financing;
    private String team;
    private String carrier;
    private String output_tax;
    private String investment;

    private List<ProgressDto> progressList;
    private List<ContactDto> contactList;
    private List<ScheduleDto> scheduleList;

//    private Industry industry;
    public CompanyDto() {

    }
    public CompanyDto(Company company) {
        this(company, "");
    }

    public CompanyDto(Company company, String ignore) {
        this.id = company.getId();
        this.name = company.getName();
        this.industry_name = company.getIndustry().getName();
        this.city_name = company.getCity().getName();
        this.province_name = company.getCity().getProvince().getName();
        this.description = company.getDescription();
        this.note = company.getNote();
        this.type = company.getType().toString();
        this.targetRegion = company.getTargetRegion();
        this.field = company.getField();
        this.revenue = company.getRevenue();
        this.financing = company.getFinancing();
        this.team = company.getTeam();
        this.carrier = company.getCarrier();
        this.output_tax = company.getOutput_tax();
        this.investment = company.getInvestment();

        if (company.getProgressList() != null && ignore != "progress") {
            this.progressList = new ArrayList<>();
            for (Progress progress: company.getProgressList()) {
                this.progressList.add(new ProgressDto(progress));
            }
        }
        if (company.getContactList() != null && ignore != "contact") {
            this.contactList = new ArrayList<>();
            for (Contact contact: company.getContactList()) {
                this.contactList.add(new ContactDto(contact, "company"));
            }
        }
        if (company.getScheduleList() != null && ignore != "schedule") {
            this.scheduleList = new ArrayList<>();
            for (Schedule schedule: company.getScheduleList()) {
                this.scheduleList.add(new ScheduleDto(schedule, "company"));
            }
        }
    }
}
