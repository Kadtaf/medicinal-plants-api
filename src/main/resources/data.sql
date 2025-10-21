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
SELECT 'admin', 'admin@example.com', '$2a$10$UlvSyK4BH3RG2yn5re6r0e1F86Zdm8yKMvlNiNnn2acNjRsg8/KSi'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'admin');


-- 👑 Attribution du rôle ADMIN
INSERT INTO user_roles (user_id, roles)
VALUES (1, 'ROLE_ADMIN');
