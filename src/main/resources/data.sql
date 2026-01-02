-- 🌿 Table des plantes

CREATE TABLE IF NOT EXISTS plant (
                                     ID BIGINT AUTO_INCREMENT PRIMARY KEY,
                                     NAME VARCHAR(255),
                                     ORIGIN VARCHAR(255),
                                     DESCRIPTION VARCHAR(255),
                                     SEASON_FOUND VARCHAR(255),
                                     IMAGE_URL VARCHAR(255)
);

-- 🌱 Données pour les plantes
INSERT INTO plant (name, origin, description, season_found, image_url) VALUES
                                                                           ('Aloe Vera', 'Afrique du Nord', 'Plante médicinale connue pour ses propriétés cicatrisantes et hydratantes.', 'Été', 'https://cdn.pixabay.com/photo/2017/08/10/14/40/aloe-vera-2623317_1280.jpg'),
                                                                           ('Camomille', 'Europe', 'Utilisée pour ses effets calmants et digestifs, souvent en infusion.', 'Printemps', 'https://cdn.pixabay.com/photo/2024/05/15/07/59/flowers-8763039_1280.jpg'),
                                                                           ('Menthe poivrée', 'Méditerranée', 'Plante aromatique aux vertus digestives et rafraîchissantes.', 'Été', 'https://cdn.pixabay.com/photo/2017/06/12/19/23/moroccan-mint-2396530_1280.jpg'),
                                                                           ('Gingembre', 'Asie du Sud', 'Racine stimulante utilisée contre les nausées et pour renforcer l’immunité.', 'Hiver', 'https://cdn.pixabay.com/photo/2016/10/13/15/50/ginger-1738098_1280.jpg'),
                                                                           ('Thym', 'Europe du Sud', 'Antiseptique naturel utilisé contre les infections respiratoires.', 'Automne', 'https://cdn.pixabay.com/photo/2013/06/01/03/07/thyme-115348_1280.jpg'),
                                                                           ('Lavande', 'Provence', 'Plante relaxante utilisée en aromathérapie et pour apaiser les douleurs.', 'Été', 'https://cdn.pixabay.com/photo/2016/01/02/00/42/lavender-1117275_1280.jpg'),
                                                                           ('Eucalyptus', 'Australie', 'Plante expectorante utilisée pour dégager les voies respiratoires.', 'Hiver', 'https://cdn.pixabay.com/photo/2017/09/03/17/33/eucalyptus-2711285_1280.jpg'),
                                                                           ('Romarin', 'Bassin méditerranéen', 'Stimulant circulatoire et tonique digestif.', 'Printemps', 'https://cdn.pixabay.com/photo/2020/06/04/14/52/rosemary-5259098_1280.jpg');



-- ==============================================
-- 🧱 Création de la table "oils" si elle n'existe pas
-- ==============================================

CREATE TABLE IF NOT EXISTS oils (
                                    id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                    name VARCHAR(255) NOT NULL,
                                    description TEXT,
                                    benefits TEXT,
                                    precautions TEXT,
                                    image_url VARCHAR(500),
                                    affiliate_link VARCHAR(500),
                                    plant_id BIGINT UNIQUE,
                                    CONSTRAINT fk_oil_plant FOREIGN KEY (plant_id) REFERENCES plant(id)
);


-- ==============================================
-- 🌿 Huiles Essentielles (Module Oils)
-- ==============================================

INSERT INTO oils (name, description, benefits, precautions, image_url, affiliate_link, plant_id)
SELECT 'Huile essentielle de lavande vraie',
       'Obtenue à partir des fleurs de lavande vraie, cette huile est apaisante, cicatrisante et sédative.',
       'Stress, insomnie, brûlures, piqûres, anxiété.',
       'Ne pas utiliser chez les femmes enceintes avant 3 mois et chez les enfants de moins de 6 ans.',
       'https://www.onatera.com/img/products/HE-Lavande-vraie.jpg',
       'https://www.amazon.fr/dp/B00H3X4Q6M?tag=medicinalplants-21',
       p.id
FROM plant p
WHERE LOWER(p.name) LIKE LOWER('%lavande%')
  AND NOT EXISTS (SELECT 1 FROM oils o WHERE o.plant_id = p.id)
LIMIT 1;


INSERT INTO oils (name, description, benefits, precautions, image_url, affiliate_link, plant_id)
SELECT 'Huile essentielle de menthe poivrée',
     'Huile tonique et rafraîchissante extraite des feuilles de menthe poivrée.',
     'Digestion, migraines, nausées, fatigue mentale.',
     'Ne pas utiliser pure, déconseillée chez la femme enceinte et l’enfant < 7 ans.',
     'https://www.onatera.com/img/products/HE-Menthe-poivree.jpg',
     'https://www.amazon.fr/dp/B00FZ1PH4W?tag=medicinalplants-21',
       p.id
