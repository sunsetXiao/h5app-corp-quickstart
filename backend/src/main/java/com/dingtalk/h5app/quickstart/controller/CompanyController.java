package com.dingtalk.h5app.quickstart.controller;

import com.dingtalk.h5app.quickstart.domain.ServiceResult;
import com.dingtalk.h5app.quickstart.dto.CompanyCreateInput;
import com.dingtalk.h5app.quickstart.dto.CompanyDto;
import com.dingtalk.h5app.quickstart.dto.IdInput;
import com.dingtalk.h5app.quickstart.model.Company;
import com.dingtalk.h5app.quickstart.model.staicdata.City;
import com.dingtalk.h5app.quickstart.model.staicdata.Industry;
import com.dingtalk.h5app.quickstart.repository.CompanyRepository;
import com.dingtalk.h5app.quickstart.repository.staticdata.CityRepository;
import com.dingtalk.h5app.quickstart.repository.staticdata.IndustryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Id;
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
}
