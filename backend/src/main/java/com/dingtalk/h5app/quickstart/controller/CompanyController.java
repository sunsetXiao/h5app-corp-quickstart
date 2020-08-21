package com.dingtalk.h5app.quickstart.controller;

import com.dingtalk.h5app.quickstart.domain.ServiceResult;
import com.dingtalk.h5app.quickstart.dto.*;
import com.dingtalk.h5app.quickstart.model.Company;
import com.dingtalk.h5app.quickstart.model.staicdata.City;
import com.dingtalk.h5app.quickstart.model.staicdata.Industry;
import com.dingtalk.h5app.quickstart.repository.CompanyRepository;
import com.dingtalk.h5app.quickstart.repository.staticdata.CityRepository;
import com.dingtalk.h5app.quickstart.repository.staticdata.IndustryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/company")
@CrossOrigin("*") // NOTE：此处仅为本地调试使用，为避免安全风险，生产环境请勿设置CORS为 '*'
public class CompanyController {
    private static final Logger log = LoggerFactory.getLogger(CompanyController.class);

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private IndustryRepository industryRepository;

    @Autowired
    private  CityRepository cityRepository;

    @PostMapping(value = "/create")
    public ServiceResult<Integer> create(
            @RequestBody CompanyCreateInput companyCreateInput
            ) {
        Company company = new Company();
        company.setName(companyCreateInput.getName());
        Optional<Industry> industry = industryRepository.findById(companyCreateInput.getIndustry_id());
        if (industry.isPresent()) {
            company.setIndustry(industry.get());
        }
        Optional<City> city = cityRepository.findById(companyCreateInput.getCity_id());
        if (city.isPresent()) {
            company.setCity(city.get());
        }
        company.setDescription(companyCreateInput.getDescription());
        company.setNote(companyCreateInput.getNote());
        company.setType(companyCreateInput.getType());
        company.setProjectName(companyCreateInput.getProjectName());
        company.setTargetRegion(companyCreateInput.getTargetRegion());
        company.setField(companyCreateInput.getField());
        company.setRevenue(companyCreateInput.getRevenue());
        company.setFinancing(companyCreateInput.getFinancing());
        company.setTeam(companyCreateInput.getTeam());
        company.setCarrier(companyCreateInput.getCarrier());
        company.setOutput_tax(companyCreateInput.getOutput_tax());
        company.setInvestment(companyCreateInput.getInvestment());

        companyRepository.save(company);

        return ServiceResult.success(company.getId());
    }

    @GetMapping(value = "/findById")
    public ServiceResult<CompanyDto> findById(
            @RequestBody IdInput idInput
    ) {
        Optional<Company> company = companyRepository.findById(idInput.getId());
        if (!company.isPresent()) {
            return ServiceResult.success(null);
        }

        CompanyDto companyDto = new CompanyDto(company.get());

        return ServiceResult.success(companyDto);
    }

    @GetMapping(value = "findAll")
    public ServiceResult<List<CompanyDto>> findAll(
            @RequestBody FilterSortInput filterSortInput
    ) {
        Specification<Company> spec = new Specification<Company>() {
            @Override
            public Predicate toPredicate(Root<Company> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                List<Predicate> predicateList = new ArrayList<>();
                for(FilterInput filterInput: filterSortInput.getFilterInputList()) {
                    Predicate predicate = cb.like(root.get(filterInput.getField()).as(String.class), "%"+filterInput.getValue()+"%");
                    predicateList.add(predicate);
                }

                return cb.and(predicateList.toArray(new Predicate[predicateList.size()]));
            }
        };

        Sort sort = new Sort(filterSortInput.getSortInput().getOrder(), filterSortInput.getSortInput().getField());
        Iterable<Company> companyList = companyRepository.findAll(spec, sort);
        List<CompanyDto> companyDtoList = new ArrayList<CompanyDto>();
        for (Company co : companyList) {
            companyDtoList.add(new CompanyDto(co));
        }
        return ServiceResult.success(companyDtoList);
    }

    @GetMapping(value = "search")
    public ServiceResult<List<CompanyDto>> search(
            @RequestBody QueryInput queryInput
    ) {
        List<String> fieldList = Arrays.asList("name", "description", "note", "type", "projectName", "targetRegion", "field", "revenue", "financing", "team", "carrier", "output_tax", "investment");

        Specification<Company> spec = new Specification<Company>() {
            @Override
            public Predicate toPredicate(Root<Company> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                List<Predicate> predicateList = new ArrayList<>();
                for(String field: fieldList) {
                    Predicate predicate = cb.like(root.get(field).as(String.class), "%"+queryInput.getQuery()+"%");
                    predicateList.add(predicate);
                }

                return cb.or(predicateList.toArray(new Predicate[predicateList.size()]));
            }
        };
        Iterable<Company> companyList = companyRepository.findAll(spec);
        List<CompanyDto> companyDtoList = new ArrayList<CompanyDto>();
        for (Company co : companyList) {
            companyDtoList.add(new CompanyDto(co));
        }
        return ServiceResult.success(companyDtoList);
    }
}
