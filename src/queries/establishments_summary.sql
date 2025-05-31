SELECT
    COUNT(e.id) AS establishments,
    SUM(e.schedules_amount) AS total_schedules,
    MAX(e.schedules_amount) AS max_schedule,
    AVG(e.schedules_amount)::double precision AS schedules_avg

FROM establishment AS e;