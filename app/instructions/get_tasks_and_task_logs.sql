SELECT tasks.id as task_id,
       tasks.description as task_description,
       task_logs.id as id,
       task_logs.duration_minutes as duration_minutes,
       projects.id as project_id,
       projects.name as project_name,
       users.id as user_id,
       users.email as user_email
       FROM tasks
LEFT JOIN task_logs ON tasks.id=task_logs.task_id
JOIN projects ON tasks.project_id = projects.id
LEFT JOIN users ON task_logs.user_id = users.id
