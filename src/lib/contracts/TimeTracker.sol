// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TimeTracker {
    struct TimeRecord {
        uint256 startTime;
        uint256 endTime;
        uint256 duration;
        address client;
        bool approved;
    }
    
    struct Project {
        address client;
        address freelancer;
        uint256 ratePerHour;
        bool active;
    }
    
    mapping(bytes32 => Project) public projects;
    mapping(address => mapping(bytes32 => TimeRecord[])) public timeRecords;
    
    event ProjectCreated(bytes32 indexed projectId, address client, address freelancer);
    event TimeRecordAdded(bytes32 indexed projectId, uint256 startTime, uint256 endTime);
    event TimeRecordApproved(bytes32 indexed projectId, uint256 recordIndex);
    
    function createProject(bytes32 projectId, address freelancer, uint256 ratePerHour) external {
        require(projects[projectId].client == address(0), "Project already exists");
        
        projects[projectId] = Project({
            client: msg.sender,
            freelancer: freelancer,
            ratePerHour: ratePerHour,
            active: true
        });
        
        emit ProjectCreated(projectId, msg.sender, freelancer);
    }
    
    function addTimeRecord(bytes32 projectId, uint256 startTime, uint256 endTime) external {
        Project memory project = projects[projectId];
        require(project.active, "Project is not active");
        require(msg.sender == project.freelancer, "Only freelancer can add time records");
        require(endTime > startTime, "Invalid time period");
        
        uint256 duration = endTime - startTime;
        
        timeRecords[msg.sender][projectId].push(TimeRecord({
            startTime: startTime,
            endTime: endTime,
            duration: duration,
            client: project.client,
            approved: false
        }));
        
        emit TimeRecordAdded(projectId, startTime, endTime);
    }
    
    function approveTimeRecord(bytes32 projectId, uint256 recordIndex) external {
        Project memory project = projects[projectId];
        require(msg.sender == project.client, "Only client can approve records");
        
        TimeRecord[] storage records = timeRecords[project.freelancer][projectId];
        require(recordIndex < records.length, "Record does not exist");
        require(!records[recordIndex].approved, "Record already approved");
        
        records[recordIndex].approved = true;
        
        emit TimeRecordApproved(projectId, recordIndex);
    }
}