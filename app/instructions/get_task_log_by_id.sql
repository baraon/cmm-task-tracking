SELECT task_logs.id as id,
       duration_minutes,
       users.id as user_id,
       users.email as user_email
       FROM task_logs
JOIN users ON users.id=task_logs.user_id
WHERE task_logs.id=?
