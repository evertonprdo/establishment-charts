SELECT 
    COUNT(es.id) AS amount,
    ad.{ column } AS name,
    SUM(es.schedules_amount) AS schedules_amount

FROM establishment AS es
    RIGHT JOIN address AS ad ON es.id = ad.establishment_id

WHERE es.schedules_amount >= $1

GROUP BY ad.{ column }
ORDER BY amount DESC

{ limit_clause }
;