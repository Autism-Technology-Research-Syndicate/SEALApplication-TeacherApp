/*CREATE TABLE statement for the Teacher table*/
CREATE TABLE Teacher (
    id INT AUTO_INCREMENT PRIMARY KEY,  
    teacher_email VARCHAR(255) UNIQUE NOT NULL,
    teacher_password VARCHAR(255) NOT NULL,  
    teacher_name VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
/*CREATE TABLE statement for the Course table*/
CREATE TABLE Course (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


/*CREATE TABLE statement for the Rom table*/
CREATE TABLE Room (
    room_id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    teacher_id INT NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    capacity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES Course(course_id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES Teacher(id) ON DELETE CASCADE
);
