package com.dingtalk.h5app.quickstart.dto.contact;

import com.dingtalk.h5app.quickstart.dto.company.CompanyDto;
import com.dingtalk.h5app.quickstart.model.Company;
import com.dingtalk.h5app.quickstart.model.Contact;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
public class ContactDto {
    private Integer id;
    private String address;
    private String name;
    private String mobile;
    private String phone;
    private String position;
    private String image;

    List<CompanyDto> companyList;

    public ContactDto() {

    }

    public ContactDto(Contact contact) {
        this(contact, "");
    }

    public ContactDto(Contact contact, String ignore) {
        this.id = contact.getId();
        this.address = contact.getAddress();
        this.name = contact.getName();
        this.mobile = contact.getMobile();
        this.phone = contact.getPhone();
        this.position = contact.getPosition();
        this.image = contact.getImage();

        if (contact.getCompanyList() != null && ignore != "company") {
            this.companyList = new ArrayList<>();
            for (Company company: contact.getCompanyList()) {
                companyList.add(new CompanyDto(company, ignore="contact"));
            }
        }
    }
}
