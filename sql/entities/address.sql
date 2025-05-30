CREATE TABLE IF NOT EXISTS address (
    establishment_id BIGINT NOT NULL,
    city TEXT NOT NULL,
    immediate_region TEXT NOT NULL,
    metropolitan_region TEXT,
    intermediate_region TEXT NOT NULL,
    state TEXT NOT NULL,
    macro_region TEXT NOT NULL,
    postal_code TEXT,
    country TEXT NOT NULL DEFAULT 'Brasil',
    PRIMARY KEY (establishment_id),
    FOREIGN KEY (establishment_id) REFERENCES establishment(id) ON DELETE CASCADE
);