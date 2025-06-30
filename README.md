Proyecto creado por juank. Nextjs + react + tailwind + shadcn

Instrucciones
---------------------

# Pages
1. Usando AppRouter, las pages se crean dinamicamente mediante el [slug] que proviene de la api.

# Contenido 

# Estilos
1. La Api usa Bootstrap en el Page Builder, por lo que he tenido que traducirlo a tailwind manualmente. en la carpeta "html-transform" se encuentran los scripts que hacen esto: 
  - `transformers.tsx` contiene los 'transformadores', es decir el componente en tailwind a renderizar. Esta dividido en elementos html, asi como en clases
  - `transformer-map.ts` contiene las 'rules', es decir las clases de bootstrap que deben aparecer para que se renderice el componente de tailwind, por ejemplo -> 
    `btn` - `transformButton` (esto es el componente Button con tailwind, traducido)
    La funcion getTransformer simplemente automatiza el mapeo de la constante 'rules' y es asignada a la funcion 'replace', que reemplaza el html origen con este nuevo jsx en tailwind

  