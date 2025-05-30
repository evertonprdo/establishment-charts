-- Create tables if they don't exist
CREATE TABLE IF NOT EXISTS establishment (
    id BIGINT NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    location POINT,
    total_stars INTEGER NOT NULL DEFAULT 0,
    total_reviews INTEGER NOT NULL DEFAULT 0,
    schedules_amount INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS address (
    establishment_id BIGINT NOT NULL PRIMARY KEY,
    city TEXT NOT NULL,
    immediate_region TEXT NOT NULL,
    metropolitan_region TEXT,
    intermediate_region TEXT NOT NULL,
    state TEXT NOT NULL,
    macro_region TEXT NOT NULL,
    postal_code TEXT,
    country TEXT NOT NULL DEFAULT 'Brasil',
    FOREIGN KEY (establishment_id) REFERENCES establishment(id) ON DELETE CASCADE
);
-- Insert 20 establishments
INSERT INTO establishment (
        id,
        name,
        address,
        location,
        total_stars,
        total_reviews,
        schedules_amount
    )
VALUES (
        1,
        'Café Paulista',
        'Rua Augusta, 123',
        POINT(-23.561414, -46.655881),
        45,
        10,
        3
    ),
    (
        2,
        'Livraria Cultura',
        'Av. Paulista, 456',
        POINT(-23.564224, -46.652493),
        90,
        30,
        5
    ),
    (
        3,
        'Tech Hub SP',
        'Av. Faria Lima, 789',
        POINT(-23.587416, -46.681764),
        75,
        25,
        7
    ),
    (
        4,
        'Mercado Central BH',
        'Rua da Bahia, 321',
        POINT(-19.924502, -43.935238),
        60,
        20,
        4
    ),
    (
        5,
        'Pet Shop Rio',
        'Av. Atlântica, 987',
        POINT(-22.971964, -43.182543),
        85,
        28,
        2
    ),
    (
        6,
        'Academia Fit',
        'Rua das Flores, 147',
        POINT(-15.794229, -47.882166),
        95,
        35,
        6
    ),
    (
        7,
        'Feira de Artesanato',
        'Rua das Palmeiras, 258',
        POINT(-29.686618, -53.814466),
        70,
        22,
        4
    ),
    (
        8,
        'Spa Relax',
        'Av. Brasil, 369',
        POINT(-3.731862, -38.526669),
        80,
        26,
        5
    ),
    (
        9,
        'Eletrônicos Tech',
        'Rua Sete de Setembro, 159',
        POINT(-30.034647, -51.217658),
        100,
        40,
        8
    ),
    (
        10,
        'Cinema Paulista',
        'Av. Paulista, 753',
        POINT(-23.561414, -46.655881),
        50,
        18,
        6
    ),
    (
        11,
        'Bar Jazz',
        'Rua Augusta, 159',
        POINT(-23.561414, -46.655881),
        88,
        27,
        3
    ),
    (
        12,
        'Clínica Pet Saúde',
        'Rua Tiradentes, 951',
        POINT(-22.906847, -43.172896),
        92,
        33,
        4
    ),
    (
        13,
        'Loja de Bicicletas',
        'Av. Beira Mar, 753',
        POINT(-3.71722, -38.5434),
        65,
        19,
        2
    ),
    (
        14,
        'Padaria Pão Doce',
        'Rua das Flores, 357',
        POINT(-23.548943, -46.638818),
        78,
        24,
        3
    ),
    (
        15,
        'Café e Código',
        'Rua da Consolação, 159',
        POINT(-23.550520, -46.633308),
        73,
        21,
        6
    ),
    (
        16,
        'Casa da Música',
        'Rua São João, 456',
        POINT(-22.909938, -43.209372),
        84,
        29,
        5
    ),
    (
        17,
        'Vinícola Brasil',
        'Estrada Real, 951',
        POINT(-20.469711, -44.260093),
        62,
        17,
        3
    ),
    (
        18,
        'Jardim Botânico',
        'Av. das Palmeiras, 123',
        POINT(-22.951916, -43.210487),
        77,
        23,
        4
    ),
    (
        19,
        'Loja de Brinquedos',
        'Rua das Laranjeiras, 852',
        POINT(-22.921517, -43.239800),
        93,
        36,
        7
    ),
    (
        20,
        'Doceria Sabor',
        'Rua do Comércio, 741',
        POINT(-23.550370, -46.634317),
        89,
        31,
        3
    );
-- Insert 20 addresses
INSERT INTO address (
        establishment_id,
        city,
        immediate_region,
        metropolitan_region,
        intermediate_region,
        state,
        macro_region,
        postal_code,
        country
    )
VALUES (
        1,
        'São Paulo',
        'Centro',
        'Região Metropolitana de São Paulo',
        'São Paulo',
        'SP',
        'Sudeste',
        '01304-001',
        'Brasil'
    ),
    (
        2,
        'São Paulo',
        'Bela Vista',
        'Região Metropolitana de São Paulo',
        'São Paulo',
        'SP',
        'Sudeste',
        '01310-000',
        'Brasil'
    ),
    (
        3,
        'São Paulo',
        'Jardim Paulistano',
        'Região Metropolitana de São Paulo',
        'São Paulo',
        'SP',
        'Sudeste',
        '01452-000',
        'Brasil'
    ),
    (
        4,
        'Belo Horizonte',
        'Centro',
        'Região Metropolitana de Belo Horizonte',
        'Minas Gerais',
        'MG',
        'Sudeste',
        '30130-000',
        'Brasil'
    ),
    (
        5,
        'Rio de Janeiro',
        'Copacabana',
        'Região Metropolitana do Rio de Janeiro',
        'Rio de Janeiro',
        'RJ',
        'Sudeste',
        '22040-002',
        'Brasil'
    ),
    (
        6,
        'Brasília',
        'Asa Sul',
        'Região Integrada de Desenvolvimento do Distrito Federal e Entorno',
        'Distrito Federal',
        'DF',
        'Centro-Oeste',
        '70390-000',
        'Brasil'
    ),
    (
        7,
        'Porto Alegre',
        'Centro Histórico',
        'Região Metropolitana de Porto Alegre',
        'Rio Grande do Sul',
        'RS',
        'Sul',
        '90010-000',
        'Brasil'
    ),
    (
        8,
        'Fortaleza',
        'Meireles',
        'Região Metropolitana de Fortaleza',
        'Ceará',
        'CE',
        'Nordeste',
        '60165-121',
        'Brasil'
    ),
    (
        9,
        'Porto Alegre',
        'Centro Histórico',
        'Região Metropolitana de Porto Alegre',
        'Rio Grande do Sul',
        'RS',
        'Sul',
        '90010-000',
        'Brasil'
    ),
    (
        10,
        'São Paulo',
        'Bela Vista',
        'Região Metropolitana de São Paulo',
        'São Paulo',
        'SP',
        'Sudeste',
        '01310-000',
        'Brasil'
    ),
    (
        11,
        'São Paulo',
        'Consolação',
        'Região Metropolitana de São Paulo',
        'São Paulo',
        'SP',
        'Sudeste',
        '01302-000',
        'Brasil'
    ),
    (
        12,
        'Rio de Janeiro',
        'Lapa',
        'Região Metropolitana do Rio de Janeiro',
        'Rio de Janeiro',
        'RJ',
        'Sudeste',
        '20230-040',
        'Brasil'
    ),
    (
        13,
        'Fortaleza',
        'Meireles',
        'Região Metropolitana de Fortaleza',
        'Ceará',
        'CE',
        'Nordeste',
        '60165-121',
        'Brasil'
    ),
    (
        14,
        'São Paulo',
        'Vila Mariana',
        'Região Metropolitana de São Paulo',
        'São Paulo',
        'SP',
        'Sudeste',
        '04106-030',
        'Brasil'
    ),
    (
        15,
        'São Paulo',
        'Consolação',
        'Região Metropolitana de São Paulo',
        'São Paulo',
        'SP',
        'Sudeste',
        '01302-000',
        'Brasil'
    ),
    (
        16,
        'Rio de Janeiro',
        'Centro',
        'Região Metropolitana do Rio de Janeiro',
        'Rio de Janeiro',
        'RJ',
        'Sudeste',
        '20010-000',
        'Brasil'
    ),
    (
        17,
        'Minas Gerais',
        'Vale do Aço',
        'Região Metropolitana do Vale do Aço',
        'Minas Gerais',
        'MG',
        'Sudeste',
        '35170-000',
        'Brasil'
    ),
    (
        18,
        'Rio de Janeiro',
        'Jardim Botânico',
        'Região Metropolitana do Rio de Janeiro',
        'Rio de Janeiro',
        'RJ',
        'Sudeste',
        '22460-030',
        'Brasil'
    ),
    (
        19,
        'Rio de Janeiro',
        'Laranjeiras',
        'Região Metropolitana do Rio de Janeiro',
        'Rio de Janeiro',
        'RJ',
        'Sudeste',
        '22240-003',
        'Brasil'
    ),
    (
        20,
        'São Paulo',
        'Centro',
        'Região Metropolitana de São Paulo',
        'São Paulo',
        'SP',
        'Sudeste',
        '01013-001',
        'Brasil'
    );