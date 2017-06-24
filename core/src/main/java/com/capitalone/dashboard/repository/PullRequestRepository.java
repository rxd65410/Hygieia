package com.capitalone.dashboard.repository;

import com.capitalone.dashboard.model.PullRequest;
import org.bson.types.ObjectId;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by raviteja on 6/24/17.
 */
public interface PullRequestRepository extends CrudRepository<PullRequest,ObjectId>, QueryDslPredicateExecutor<PullRequest>{

    PullRequest findByCollectorItemIdAndPullRequestNumber(ObjectId collectorItemId, String revisonNumber);
}
