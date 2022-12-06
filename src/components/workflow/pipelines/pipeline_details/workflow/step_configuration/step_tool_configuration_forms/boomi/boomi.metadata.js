const boomiMetadata = {
    type: "Boomi Tool Configuration",
    fields: [
        {
            label: "Boomi Tool",
            id: "boomiToolId",
            isRequired: true
        },
        {
            label: "SCM Tool",
            id: "gitToolId",
        },
        {
            label: "Repository",
            id: "repoId",
        },
        {
            label: "Project ID",
            id: "projectId",
        },
        {
            label: "SCM Service Type",
            id: "service",
        },
        {
            label: "GIT URL",
            id: "gitUrl"
        },
        {
            label: "SSH URL",
            id: "sshUrl",
        },
        {
            label: "Repository",
            id: "repository",
        },
        {
            label: "Repository",
            id: "repositoryName",
        },
        {
            label: "Workspace",
            id: "workspace"
        },
        {
            label: "Workspace/Project",
            id: "workspaceName"
        },
        {
            label: "Branch",
            id: "gitBranch",
        },
        {
            label: "Job Type",
            id: "jobType",
        },
        {
            label: "File Path",
            id: "filePath",
        },
        {
            label: "File Name",
            id: "fileName",
        },
        {
            label: "Job Description",
            id: "jobDescription",
        },
        {
            label: "Environment",
            id: "environmentName",
        },
        {
            label: "Environment",
            id: "environmentId",
        },
        {
            label: "Source Environment",
            id: "sourceEnvironmentName",
        },
        {
            label: "Source Environment",
            id: "sourceEnvironmentId",
        },
        {
            label: "Target Environment",
            id: "targetEnvironmentName",
        },
        {
            label: "Target Environment",
            id: "targetEnvironmentId",
        },
        {
            label: "Fetch components from SCM",
            id: "fetchComponentsFromGit"
        }
    ],
    newObjectFields: {
        boomiToolId: "",
        jobType: "",
        gitToolId: "",
        repoId: "",
        projectId: "",
        gitUrl: "",
        sshUrl: "",
        service: "",
        workspace: "",
        workspaceName: "",
        repository: "",
        repositoryName: "",
        gitBranch: "",
        filePath: "",
        fileName: "",
        jobDescription : "PACKAGEXML_CREATION",
        environmentName: "",
        environmentId: "",
        targetEnvironmentName: "",
        targetEnvironmentId: "",
        sourceEnvironmentName: "",
        sourceEnvironmentId: "",
        fetchComponentsFromGit: false,
    }
};

export default boomiMetadata;