FROM plant p
WHERE LOWER(p.name) LIKE LOWER('%lavande%')
  AND NOT EXISTS (SELECT 1 FROM oils o WHERE o.plant_id = p.id)
LIMIT 1;

INSERT INTO oils (name, description, benefits, precautions, image_url, affiliate_link, plant_id)
SELECT
     'Huile essentielle de camomille romaine',
     'Huile calmante, anti-inflammatoire et antispasmodique extraite des fleurs de camomille romaine.',
     'Stress, coliques, irritations cutanées, troubles du sommeil.',
     'Usage externe uniquement, à diluer dans une huile végétale.',
     'https://www.onatera.com/img/products/HE-Camomille-romaine.jpg',
     'https://www.amazon.fr/dp/B01G6W9C9K?tag=medicinalplants-21',
     p.id
FROM plant p
WHERE LOWER(p.name) LIKE LOWER('%lavande%')
  AND NOT EXISTS (SELECT 1 FROM oils o WHERE o.plant_id = p.id)
LIMIT 1;

INSERT INTO oils (name, description, benefits, precautions, image_url, affiliate_link, plant_id)
SELECT
     'Huile essentielle de gingembre',
     'Distillée à partir du rhizome, cette huile est stimulante et tonifiante.',
     'Fatigue, troubles digestifs, douleurs articulaires.',
     'Peut être irritante sur la peau, toujours diluer avant application.',
     'https://www.onatera.com/img/products/HE-Gingembre.jpg',
     'https://www.amazon.fr/dp/B00FZ1PHT6?tag=medicinalplants-21',
     p.id
FROM plant p
WHERE LOWER(p.name) LIKE LOWER('%lavande%')
  AND NOT EXISTS (SELECT 1 FROM oils o WHERE o.plant_id = p.id)
LIMIT 1;

INSERT INTO oils (name, description, benefits, precautions, image_url, affiliate_link, plant_id)
SELECT
     'Huile essentielle de thym à thymol',
     'Huile antibactérienne et antivirale puissante issue des sommités fleuries du thym.',
     'Infections respiratoires, fatigue, immunité faible.',
     'Très dermocaustique, à diluer fortement avant usage.',
     'https://www.onatera.com/img/products/HE-Thym-thymol.jpg',
     'https://www.amazon.fr/dp/B00FZ1PH4W?tag=medicinalplants-21',
     p.id
FROM plant p
WHERE LOWER(p.name) LIKE LOWER('%lavande%')
  AND NOT EXISTS (SELECT 1 FROM oils o WHERE o.plant_id = p.id)
LIMIT 1;

INSERT INTO oils (name, description, benefits, precautions, image_url, affiliate_link, plant_id)
SELECT
     'Huile essentielle d’aloe vera (macérât huileux)',
     'Huile issue de la macération des feuilles d’aloe vera, hydratante et apaisante.',
     'Cicatrisation, brûlures, soins capillaires, hydratation cutanée.',
     'Usage externe uniquement.',
     'https://www.onatera.com/img/products/HV-Aloe-vera.jpg',
     'https://www.amazon.fr/dp/B07R3VQ5JD?tag=medicinalplants-21',
     p.id
FROM plant p
WHERE LOWER(p.name) LIKE LOWER('%lavande%')
  AND NOT EXISTS (SELECT 1 FROM oils o WHERE o.plant_id = p.id)
LIMIT 1;


-- 👤 Table des utilisateurs (avec email)
CREATE TABLE IF NOT EXISTS users (
                                     id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                     username VARCHAR(255) NOT NULL UNIQUE,
                                     email VARCHAR(255) NOT NULL UNIQUE,
                                     password VARCHAR(255) NOT NULL
) CHARACTER SET utf8 COLLATE utf8_general_ci;

-- 👑 Table des rôles
CREATE TABLE IF NOT EXISTS user_roles (
                                          id BIGINT PRIMARY KEY AUTO_INCREMENT,
                                          user_id BIGINT NOT NULL,
                                          roles VARCHAR(50) NOT NULL,
                                          CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


-- 👤 Insertion d'un utilisateur admin par défaut
-- 🔐 Mot de passe bcrypté pour "admin123"
INSERT INTO users (username, email, password)
SELECT 'admin', 'admin@example.com', '$2a$10$BrggEw/aIHiqfrlTOfDqWOhNJcJSzrWIItosMuriTYMl.N9Lhz/Zm'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'admin');


-- 👑 Attribution du rôle ADMIN
INSERT INTO user_roles (user_id, roles)
VALUES (2, 'ROLE_ADMIN');

-- Vérification manuelle (pour logs SQL)
SELECT COUNT(*) AS oils_count FROM oils;
