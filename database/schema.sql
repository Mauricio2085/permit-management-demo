-- Roles
CREATE TABLE roles (
  role_id SERIAL PRIMARY KEY,
  role_name VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO roles (role_name) VALUES ('admin'), ('operator');

-- Users
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role_id INT NOT NULL,
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

INSERT INTO users (name, email, password, role_id) 
VALUES ('userAdmin', 'permit-demo@example.com', '$2b$10$kTDflZ/j15nCgG/j1tre3uLXSL9GffJd6jhO2mms7XKO4ttp0yvKG', 1);

-- Permits main table
CREATE TABLE work_at_heights_permits (
  id SERIAL PRIMARY KEY,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP,
  description TEXT,
  max_height NUMERIC(5,2),
  max_load NUMERIC(6,2),
  status VARCHAR(20) DEFAULT 'pending',
  created_by VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  sequence SERIAL
);

-- Customers
CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  tax_id VARCHAR(30) UNIQUE,
  phone NUMERIC(20),
  email VARCHAR(150) UNIQUE NOT NULL,
  address TEXT
);

CREATE TABLE customers_permit (
  id SERIAL PRIMARY KEY,
  permit_id INT REFERENCES work_at_heights_permits(id) ON DELETE CASCADE,
  customer_id INT REFERENCES customers(id)
);

