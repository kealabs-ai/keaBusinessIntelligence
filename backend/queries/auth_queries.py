class AuthQueries:
    CREATE_USERS_TABLE = """
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='users' AND xtype='U')
    CREATE TABLE users (
        id INT IDENTITY(1,1) PRIMARY KEY,
        username NVARCHAR(50) UNIQUE NOT NULL,
        password_hash NVARCHAR(64) NOT NULL,
        email NVARCHAR(100),
        payment_status NVARCHAR(20) DEFAULT 'active',
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME DEFAULT GETDATE()
    )
    """
    
    INSERT_DEFAULT_USER = """
    IF NOT EXISTS (SELECT * FROM users WHERE username = 'admin')
    INSERT INTO users (username, password_hash, email, payment_status)
    VALUES ('admin', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', 'admin@keabi.com', 'active')
    """