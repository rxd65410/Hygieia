package com.capitalone.dashboard.collector;

import com.capitalone.dashboard.model.Commit;
import com.capitalone.dashboard.model.GitHubRepo;
import com.capitalone.dashboard.model.PullRequest;
import org.springframework.web.client.RestClientException;

import java.util.List;

/**
 * Client for fetching commit history from GitHub
 */
public interface GitHubClient {

    /**
     * Fetch all of the commits for the provided SubversionRepo.
     *
     * @param repo Github repo
     * @param firstRun boolean true if first time running
     * @return all commits in repo
     */

	List<Commit> getCommits(GitHubRepo repo, boolean firstRun);

    List<PullRequest> getPullRequests(GitHubRepo repo, boolean firstRun) throws RestClientException;
}
