package com.bp3.seed.rest;

import com.bp3.seed.model.Document;
import com.bp3.seed.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author dparish
 */
@RestController
@RequestMapping("/api/document")
public class DocumentController {

    @Autowired
    DocumentService documentService;

    @RequestMapping(method = RequestMethod.GET)
    public List<Document> getDocuments() {
        return documentService.getDocuments();
    }
}
