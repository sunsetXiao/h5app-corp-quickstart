package com.dingtalk.h5app.quickstart.controller;

import com.dingtalk.h5app.quickstart.domain.ServiceResult;
import com.dingtalk.h5app.quickstart.dto.IdInput;
import com.dingtalk.h5app.quickstart.dto.company.CompanyCreateInput;
import com.dingtalk.h5app.quickstart.dto.progress.ProgressCreateInput;
import com.dingtalk.h5app.quickstart.dto.progress.ProgressDto;
import com.dingtalk.h5app.quickstart.dto.progress.ProgressUpdateInput;
import com.dingtalk.h5app.quickstart.model.Company;
import com.dingtalk.h5app.quickstart.model.Progress;
import com.dingtalk.h5app.quickstart.repository.CompanyRepository;
import com.dingtalk.h5app.quickstart.repository.ProgressRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(path = "/progress")
@CrossOrigin("*")
public class ProgressController {
    private static final Logger log = LoggerFactory.getLogger(CompanyController.class);

    @Autowired
    private ProgressRepository progressRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @PostMapping(value = "/create")
    public ServiceResult<ProgressDto> create(
            @RequestBody ProgressCreateInput progressCreateInput
    ) {
        Optional<Company> company = companyRepository.findById(progressCreateInput.getCompany_id());

        if (!company.isPresent()) {
            return ServiceResult.failure("no company");
        }

        Progress progress = new Progress();
        progress.setContent(progressCreateInput.getContent());
        progress.setPercentage(progressCreateInput.getPercentage());
        progress.setCompany(company.get());

        progressRepository.save(progress);

        ProgressDto progressDto = new ProgressDto(progress);
        return ServiceResult.success(progressDto);
    }

    @PostMapping(value = "/update")
    public ServiceResult<ProgressDto> update(
            @RequestBody ProgressUpdateInput progressUpdateInput
    ) {
        Progress progress = progressRepository.getOne(progressUpdateInput.getId());

        if (progressUpdateInput.getContent() != null) {
            progress.setContent(progressUpdateInput.getContent());
        }
        if (progressUpdateInput.getPercentage() != null) {
            progress.setPercentage(progressUpdateInput.getPercentage());
        }

        progressRepository.save(progress);
        ProgressDto progressDto = new ProgressDto(progress);
        return ServiceResult.success(progressDto);
    }

    @PostMapping(value = "/delete")
    public ServiceResult<Integer> delete(
            @RequestBody IdInput idInput
    ) {
        progressRepository.deleteById(idInput.getId());
        return ServiceResult.success(0);
    }
}
