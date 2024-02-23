SELECT "Event".name, COUNT("userId") as "userCount"
FROM "EventUser"
         JOIN "Event" ON "EventUser"."eventId" = "Event"."id"
GROUP BY "eventId", "Event".name
ORDER BY "userCount"