CREATE TABLE users
(
    user_id INT NOT NULL,
    user_name VARCHAR(16) NOT NULL,
    -- make sure to double check password hash size reqs
    user_password VARCHAR(255) NOT NULL,
    first_name VARCHAR(16),
    last_name VARCHAR(16),
    account_priv INT(1) NOT NULL,

    PRIMARY KEY (user_id)
);

CREATE TABLE organization
(
    org_id INT NOT NULL,
    gh_id INT NOT NULL,
    org_name VARCHAR(255) NOT NULL,
    -- check hash size reqs
    auth_token VARCHAR(255),
    user_id INT,

    PRIMARY KEY (org_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE repository
(
    repo_id INT NOT NULL,
    repo_name VARCHAR(255),
    org_id INT,

    PRIMARY KEY (repo_id),
    FOREIGN KEY (org_id) REFERENCES organization (org_id) ON DELETE CASCADE
);

CREATE TABLE file_type
(
    type_id INT NOT NULL,
    language_name VARCHAR(255) NOT NULL,

    PRIMARY KEY (type_id)
);

CREATE TABLE dependency_file
(
    depfile_id INT NOT NULL,
    file_name VARCHAR(255),
    file_path VARCHAR(255),
    repo_id INT,
    type_id INT NOT NULL,

    PRIMARY KEY (depfile_id),
    FOREIGN KEY (repo_id) REFERENCES repository (repo_id) ON DELETE CASCADE,
    -- do not cascade delete
    FOREIGN KEY (type_id) REFERENCES file_type (type_id)
);

CREATE TABLE dependency
(
    dep_id INT NOT NULL,
    dep_name VARCHAR(255) NOT NULL,
    dep_version VARCHAR(16) NOT NULL,
    scan_date DATE NOT NULL,
    depfile_id INT NOT NULL,

    PRIMARY KEY (dep_id),
    FOREIGN KEY (depfile_id) REFERENCES dependency_file (depfile_id)
);

INSERT INTO file_type VALUES ('001', 'python');
INSERT INTO file_type VALUES ('002', 'ruby');