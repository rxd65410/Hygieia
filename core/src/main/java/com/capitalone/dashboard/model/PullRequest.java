package com.capitalone.dashboard.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Created by raviteja on 6/24/17.
 */
@Document(collection = "pull_requests")
public class PullRequest {
    @Id
    private ObjectId id;
    private String repoUrl;
    private String title;
    private String compareBranch;
    private String baseBranch;
    private String user;
    private String pullRequestNumber;
    private String state;
    private int numberOfCommits;
    private int numberOfComments;
    private int numberOfFilesChanged;
    private long createdAtTimeStamp;
    private long closedAtTimeStamp;
    private long mergedAtTimeStamp;
    private long timestamp;
    private boolean merged;
    private ObjectId collectorItemId;

    public PullRequest() {
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getRepoUrl() {
        return repoUrl;
    }

    public void setRepoUrl(String repoUrl) {
        this.repoUrl = repoUrl;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCompareBranch() {
        return compareBranch;
    }

    public void setCompareBranch(String compareBranch) {
        this.compareBranch = compareBranch;
    }

    public String getBaseBranch() {
        return baseBranch;
    }

    public void setBaseBranch(String baseBranch) {
        this.baseBranch = baseBranch;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getPullRequestNumber() {
        return pullRequestNumber;
    }

    public void setPullRequestNumber(String pullRequestNumber) {
        this.pullRequestNumber = pullRequestNumber;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public int getNumberOfCommits() {
        return numberOfCommits;
    }

    public void setNumberOfCommits(int numberOfCommits) {
        this.numberOfCommits = numberOfCommits;
    }

    public int getNumberOfComments() {
        return numberOfComments;
    }

    public void setNumberOfComments(int numberOfComments) {
        this.numberOfComments = numberOfComments;
    }

    public int getNumberOfFilesChanged() {
        return numberOfFilesChanged;
    }

    public void setNumberOfFilesChanged(int numberOfFilesChanged) {
        this.numberOfFilesChanged = numberOfFilesChanged;
    }

    public long getCreatedAtTimeStamp() {
        return createdAtTimeStamp;
    }

    public void setCreatedAtTimeStamp(long createdAtTimeStamp) {
        this.createdAtTimeStamp = createdAtTimeStamp;
    }

    public long getClosedAtTimeStamp() {
        return closedAtTimeStamp;
    }

    public void setClosedAtTimeStamp(long closedAtTimeStamp) {
        this.closedAtTimeStamp = closedAtTimeStamp;
    }

    public long getMergedAtTimeStamp() {
        return mergedAtTimeStamp;
    }

    public void setMergedAtTimeStamp(long mergedAtTimeStamp) {
        this.mergedAtTimeStamp = mergedAtTimeStamp;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    public boolean isMerged() {
        return merged;
    }

    public void setMerged(boolean merged) {
        this.merged = merged;
    }

    public ObjectId getCollectorItemId() {
        return collectorItemId;
    }

    public void setCollectorItemId(ObjectId collectorItemId) {
        this.collectorItemId = collectorItemId;
    }
}
