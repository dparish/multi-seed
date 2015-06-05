package com.bp3.seed.service;

import com.bp3.seed.model.Document;
import com.google.common.collect.Lists;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * @author dparish
 */
@Service
public class DummyDocumentService implements DocumentService {
    @Override
    public List<Document> getDocuments() {
        return Lists.newArrayList(
                new Document().setId(0l).setName("one").setDescription("one description").setCreateDate(new Date()),
                new Document().setId(1l).setName("two").setDescription("two description").setCreateDate(new Date())
        );

    }
}
