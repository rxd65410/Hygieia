package com.capitalone.dashboard.request;

import org.bson.types.ObjectId;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by raviteja on 6/24/17.
 */
public class PrRequest {
    @NotNull
    private ObjectId componentId;
    private Integer numberOfDays;
    private Long pullRequestDateBegins;
    private Long pullRequestDateEnds;
    private Long changesGreaterThan;
    private Long changesLessThan;
    private List<String> revisionNumbers = new ArrayList<>();
    private List<String> authors = new ArrayList<>();
    private String messageContains;

    public ObjectId getComponentId() {
        return componentId;
    }

    public void setComponentId(ObjectId componentId) {
        this.componentId = componentId;
    }

    public Integer getNumberOfDays() {
        return numberOfDays;
    }

    public void setNumberOfDays(Integer numberOfDays) {
        this.numberOfDays = numberOfDays;
    }

    public Long getPullRequestDateBegins() {
        return pullRequestDateBegins;
    }

    public void setPullRequestDateBegins(Long pullRequestDateBegins) {
        this.pullRequestDateBegins = pullRequestDateBegins;
    }

    public Long getPullRequestDateEnds() {
        return pullRequestDateEnds;
    }

    public void setPullRequestDateEnds(Long pullRequestDateEnds) {
        this.pullRequestDateEnds = pullRequestDateEnds;
    }

    public Long getChangesGreaterThan() {
        return changesGreaterThan;
    }

    public void setChangesGreaterThan(Long changesGreaterThan) {
        this.changesGreaterThan = changesGreaterThan;
    }

    public Long getChangesLessThan() {
        return changesLessThan;
    }

    public void setChangesLessThan(Long changesLessThan) {
        this.changesLessThan = changesLessThan;
    }

    public List<String> getRevisionNumbers() {
        return revisionNumbers;
    }

    public void setRevisionNumbers(List<String> revisionNumbers) {
        this.revisionNumbers = revisionNumbers;
    }

    public List<String> getAuthors() {
        return authors;
    }

    public void setAuthors(List<String> authors) {
        this.authors = authors;
    }

    public String getMessageContains() {
        return messageContains;
    }

    public void setMessageContains(String messageContains) {
        this.messageContains = messageContains;
    }
}
