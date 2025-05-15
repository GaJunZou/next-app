SELECT - 从数据库中提取数据
UPDATE - 更新数据库中的数据
DELETE - 从数据库中删除数据
INSERT INTO - 向数据库中插入新数据
CREATE DATABASE - 创建新数据库
ALTER DATABASE - 修改数据库
CREATE TABLE - 创建新表
ALTER TABLE - 变更（改变）数据库表
DROP TABLE - 删除表
CREATE INDEX - 创建索引（搜索键）
DROP INDEX - 删除索引

## 查询
SELECT {列1, 列2} FROM {表名} WHERE {条件} ORDER BY {列名} [ASC/DESC] LIMIT {行数}; 
-- 示例：查询用户ID和姓名，按ID降序取前10条
SELECT user_id, name FROM users WHERE country='CN' 
ORDER BY user_id DESC LIMIT 10;

## 插入
INSERT INTO {表名} ({列1}, {列2}) VALUES ({值1}, {值2}), ({值3}, {值4}); 
-- 示例：插入两条表数据
INSERT INTO users (user_id, user_name) VALUES (001, jaydon), (002, chow); 

## 更新（针对数据）
UPDATE {表名} SET {列1}={值1} WHERE {条件}; 
-- 示例：更新用户 user_id 为 001 的 user_gender 为 1
UPDATE users SET user_gender=1 WHERE user_id = '001';

## 修改表（针对表）
-- 添加列
ALTER TABLE {表名} ADD {列名} [VARCHAR(20) NOT NULL DEFAULT '未知'];
-- 删除列
ALTER TABLE {表名} DROP COLUMN {列1},DROP COLUMN {列2};
-- 删除外键约束
ALTER TABLE {表名} DROP CONSTRAINT {fk_user_id};

## 外键约束
FOREIGN KEY ({user_id}) REFERENCES {主表}(id)
-- 用户表（主表）
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(50)
);

-- 订单表（从表）
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id) # 定义外键
);