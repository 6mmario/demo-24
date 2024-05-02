# entrypoint.sh
# Espera a que SQL Server esté listo para recibir conexiones
echo "Esperando a que SQL Server esté listo para recibir conexiones..."
while ! /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P miContrasena123 -Q "SELECT 1" >/dev/null 2>&1; do
    sleep 1
done

echo "SQL Server está listo."

# Ejecuta el script DDL
echo "Ejecutando el script db.ddl..."
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P miContrasena123 -i /sql/db.ddl

echo "Script db.ddl ejecutado."
