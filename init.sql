CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    task VARCHAR(255) NOT NULL
);

INSERT INTO todos (task) VALUES 
('Setup Environment Docker'),
('Deploy React ke VPS'),
('Ngopi Dulu');