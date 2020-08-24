package com.dingtalk.h5app.quickstart.controller;

import com.dingtalk.h5app.quickstart.domain.ServiceResult;
import com.dingtalk.h5app.quickstart.dto.*;
import com.dingtalk.h5app.quickstart.dto.schedule.ScheduleDto;
import com.dingtalk.h5app.quickstart.dto.schedule.ScheduleCreateInput;
import com.dingtalk.h5app.quickstart.dto.schedule.ScheduleUpdateInput;
import com.dingtalk.h5app.quickstart.model.Company;
import com.dingtalk.h5app.quickstart.model.Schedule;
import com.dingtalk.h5app.quickstart.model.staicdata.ScheduleStatus;
import com.dingtalk.h5app.quickstart.repository.CompanyRepository;
import com.dingtalk.h5app.quickstart.repository.ScheduleRepository;
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
@RequestMapping(path = "/schedule")
@CrossOrigin("*")
public class ScheduleController {
    private static final Logger log = LoggerFactory.getLogger(ScheduleController.class);

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @PostMapping(value = "/create")
    public ServiceResult<ScheduleDto> create(
            @RequestBody ScheduleCreateInput scheduleCreateInput
    ) {
        Schedule schedule = new Schedule();
        schedule.setName(scheduleCreateInput.getName());
        schedule.setNote(scheduleCreateInput.getNote());
        schedule.setDeadline(scheduleCreateInput.getDeadline());

        schedule.setStatus(ScheduleStatus.todo);

        Company company = companyRepository.getOne(scheduleCreateInput.getCompany_id());
        schedule.setCompany(company);

        scheduleRepository.save(schedule);
        ScheduleDto scheduleDto = new ScheduleDto(schedule);
        return ServiceResult.success(scheduleDto);
    }

    @GetMapping(value = "/findById")
    public ServiceResult<ScheduleDto> findById(
            @RequestBody IdInput idInput
    ) {
        Optional<Schedule> schedule = scheduleRepository.findById(idInput.getId());
        if (!schedule.isPresent()) {
            return ServiceResult.success(null);
        }

        ScheduleDto scheduleDto = new ScheduleDto(schedule.get());

        return ServiceResult.success(scheduleDto);
    }

    @GetMapping(value = "findAll")
    public ServiceResult<List<ScheduleDto>> findAll(
            @RequestBody FilterSortInput filterSortInput
    ) {
        Specification<Schedule> spec = new Specification<Schedule>() {
            @Override
            public Predicate toPredicate(Root<Schedule> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                List<Predicate> predicateList = new ArrayList<>();
                for(FilterInput filterInput: filterSortInput.getFilterInputList()) {
                    Predicate predicate = cb.like(root.get(filterInput.getField()).as(String.class), "%"+filterInput.getValue()+"%");
                    predicateList.add(predicate);
                }

                return cb.and(predicateList.toArray(new Predicate[predicateList.size()]));
            }
        };

        Sort sort = new Sort(filterSortInput.getSortInput().getOrder(), filterSortInput.getSortInput().getField());
        Iterable<Schedule> scheduleList = scheduleRepository.findAll(spec, sort);
        List<ScheduleDto> scheduleDtoList = new ArrayList<ScheduleDto>();
        for (Schedule co : scheduleList) {
            scheduleDtoList.add(new ScheduleDto(co));
        }
        return ServiceResult.success(scheduleDtoList);
    }

    @GetMapping(value = "search")
    public ServiceResult<List<ScheduleDto>> search(
            @RequestBody QueryInput queryInput
    ) {
        List<String> fieldList = Arrays.asList("name", "note", "status");


        Specification<Schedule> spec = new Specification<Schedule>() {
            @Override
            public Predicate toPredicate(Root<Schedule> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                List<Predicate> predicateList = new ArrayList<>();
                for(String field: fieldList) {
                    Predicate predicate = cb.like(root.get(field).as(String.class), "%"+queryInput.getQuery()+"%");
                    predicateList.add(predicate);
                }

                return cb.or(predicateList.toArray(new Predicate[predicateList.size()]));
            }
        };
        Iterable<Schedule> scheduleList = scheduleRepository.findAll(spec);
        List<ScheduleDto> scheduleDtoList = new ArrayList<ScheduleDto>();
        for (Schedule co : scheduleList) {
            scheduleDtoList.add(new ScheduleDto(co));
        }
        return ServiceResult.success(scheduleDtoList);
    }

    @PostMapping(value = "/update")
    public ServiceResult<ScheduleDto> update(
            @RequestBody ScheduleUpdateInput scheduleUpdateInput
    ) {
        Schedule schedule = scheduleRepository.getOne(scheduleUpdateInput.getId());
        if (scheduleUpdateInput.getName() != null) {
            schedule.setName(scheduleUpdateInput.getName());
        }
        if (scheduleUpdateInput.getNote() != null) {
            schedule.setNote(scheduleUpdateInput.getNote());
        }
        if (scheduleUpdateInput.getDeadline() != null) {
            schedule.setDeadline(scheduleUpdateInput.getDeadline());
        }
        if (scheduleUpdateInput.getCompleteAt() != null) {
            schedule.setCompleteAt(scheduleUpdateInput.getCompleteAt());
        }
        if (scheduleUpdateInput.getStatus() != null) {
            schedule.setStatus(scheduleUpdateInput.getStatus());
        }
        if (scheduleUpdateInput.getCompany_id() != null) {
            Company company = companyRepository.getOne(scheduleUpdateInput.getCompany_id());
            schedule.setCompany(company);
        }
        scheduleRepository.save(schedule);
        ScheduleDto scheduleDto = new ScheduleDto(schedule);
        return ServiceResult.success(scheduleDto);
    }

    @PostMapping(value = "/delete")
    public ServiceResult<Integer> delete(
            @RequestBody IdInput idInput
    ) {
        scheduleRepository.deleteById(idInput.getId());
        return ServiceResult.success(idInput.getId());
    }
}
