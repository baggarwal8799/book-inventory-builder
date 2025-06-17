export const addBook = `
    INSERT INTO books 
    (
        title, 
        author, 
        grade, 
        subject, 
        series,
        created_at
    )
    VALUES 
    (
        ?,
        ?,
        ?,
        ?,
        ?,
        Now()
    );
      `