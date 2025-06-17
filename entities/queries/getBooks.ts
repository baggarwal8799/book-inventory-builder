export const getBook = `
    SELECT 
        title, 
        author, 
        grade, 
        subject, 
        series,
        created_at,
        updated_at
    FROM books
    `