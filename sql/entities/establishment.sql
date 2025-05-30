CREATE TABLE IF NOT EXISTS establishment (
    id BIGINT NOT NULL,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    location POINT,
    total_stars INTEGER NOT NULL DEFAULT 0,
    total_reviews INTEGER NOT NULL DEFAULT 0,
    schedules_amount INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);