-- ============================================================
-- IndigoPages - Database
-- 02_create_constraints.sql
-- ============================================================

-- USERS

ALTER TABLE users
ADD CONSTRAINT chk_users_email
CHECK (length(trim(email)) > 0);


-- MEMBERS

ALTER TABLE members
ADD CONSTRAINT chk_members_email
CHECK (length(trim(email)) > 0);


-- CATEGORIES

ALTER TABLE categories
ADD CONSTRAINT chk_categories_name
CHECK (length(trim(name)) > 0);


-- PUBLISHERS

ALTER TABLE publishers
ADD CONSTRAINT chk_publishers_name
CHECK (length(trim(name)) > 0);


-- AUDIT LOGS

ALTER TABLE auditlogs
ADD CONSTRAINT chk_auditlogs_action
CHECK (length(trim(action)) > 0);

ALTER TABLE auditlogs
ADD CONSTRAINT chk_auditlogs_entity_type
CHECK (length(trim(entitytype)) > 0);