-- Critical tasks catalog
CREATE TABLE critical_tasks_catalog (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

-- Critical tasks linked to permits
CREATE TABLE critical_tasks_permit (
  id SERIAL PRIMARY KEY,
  permit_id INT REFERENCES work_at_heights_permits(id) ON DELETE CASCADE,
  task_id INT REFERENCES critical_tasks_catalog(id),
  applies BOOLEAN DEFAULT FALSE
);

-- Supporting documents catalog
CREATE TABLE supporting_documents_catalog (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL
);

-- Responses per permit for each document
CREATE TABLE documents_permit (
  id SERIAL PRIMARY KEY,
  permit_id INT REFERENCES work_at_heights_permits(id) ON DELETE CASCADE,
  document_id INT REFERENCES supporting_documents_catalog(id),
  response VARCHAR(10)
);

-- Signatures
CREATE TABLE permit_signatures (
  id SERIAL PRIMARY KEY,
  permit_id INT REFERENCES work_at_heights_permits(id),
  name VARCHAR(100),
  identification VARCHAR(30),
  role VARCHAR(50),
  signature VARCHAR(500),
  signed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Checklist items catalog
CREATE TABLE checklist_items_catalog (
  id SERIAL PRIMARY KEY,
  verification VARCHAR(500),
  aspect TEXT
);

-- Checklist responses
CREATE TABLE checklist_responses (
  id SERIAL PRIMARY KEY,
  permit_id INT REFERENCES work_at_heights_permits(id) ON DELETE CASCADE,
  item_id INT REFERENCES checklist_items_catalog(id),
  response VARCHAR(10),
  observations TEXT
);

-- Safety equipment catalog
CREATE TABLE safety_equipment_catalog (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  type VARCHAR(50)
);

-- Safety equipment required for a permit
CREATE TABLE permit_equipment (
  id SERIAL PRIMARY KEY,
  permit_id INT REFERENCES work_at_heights_permits(id),
  equipment_id INT REFERENCES safety_equipment_catalog(id),
  applies BOOLEAN DEFAULT FALSE
);

-- INSERTS DE LAS TABLAS CLIENTES
INSERT INTO customers (name, tax_id, phone, email, address) VALUES
('Customer 1', '3105258794', 3105258795, 'customer1@customer1.com', 'Zona Franca'),
('Customer 2', '9005258794', 3102788792, 'customer2@customer2.com', 'Km 13 vía Pereira-Cartago'),
('Customer 3', '8005258794', 3101298791, 'customer3@customer3.com', 'Vía Galicia');

-- INSERTS DE LAS TABLAS DE CATALOGOS

INSERT INTO critical_tasks_catalog (name) VALUES
('Trabajo en caliente'),
('Izaje de cargas'),
('Uso de productos químicos');

INSERT INTO supporting_documents_catalog (name) VALUES
('ATS'),
('Lista de chequeo de los equipos de acceso (ESCALERAS)'),
('Lista de chequeo de los equipos de acceso (ANDAMIO)'),
('Lista de chequeo de los equipos de acceso (ELEVADOR)'),
('Lista de chequeo para manejo de productos químicos'),
('Lista de chequeo de trabajo en excavaciones'),
('Lista de chequeo para valoración de condiciones de salud tareas de alto riesgo'),
('Plan de izaje de cargas');

INSERT INTO safety_equipment_catalog (name, type) VALUES 
('Puntos de anclaje', 'caidas'),
('Mecanismos de anclaje', 'caidas'),
('Lineas de vida horizontal cable', 'caidas'),
('Lineas de vida horizontal cuerda', 'caidas'),
('Lineas de vida vertical cable', 'caidas'),
('Lineas de vida vertical cuerda', 'caidas'),
('Mosquetones', 'caidas'),
('Eslinga para restricción', 'caidas'),
('Eslinga para posicionamiento', 'caidas'),
('Eslinga para detención', 'caidas'),
('Arnes integral de seguridad', 'caidas'),
('Cuerda certificada para rescate', 'caidas'),
('Descendedor', 'caidas'),
('Ascendedor', 'caidas'),
('Arrestador (freno)', 'caidas'),
('Poleas', 'caidas'),
('Casco con barbuquejo de 3 puntos', 'EPP'),
('Botas de seguridad', 'EPP'),
('Gafas de seguridad', 'EPP'),
('Guantes de algodon', 'EPP'),
('Guantes de cuero', 'EPP'),
('Guantes dielectricos', 'EPP'),
('Protección facial', 'EPP'),
('Proteccion auditiva', 'EPP'),
('Careta de soldador', 'EPP'),
('Proteccion respiratoria', 'EPP'),
('Chaleco reflectivo', 'EPP'),
('Ropa de trabajo (overol)', 'EPP'),
('Pantalla facial', 'EPP'),
('Impermeable', 'EPP'),
('Extintores', 'acceso'),
('Elementos para delimitación', 'acceso'),
('Elementos de señalizacion', 'acceso'),
('Equipos de Comunicación', 'acceso'),
('Botiquín', 'acceso'),
('Kit ambiental', 'acceso'),
('Kit Lava ojos', 'acceso'),
('Detector de gases', 'acceso'),
('Andamios', 'acceso'),
('Gruas con canasta', 'acceso'),
('Escaleras tipo tijera', 'acceso'),
('Escalera extensibles', 'acceso'),
('Escaleras fijas', 'acceso'),
('Elevadores', 'acceso');

INSERT INTO checklist_items_catalog (verification, aspect) VALUES
('El sitio donde se ejecutará el trabajo está aislado
completamente
', 'Verificar que en el sitio y en sus alrededores no existan materiales o
equipos que puedan generar riesgos para las personas o equipos de la
empresa. Si existe el riesgo, se debe corregir para poder diligenciar el
permiso.'),
('Se han instalado mamparas, cerramiento rìgido o cinta
para aislar la zona y no permitir el paso de vehículos o
personas', 'Si en la zona de trabajo existe paso de personas o vehículos se debe
aislar y señalizar el área de influencia para evitar el tránsito por el
área.'),
('La(s) persona(s) encargada(s) de ejecutar la labor ha(n)
recibido instrucciones y precauciones a seguir en la
ejecución de la tarea', 'La(s) persona(s) que realizará la tarea debe estar técnicamente
capacitada y entrenada en las tareas asignadas. Además debe estar
en capacidad de manejar equipos y elementos de seguridad.'),
('Se garantiza que las personas que realizarán el
diligenciamiento del permiso y las que ejecutarán el
trabajo conocen el equipo y los procedimientos
contemplados para solicitar un permiso', 'Todas las personas que vayan a realizar el trabajo así como el
solicitante (supervisor o persona encargada por laempresa) del
diligenciamiento del permiso, deben conocer y cumplir con los
requerimientos exigidos. Si es la primera vez que lo realizan se debe
capacitar y entrenar al personal en este tema antes de iniciar.'),
('Se realizaran trabajos simultáneos en la misma área', 'Revisar si se están realizando otros trabajos de manera simultánea,
para la identificación de otros peligros.'),
('Se ha verificado que los autorizados para realizar el
trabajo estén al día en los pagos de seguridad social', 'Revisión del pago de aportes de seguridad social de los autorizados.'),
('Se ha verificado que los autorizados para realizar el
trabajo cuenten con el certificado de aptitud medica para
trabajos en altura', 'Revisión de que se cuente con los certificados de aptitud para realizar
el trabajo en alturas por parte de los autorizados.');