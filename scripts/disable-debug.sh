#!/bin/bash

# Script para desactivar todos los debug logs en src/config/debug-log.ts
# Pone todos los valores del objeto debug a false

CONFIG_FILE="src/config/debug-log.ts"

# Verificar que el archivo existe
if [ ! -f "$CONFIG_FILE" ]; then
    echo "Error: No se encontró el archivo $CONFIG_FILE"
    echo "Asegúrate de ejecutar este script desde la raíz del proyecto front-cms-spinbonus"
    exit 1
fi

echo "Desactivando todos los debug logs en $CONFIG_FILE..."

# Crear un archivo temporal
TEMP_FILE=$(mktemp)

# Usar sed para reemplazar todos los 'true' por 'false' en el objeto debug
# Esto captura patrones como:
# - "property: true," -> "property: false,"
# - "property: true" -> "property: false"
# - "property: true,    //comment" -> "property: false,   //comment"
sed 's/: true,/: false,/g; s/: true[[:space:]]*$/: false/g; s/: true[[:space:]]*\/\//: false          \/\//g' "$CONFIG_FILE" > "$TEMP_FILE"

# Reemplazar el archivo original
mv "$TEMP_FILE" "$CONFIG_FILE"

echo "✅ Todos los debug logs han sido desactivados exitosamente!"
echo "📝 Los siguientes cambios se aplicaron en $CONFIG_FILE:"
echo "   - Todos los valores 'true' en el objeto debug cambiados a 'false'"
echo ""
echo "💡 Para reactivar logs específicos, edita manualmente el archivo $CONFIG_FILE"
