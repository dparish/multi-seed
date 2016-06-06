package com.bp3.seed.async;

import com.bp3.seed.model.Document;
import com.google.common.collect.Lists;
import org.junit.Test;
import org.reactivestreams.Subscriber;
import org.reactivestreams.Subscription;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import reactor.Environment;
import reactor.core.processor.RingBufferProcessor;

import java.util.List;

/**
 * @author dparish
 */
public class ReactorStreamTest {

    private static Logger logger = LoggerFactory.getLogger(ReactorStreamTest.class);

    @Test
    public void simpleTest() {
        Environment.initialize();
        RingBufferProcessor<Document> processor = RingBufferProcessor.<Document>create();
        List<Document> documents = Lists.newArrayList(
                new Document().setName("one"),
                new Document().setName("two")
        );
        for (Document doc : documents) {
            processor.onNext(doc);
        }

        DocumentSubscriber subscriber = new DocumentSubscriber();
        processor.subscribe(subscriber);
        processor.onComplete();
    }

    private class DocumentSubscriber implements Subscriber<Document> {
        @Override
        public void onSubscribe(Subscription s) {
            s.request(Long.MAX_VALUE);
            logger.info("subscribed");
        }

        @Override
        public void onNext(Document document) {
            logger.info("Received document " + document.getName());
        }

        @Override
        public void onError(Throwable t) {
            logger.error("Subscriber error ", t);
        }

        @Override
        public void onComplete() {
            logger.info("document complete ");
        }
    }
}
