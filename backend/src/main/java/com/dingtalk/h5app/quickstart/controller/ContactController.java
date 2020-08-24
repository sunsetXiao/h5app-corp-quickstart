package com.dingtalk.h5app.quickstart.controller;

import com.dingtalk.h5app.quickstart.domain.ServiceResult;
import com.dingtalk.h5app.quickstart.dto.*;
import com.dingtalk.h5app.quickstart.dto.contact.ContactDto;
import com.dingtalk.h5app.quickstart.dto.contact.ContactCreateInput;
import com.dingtalk.h5app.quickstart.dto.contact.ContactUpdateInput;
import com.dingtalk.h5app.quickstart.model.Company;
import com.dingtalk.h5app.quickstart.model.Contact;
import com.dingtalk.h5app.quickstart.repository.CompanyRepository;
import com.dingtalk.h5app.quickstart.repository.ContactRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/contact")
@CrossOrigin("*")
public class ContactController {
    private static final Logger log = LoggerFactory.getLogger(ContactController.class);

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @PostMapping(value = "/create")
    public ServiceResult<ContactDto> create(
            @RequestBody ContactCreateInput contactCreateInput
    ) {
        Contact contact = new Contact();

        contact.setAddress(contactCreateInput.getAddress());
        contact.setName(contactCreateInput.getName());
        contact.setMobile(contactCreateInput.getMobile());
        contact.setPhone(contactCreateInput.getPhone());
        contact.setPosition(contactCreateInput.getPosition());
        contact.setImage(contactCreateInput.getImage());

        contactRepository.save(contact);
        ContactDto contactDto = new ContactDto(contact);
        return ServiceResult.success(contactDto);
    }

    @GetMapping(value = "/findById")
    public ServiceResult<ContactDto> findById(
            @RequestBody IdInput idInput
    ) {
        Optional<Contact> contact = contactRepository.findById(idInput.getId());
        if (!contact.isPresent()) {
            return ServiceResult.success(null);
        }

        ContactDto contactDto = new ContactDto(contact.get());

        return ServiceResult.success(contactDto);
    }

    @GetMapping(value = "findAll")
    public ServiceResult<List<ContactDto>> findAll(
            @RequestBody FilterSortInput filterSortInput
    ) {
        Specification<Contact> spec = new Specification<Contact>() {
            @Override
            public Predicate toPredicate(Root<Contact> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                List<Predicate> predicateList = new ArrayList<>();
                for(FilterInput filterInput: filterSortInput.getFilterInputList()) {
                    Predicate predicate = cb.like(root.get(filterInput.getField()).as(String.class), "%"+filterInput.getValue()+"%");
                    predicateList.add(predicate);
                }

                return cb.and(predicateList.toArray(new Predicate[predicateList.size()]));
            }
        };

        Sort sort = new Sort(filterSortInput.getSortInput().getOrder(), filterSortInput.getSortInput().getField());
        Iterable<Contact> contactList = contactRepository.findAll(spec, sort);
        List<ContactDto> contactDtoList = new ArrayList<ContactDto>();
        for (Contact co : contactList) {
            contactDtoList.add(new ContactDto(co));
        }
        return ServiceResult.success(contactDtoList);
    }

    @GetMapping(value = "search")
    public ServiceResult<List<ContactDto>> search(
            @RequestBody QueryInput queryInput
    ) {
        List<String> fieldList = Arrays.asList("address", "name", "mobile", "phone", "position");


        Specification<Contact> spec = new Specification<Contact>() {
            @Override
            public Predicate toPredicate(Root<Contact> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                List<Predicate> predicateList = new ArrayList<>();
                for(String field: fieldList) {
                    Predicate predicate = cb.like(root.get(field).as(String.class), "%"+queryInput.getQuery()+"%");
                    predicateList.add(predicate);
                }

                return cb.or(predicateList.toArray(new Predicate[predicateList.size()]));
            }
        };
        Iterable<Contact> contactList = contactRepository.findAll(spec);
        List<ContactDto> contactDtoList = new ArrayList<ContactDto>();
        for (Contact co : contactList) {
            contactDtoList.add(new ContactDto(co));
        }
        return ServiceResult.success(contactDtoList);
    }

    @PostMapping(value = "/update")
    public ServiceResult<ContactDto> update(
            @RequestBody ContactUpdateInput contactUpdateInput
    ) {
        Contact contact = contactRepository.getOne(contactUpdateInput.getId());

        if (contactUpdateInput.getAddress() != null) {
            contact.setAddress(contactUpdateInput.getAddress());
        }
        if (contactUpdateInput.getName() != null) {
            contact.setName(contactUpdateInput.getName());
        }
        if (contactUpdateInput.getMobile() != null) {
            contact.setMobile(contactUpdateInput.getMobile());
        }
        if (contactUpdateInput.getPhone() != null) {
            contact.setPhone(contactUpdateInput.getPhone());
        }
        if (contactUpdateInput.getPosition() != null) {
            contact.setPosition(contactUpdateInput.getPosition());
        }
        if (contactUpdateInput.getImage() != null) {
            contact.setImage(contactUpdateInput.getImage());
        }

        contactRepository.save(contact);
        ContactDto contactDto = new ContactDto(contact);
        return ServiceResult.success(contactDto);
    }

    @PostMapping(value = "/updateCompany")
    public ServiceResult<ContactDto> updateCompany(
            @RequestBody IdListInput idListInput
    ) {
        Contact contact = contactRepository.getOne(idListInput.getId());
        List<Company> companyList = new ArrayList<>();

        for (Integer id: idListInput.getIdList()) {
            Company company = companyRepository.getOne(id);
            companyList.add(company);
        }

        contact.setCompanyList(companyList);
        contactRepository.save(contact);

        ContactDto contactDto = new ContactDto(contact);
        return ServiceResult.success(contactDto);
    }

    @PostMapping(value = "/delete")
    public ServiceResult<Integer> delete(
            @RequestBody IdInput idInput
    ) {
        contactRepository.deleteById(idInput.getId());
        return ServiceResult.success(idInput.getId());
    }
}
