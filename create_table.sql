CREATE TABLE IF NOT EXISTS shops (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);
CREATE TABLE IF NOT EXISTS inventory (
    id SERIAL PRIMARY KEY,
    shop_id INTEGER REFERENCES shops(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    -- タイムゾーン対応のため timestamptz を使用し、DB側の現在時刻をデフォルトで記録します
    date_added TIMESTAMPTZ DEFAULT now()
);