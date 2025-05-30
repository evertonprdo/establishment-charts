SELECT COUNT(es.id) AS amount,
    ad.{ field } AS name
FROM establishment AS es
    RIGHT JOIN address AS ad ON es.id = ad.establishment_id
WHERE es.schedules_amount >= $1
GROUP BY ad.{ field }
ORDER BY amount DESC;