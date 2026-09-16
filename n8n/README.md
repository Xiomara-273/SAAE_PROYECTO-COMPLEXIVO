# Guía de Importación de la Aplicación SAAE en n8n

Esta carpeta contiene la especificación de la API REST de SAAE y las plantillas preconfiguradas de flujos automatizados para **n8n**.

---

## 1. Abrir n8n
Accede a tu instancia de n8n que ya está corriendo en Docker:
👉 **[http://localhost:5678](http://localhost:5678)**

---

## 2. Importar los Flujos Automatizados (`Workflows JSON`)

1. En el menú izquierdo de n8n, haz clic en **Workflows**.
2. Haz clic en el botón superior derecho **`...`** (Más opciones) o **Import from File**.
3. Selecciona cualquiera de las plantillas ubicadas en la carpeta `n8n/workflows/`:
   - `n8n-workflow-alertas-asistencia.json`: Flujo de recepción de faltas y notificaciones automáticas.
   - `n8n-workflow-justificaciones.json`: Flujo de procesamiento de justificaciones.
   - `n8n-workflow-reporte-diario.json`: Flujo programado (Cron) para consultar métricas diarias (`/api/reportes/analitica`).
4. Haz clic en **Save** y luego activa el interruptor **Active** (Verde).

---

## 3. Importar la Especificación de la API OpenAPI (Swagger)

1. Al agregar un nodo **HTTP Request** en cualquier flujo de n8n:
2. Selecciona la opción **Import OpenAPI / Curl**.
3. Carga el archivo `n8n/saae-openapi-spec.json`.
4. Todos los endpoints de la aplicación (`/api/asistencia`, `/api/justificaciones`, `/api/reportes/analitica`, `/api/n8n/webhook`) quedarán configurados automáticamente.

---

## 4. Autenticación con el Backend de SAAE

En n8n, cuando un nodo se conecte a un endpoint de SAAE que requiera autenticación de Webhook, crea una credencial de tipo **Header Auth**:
- **Header Name**: `X-N8N-API-KEY`
- **Header Value**: `SAAE_N8N_SECRET_KEY_2026`
